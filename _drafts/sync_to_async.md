---
title: "Bridging Unity Callbacks to Async/Await"
tags: [ "C#", async-await, mobile, plugins, patterns ]
category: unity
summary: "This post starts with a tangle of callbacks, coroutines, and Tasks, and ends with a small async wrapper powered by TaskCompletionSource that makes the flow easier to read, extend, and reason about."
---

## Context

Have you found yourself dealing with a mix of callbacks, coroutines, and Tasks, jumping between approaches, adding glue code between these systems, and ending up with a lot of fishy code?

Maybe you're wondering how to unify them so they all speak the same asynchronous language. In this post, I’ll show one way to do that.

Recently I've been coding a personal Unity project for mobile, and I needed to read text files, images, and audio from disk so the user could load their own content into the app.

On mobile you cannot do this in quite the same way you would in a desktop application. There is no simple `File.ReadAllText`, and you usually have to go through native calls to open the gallery or file browser. Luckily there are some great solutions already in the Asset Store that are free and work on both Android and iOS:

 - [Native File Picker](https://assetstore.unity.com/packages/tools/integration/native-file-picker-for-android-ios-173238)
 - [Native Gallery](https://assetstore.unity.com/packages/tools/integration/native-gallery-for-android-ios-112630)

They work like a charm and are very simple to integrate into your code. However, a few things were not mixing exactly as I wanted with some of the async `Task` calls.

## The Problem

To open the device gallery in order to select a file, the NativeGallery plugin gives you this handy method:

```csharp
public delegate void MediaPickCallback(string path);

public static void GetImageFromGallery(MediaPickCallback callback, /* some optional config params */) { ... }
```

You can use it by calling `NativeGallery.GetImageFromGallery()` and passing a delegate callback. You might be tempted, as you should, to wrap this plugin in a controller class so you have a layer of separation in case you need to change the plugin or add extra safeguards and logic when using it. In my case, the controller class for NativeGallery has the following method to use this functionality:

```csharp
public static void GetImagePathFromGallery(Action<string> onComplete)
{
    try
    {
        NativeGallery.GetImageFromGallery(onComplete.Invoke);
    }
    catch (Exception e)
    {
        onComplete.Invoke(string.Empty);
        Debug.LogError(e.Message);
    }
}
```

All good and simple here, but if you notice, this is returning a `string` and not a `Texture2D` for the image. When you browse and select an image from the gallery, NativeGallery gives you the path to it, not the image itself, which means you need to use another handy method to load the texture:

```csharp
public static Texture2D LoadImageAtPath(string imagePath, /* some optional config params */) { ... }

// or

public static async Task<Texture2D> LoadImageAtPathAsync(string imagePath, /* some optional config params */) { ... }
```

For our case we want `LoadImageAtPathAsync()`, because it performs the disk I/O asynchronously under the hood (using Unity's web/file APIs on mobile). But now we have a weird mix. We call a method that uses a callback, and then, inside that callback, we want to call an async method. This results in something like this:

```csharp
public static void GetImageFromGallery(Action<Texture2D> onComplete = null)
{
    GetImagePathFromGallery(path =>
    {
        if (string.IsNullOrEmpty(path))
        {
            onComplete?.Invoke(null);
            return;
        }

        GetImageFromPathAsync(path, onComplete);
    });
}

public static async Task<Texture2D> GetImageFromPathAsync(string path, Action<Texture2D> onComplete = null)
{
    Texture2D texture2D = null;

    try
    {
        texture2D = await NativeGallery.LoadImageAtPathAsync(path);
    }
    catch (Exception e)
    {
        Debug.LogError(e.Message);
    }

    onComplete?.Invoke(texture2D);
    return texture2D;
}
```

You can see a lot of problems here already:

- We are calling `GetImageFromPathAsync()` without `await`, so this is effectively fire-and-forget. That makes it harder for the UI or any other system to express that it is waiting for completion, because everything depends on the `onComplete` callback eventually being invoked. It is also problematic if the scene changes, or the `GameObject` gets destroyed, or if we want to stop this process for any reason. Since we do not keep a reference to the `Task`, we cannot cancel or observe it directly, and the callback may come back to an object that does not exist anymore.
- Our `async` method returns a `Task<Texture2D>` but also uses a callback to report the result of the same operation. I do not know if this is a named anti-pattern, but it feels wrong. You are supposed to use Tasks in a flow that resembles a synchronous operation, and having callbacks like this goes against that principle.

We need a way to have these two operations work in a more unified system, so we are not dealing with both callbacks and Tasks at the same time.

### A Naive Approach

You might know that you can wait for a `Task` from a Unity coroutine by polling its completion, which might tempt you to transform `GetImageFromGallery()` and `GetImageFromPath()` into coroutines like this:

```csharp
public static IEnumerator GetImageFromGallery(Action<Texture2D> onComplete = null)
{
    bool isPathReady = false;
    string loadedPath = string.Empty;
    
    GetImagePathFromGallery(path =>
    {
        loadedPath = path;
        isPathReady = true;
    });
    
    yield return new WaitUntil(() => isPathReady);
    yield return GetImageFromPath(loadedPath, onComplete);
}

public static IEnumerator GetImageFromPath(string path, Action<Texture2D> onComplete = null)
{
    Task<Texture2D> task = NativeGallery.LoadImageAtPathAsync(path);
    yield return new WaitUntil(() => task.IsCompleted);

    var texture2D = task.Result;
    onComplete?.Invoke(texture2D);
}
```

This seems like a good approach at first, since using a callback inside a coroutine is a common pattern. But using `yield return` to poll an async `Task` has a few problems:

- You can see how `GetImageFromPath` lost the `try/catch` block. We cannot use it the same way with the `yield` inside, and using it only around the `Task` variable is different from using it around the `await` call as we had before. To keep the same safety we would need an extra wrapper method, which adds more noise.
- In our use case we still have the main `GetImagePathFromGallery()` method with a callback, which we are now only using as a flag-raising mechanism so our coroutine knows when to continue. If you need to adapt several calls this way, the extra boilerplate will start to look very suspicious.
- We are adding polling overhead to the waiting process. When using this coroutine, the `Task` will run on its own thread or scheduler, but the coroutine will check every frame to see if the `Task` has already completed or not. We lose the clean async flow that can simply wait for completion using the `await` keyword.
- If we want to handle errors, we now need to do it after the `yield`, checking `task.IsFaulted` or similar, and we would need some way to pass that information back to the caller. Since we are now outside the async/await flow, error handling becomes more awkward.
- I am sure there are scenarios where doing this is a valid approach, but in my opinion, using the full power of async/await is usually better in the long run. Mixing two different async systems like this does not look like clean code.

## An Async Solution

While looking for a solution that would keep the async flow in place, I stumbled upon [`TaskCompletionSource<T>`](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskcompletionsource-1?view=net-10.0). The important thing about this class is that it lets you manually create and complete a `Task<T>`, which is perfect for bringing callback-based APIs into the async/await world.

The way this works is pretty straightforward. You create a `TaskCompletionSource<T>`, which gives you a `Task<T>`. You can then wait for that `Task` to finish, but in order for it to complete you need to call `SetResult(T result)` (or `SetException` / `SetCanceled` for error cases). Any value assigned through `SetResult()` will mark the `Task` as completed. Here is a quick example:

```csharp
public static async Task WaitingExampleAsync(string animationName)
{
    await PlayAnimationAsync(animationName);
}

public static Task<bool> PlayAnimationAsync(string name)
{
    var taskCompletion = new TaskCompletionSource<bool>();
    
    PlayAnimation(name, onComplete: () =>
    {
        taskCompletion.SetResult(true);
    });
    
    return taskCompletion.Task;
}
```

In this example, `WaitingExampleAsync()` will wait until the callback-based operation calls `taskCompletion.SetResult(true)`. You can also capture the value passed to `SetResult()` if this information is relevant for your system, but the key point is that by calling this method the `Task` is completed.

To update our code to make use of this, we need to update `GetImagePathFromGallery()`. Let me show you the original code and how it would look with `TaskCompletionSource`:

```csharp
// Our old synchronous call with an onComplete callback
public static void GetImagePathFromGallery(Action<string> onComplete)
{
    try
    {
        NativeGallery.GetImageFromGallery(onComplete.Invoke);
    }
    catch (Exception e)
    {
        onComplete?.Invoke(string.Empty);
        Debug.LogError(e.Message);
    }
}

// New asynchronous call that returns the path as a Task
public static Task<string> GetImagePathFromGalleryAsync()
{
    var taskCompletion = new TaskCompletionSource<string>();
    
    try
    {
        NativeGallery.GetImageFromGallery(taskCompletion.SetResult);
    }
    catch (Exception e)
    {
        taskCompletion.SetResult(string.Empty);
        Debug.LogError(e.Message);
    }

    return taskCompletion.Task;
}
```

In the async version we still have a proper `try/catch`, there is no `onComplete` callback anymore, and we can treat this API call as a regular `Task<string>`. This means we can update our `GetImageFromGallery()` to just a couple of lines and turn `GetImageFromPathAsync()` into a proper async call without a callback:

```csharp
public async Task<Texture2D> GetImageFromGalleryAsync()
{
    var path = await GetImagePathFromGalleryAsync();
    var texture2D = await GetImageFromPathAsync(path);
    return texture2D;
}

public static async Task<Texture2D> GetImageFromPathAsync(string path)
{
    Texture2D texture2D = null;

    try
    {
        texture2D = await NativeGallery.LoadImageAtPathAsync(path);
    }
    catch (Exception e)
    {
        texture2D = null;
        Debug.LogError(e.Message);
    }

    return texture2D;
}
```

Doesn't this look much cleaner now? 

### Why This Works and Tradeoffs

Everything is speaking the same async language now, and the code is much simpler to read and follow. You can treat the whole operation as a single asynchronous call. It is easy to add new steps to `GetImageFromGalleryAsync()`, and, when calling it, it is pretty obvious what you can expect from it.

You might already be thinking about the call we are wrapping: `NativeGallery.GetImageFromGallery(taskCompletion.SetResult);`. If this were completely synchronous, it would call `taskCompletion.SetResult()` immediately, before we even get to `await` the resulting `Task`. That is actually fine: it would just mean the `Task` is already completed when awaited. However, in this particular API, `NativeGallery.GetImageFromGallery()` makes a call to the native mobile code and opens the file browser for the user to look up an image, select it, and confirm it. Ultimately the callback is triggered later by the native code on Android or iOS.

This means that if you have a completely synchronous operation, wrapping it with `TaskCompletionSource` will only make the call *look* async; all the work will still run in one go. That can still be useful for consistency of your APIs, but it will not magically make the work non-blocking, so keep that in mind before you start wrapping everything.

It is also important to note that when you start using async and `Task` operations in your code, they tend to spread through the codebase almost like a virus, since you will need to handle, trigger, and wait for them everywhere these operations are needed. But if your code needs it, embrace it.

## Bottom Line

Using `TaskCompletionSource` to wrap callback-based operations like the ones from the NativeGallery API produces cleaner and easier-to-read code. The way these methods work and compose becomes much clearer as you read through them, and you do not need to reconcile two different async systems like we had in the coroutine and `Task` naive approach.

When you strive for simplicity in your code, keeping a single mental model and a single async system is very helpful in the long run, both for your sanity and for the maintainability of the code. Clean wrapper methods like this can help you get there.

Here are a couple of extra details I skipped earlier to keep the explanation of the core solution cleaner:

- When using `TaskCompletionSource` and calling `SetResult()` (or `SetException` / `SetCanceled`), the continuations of that `Task` are, by default, allowed to run inline on the same thread that calls `SetResult()`. In some scenarios, especially when you combine this with blocking waits or certain synchronization contexts, this can lead to deadlocks or surprising re-entrancy. To avoid this, it is often recommended to create a `TaskCompletionSource` like this: `new TaskCompletionSource<T>(TaskCreationOptions.RunContinuationsAsynchronously);`, which ensures continuations run asynchronously.
- In my application I need to use the pattern I just showed you in a few different places, and creating `TaskCompletionSource` instances everywhere felt like a lot of copy-paste. So I created this small helper class:

Gist for: *TaskAsyncExtensions.cs*
{% gist 1fb77671f2e6e6d0d0b586b080404206 %}

And here you can see how `GetImagePathFromGalleryAsync()` would change to use it:

```csharp
public static async Task<string> GetImagePathFromGalleryAsync()
{
    string path = string.Empty;
    try
    {
        path = await TaskAsyncExtensions.MakeAsync<string>(tsc =>
        {
            NativeGallery.GetImageFromGallery(tsc.Invoke);
        });
    }
    catch (Exception e)
    {
        path = string.Empty;
        Debug.LogError(e.Message);
    }

    return path;
}
```

I hope you found this entry useful or insightful. To keep the conversation focused and straightforward, I limited the main topic to the Native File Picker and Native Gallery use case, but here is a quick list of other cases where you might want to follow the same pattern:

- Playing an animation and waiting for its `onComplete` callback.
- Using a Tween like DOTween and adding an `.OnComplete()` to know when it's finished.
- Loading a `Scene` with `SceneManager.LoadSceneAsync()` and subscribing to the `completed` callback of the returned `AsyncOperation`.
- Loading `Addressables` or `AssetBundle` assets with the `Addressables.LoadAssetAsync<T>()` and subscribing to the `Completed` callback of the returned `AsyncOperationHandle<T>`.
- Some UI flows that rely on completion events such as: `onOpen`, `onClose`, `onSendRequest`, etc.
- Long-running gameplay actions that you might want to write linearly instead of nested in `onComplete` callbacks, like `Move to Target`, `Open Chest`, `Play Dialog`, etc.
- Other APIs and SDKs like Ads, In-App Purchases, Backend communication, Clouds, Auth, Save, Leaderboards, etc.

Let me know in the comments below if you have used anything like this, how you handle it, or if you know of other solutions to the same problem. I am really interested in knowing more!