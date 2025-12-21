---
title: "Temporal post to test fonts for better reading"
tags: [ test ]
category: blog
---

## Title

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at mattis dui. Sed sed metus nec nisl cursus vulputate. In tristique ex a nisi facilisis, id tristique lacus luctus. Suspendisse sodales elementum sodales. *Cras varius facilisis congue*. Cras ullamcorper iaculis fermentum. Suspendisse nec ligula arcu. Praesent commodo **tellus non eleifend** ultricies. Aliquam id neque suscipit, eleifend ipsum quis, ullamcorper massa. Nunc ac diam enim. Mauris mollis maximus massa a vulputate. ***Maecenas elementum luctus neque***, sit amet tempus erat. Sed nec arcu non sapien aliquet sollicitudin. Sed id porta eros, at viverra augue. Nunc id placerat lacus.

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

Nulla elementum imperdiet felis ac commodo. Suspendisse porta orci in elementum porta. Cras vehicula eleifend mi. Sed et consectetur ipsum. Donec eu mauris vel tortor pulvinar rutrum a id nisi. Duis nulla odio, cursus vel viverra ut, dignissim fringilla arcu. Phasellus dignissim augue eu augue molestie venenatis. Donec at libero nisi. Vivamus id urna a mi aliquam egestas vitae cursus diam. Morbi venenatis volutpat lorem eget ornare. Morbi blandit, risus at vehicula posuere, nulla tellus dignissim augue, quis ornare enim tellus eget leo. Sed eu suscipit massa. Nunc commodo eu felis nec ultrices. Ut id neque vel leo dictum lobortis. Suspendisse ut elementum justo. Nam mollis sem at massa volutpat, ornare posuere nibh iaculis.

- Proin at orci id libero egestas suscipit non at metus.
- Nulla semper quam id libero fringilla convallis.
- Integer convallis lacus at magna placerat, varius efficitur libero cursus.
- Praesent auctor sapien non magna bibendum venenatis.
- Maecenas a odio ornare, dignissim dolor sit amet, sollicitudin lacus.

```c#
public delegate void MediaPickCallback(string path);

public static void GetImageFromGallery(MediaPickCallback callback, /* some optional config params */) { ... }
```

### Smaller Title

Aenean volutpat urna dolor, eget vulputate sem interdum at. `GetImageFromGallery()` Vivamus malesuada ultricies metus non tincidunt. Maecenas elit lectus, sollicitudin sed consectetur quis, consectetur vel lectus. Etiam ut nunc metus. Maecenas aliquet sapien a consequat viverra. Ut posuere egestas diam, vitae laoreet leo tempus et. Pellentesque vel neque ut ante posuere `GetImageFromGallery()` fringilla id a magna. Nunc blandit scelerisque viverra.
- test 1
- test 2

In hac habitasse platea dictumst. Nulla facilisi. Donec hendrerit euismod ante. Nulla ut vehicula dui. In hac habitasse platea dictumst. Morbi ut sollicitudin libero, eu venenatis massa. Proin diam justo, suscipit nec tempus eu, `GetImageFromGallery()` posuere eu leo. Suspendisse tortor tellus, posuere a blandit ut, convallis vitae diam. Etiam tempus dictum neque consectetur mollis. Vivamus in eros sodales, porta arcu ac, iaculis lectus. Praesent a posuere est.

Maecenas aliquam tempor eleifend. Donec at imperdiet tortor. `GetImageFromGallery()`, `GetImageFromGallery()`, `GetImageFromGallery()` Nulla facilisi. Vestibulum magna tellus, vulputate a odio ac, hendrerit volutpat diam. Suspendisse non metus a neque ultricies hendrerit non eget justo. Curabitur ut sapien arcu. Phasellus scelerisque augue sit amet ante molestie suscipit. Praesent vulputate mauris nec mi fringilla commodo. Aenean eu metus eleifend, efficitur justo sit amet, porta elit. Suspendisse faucibus a libero ac.

Asto sit amet, porta elit. Suspendisse foo:
{% gist 1fb77671f2e6e6d0d0b586b080404206 %}

Ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla ac euismod elit.