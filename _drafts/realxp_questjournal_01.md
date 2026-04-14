# C# Records in Unity: Immutable Data for Your Quest System

## Part 1 of Building a Quest Journal from Database to Screen

Welcome to the beginning of a six-part series where we will build a Quest Journal from data to UI. This series will cover a complete data architecture for Unity games. We will target Unity 6.3, leaning on modern solutions introduced in C# 9.0, as far as Unity supports them.

Each post will build toward a functional Quest Journal system, showing how to persist game data using SQLite, model it with C# records, and present it through a clean MVP pattern. These tools are not used as often as they should be, yet they have great potential for solving real problems. A Quest Journal provides a fun way to design from the bottom up, resulting in a visual and interactive final example. If you’re interested in learning C# patterns and expanding your knowledge of the tools already at your disposal, this series is for you.

A Quest Journal is a common gameplay system used to track player objectives, active quests, and narrative progression within a game. It typically serves as a central location for presenting the current goals of the game, while also acting as a persistent record of the player’s progress. Because it combines data persistence, state management, and user interface concerns, a Quest Journal provides a well-scoped and practical example for exploring game architecture and system design.

In this entry, we focus on *records* themselves: what they give you, a Unity workaround, and the `Quest` and `Objective` definitions that will carry through the entire series.

## Context

When designing any system that relies on data at its foundation, a solid approach is to create strict data containers that represent the base state of the system.

For our Quest Journal we can think of a Quest as having an ID, a title, a description, and a completion state. This is our foundation, and your first instinct might be to create a simple class:

```csharp
[Serializable]
public class QuestData
{
    public int id;
    public string title;
    public string description;
    public bool isComplete;
}
```

This looks good, but since this is data, we want it to meet some strict requirements:
- **Immutability**: Once created, the data does not change.
- **Value Equality**: When comparing two different instances of the same type that contain the same data, the comparison returns `true`.

Doing this has a lot of benefits:
- From **Immutability**:
- Data can be trusted at all times, since it will not change when passed to other methods.
- Debugging becomes easier, because if data is wrong, it happened at creation time.
- It is safe to share between systems, since the data remains the same everywhere.
- Since it doesn’t change, it is thread-safe by design.
- From **Value Equality**:
- Collection lookups work correctly because equality is based on content, not instance identity.
- Changes in data are easy to detect, since even one differing value makes two instances unequal.
- Testing is straightforward, as results based on data are predictable and easy to compare.

These two requirements can be added to our previous `QuestData`, expanding it to the following:

```csharp
using System;
using UnityEngine;

[Serializable]
public class QuestData : IEquatable<QuestData>
{
    [SerializeField] private int id;
    [SerializeField] private string title;
    [SerializeField] private string description;
    [SerializeField] private bool isComplete;

    public int Id => id;
    public string Title => title;
    public string Description => description;
    public bool IsComplete => isComplete;

    public QuestData(int id, string title, string description, bool isComplete)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isComplete = isComplete;
    }

    public bool Equals(QuestData other)
    {
        if (other is null) return false;
        if (ReferenceEquals(this, other)) return true;

        return id == other.id
            && title == other.title
            && description == other.description
            && isComplete == other.isComplete;
    }

    public override bool Equals(object obj)
    {
        if (obj is null) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != GetType()) return false;

        return Equals((QuestData)obj);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(id, title, description, isComplete);
    }

    public static bool operator ==(QuestData left, QuestData right)
    {
        if (left is null) return right is null;
        return left.Equals(right);
    }

    public static bool operator !=(QuestData left, QuestData right)
    {
        return !(left == right);
    }

    public override string ToString()
    {
        return $"QuestData: {id}, {title}, {description}, {isComplete}";
    }
}
```

As you can see, in order to meet our two seemingly simple requirements, the class has grown considerably. Accommodating both **Immutability** and **Value Equality** leads us to a classic pattern, one that fills the class with a lot of boilerplate code that is not obvious at a glance. This usually requires good comments and documentation to keep intent clear.

Attentive readers may also notice that `IsComplete` is a value we will eventually want to modify in order to save the quest state for the player. That means this class could grow even more once we add methods to update specific fields.

All of this is cumbersome to maintain, and as we add more data types to the system, creating new classes will be slow and repetitive, with most of the code looking like copy-paste just to satisfy the same data requirements.

Luckily for us, we have a solution: *records*.

## Records: The One-Line Solution

C# *records* offer a much cleaner path for our data implementation.

- They are reference types with value equality: heap allocated, but equal when their data is equal.
- They are immutable by default, which sounds limiting until you meet the `with` expression for creating modified copies.
- They automatically generate the boilerplate we had to write in our previous `QuestData`: constructors, equality members, and a readable `ToString`.

All of this means we can now do this:

```csharp
public record QuestData(int Id, string Title, string Description, bool IsComplete);
```

And we get a type that is **immutable**, has **value equality**, and provides a `ToString` override by default.

```csharp
QuestData questData = new QuestData(0, "Example", "A Good example", false);

Debug.Log(questData.ToString());
// Prints: QuestData { Id = 0, Title = Example, Description = A Good example, IsComplete = False}
```

This is a powerful tool. It compresses our old `QuestData` class from 60+ lines down to just one, while offering the same features and making it far easier to change, expand, and add new data types with the same guarantees.

You might be wondering about the `with` expression mentioned earlier. While this *record* is immutable, we will need to change the value of `IsComplete` at some point, and for that we can use **non-destructive mutation**.

Let’s look at an example:

```csharp
var quest = new QuestData(0, "The Lost Artifact", "Find the ancient relic", false);
var completed = quest with { IsComplete = true };

Debug.Log(quest == completed); // false
Debug.Log(quest.Id == completed.Id); // true
```

Here we first create a `QuestData` instance and store it in `quest`. Then, using the `with` expression, we create a new `QuestData` that copies all the data from `quest` but with `IsComplete` set to `true`.

This results in two different objects, `quest` and `completed`. The first comparison returns `false`, not because they are different instances, but because *records* override `==` for us, the comparison is done between their values instead. The second comparison returns `true` because both share the same `Id`. Throughout this process, the original `quest` data never changes.

At this point, it should be clear how *records* are an excellent solution for defining data types. You are probably already thinking of some questions, but before addressing those, we need to focus on a practical issue: as presented, this code will not compile in Unity without a small workaround.

## A Unity workaround for records

If you have never seen the syntax for declaring a *record*, this form is called *positional properties*. These define the properties the *record* will have and that are required to create an instance. This is why they use UpperCamelCase.

Internally, these properties are created with an `init` accessor, which gives them their read-only behavior:

```csharp
/// Id, Title, Description and IsComplete are positional properties
public record QuestData(int Id, string Title, string Description, bool IsComplete);
```

However, `init` setters require a compiler type called `IsExternalInit`, which exists in .NET 5+, but not in Unity’s current runtime.

Fortunately, the compiler only needs this type to exist, so we can define it ourselves:

```csharp
// Place anywhere. Like in Runtime/Utilities/IsExternalInit.cs
namespace System.Runtime.CompilerServices
{
    internal class IsExternalInit { }
}
```

The compiler looks for this type when using positional properties. It does not care whether it comes from the .NET runtime or from our own code, and it does not require any implementation beyond its declaration. With this in place, *records* compile correctly and we can use positional properties as intended.

This workaround is necessary because, while Unity supports C# 9 syntax, its base class library doesn’t include all types introduced in .NET 5+, such as `IsExternalInit`.

I’ll admit this feels a bit hacky. But to my surprise, Microsoft themselves sanction this workaround and they recommend it when targeting older .NET versions. This is not really a Unity specific issue, but rather a .NET versioning problem. Unity has also stated they plan to continue updating their C# and .NET support, so hopefully more features will become available over time.

With *records* now working in Unity, we need to address another topic we have been avoiding: Unity serialization.

## Unity serialization of records

Unity’s serialization system does not work with *records*. Even if you try something like this:

```csharp
[Serializable]
public record QuestData(
    [field: SerializeField] int Id,
    [field: SerializeField] string Title,
    [field: SerializeField] string Description,
    [field: SerializeField] bool IsComplete);
```

Unity still does not know how to serialize them into the Inspector. This happens because *records* lack several elements Unity’s serializer relies on, such as mutable fields, a default parameterless constructor, and a straightforward internal representation. Dictionaries are a well-known example of similar serialization limitations.

You *can* work around this by writing a custom `PropertyDrawer` or using tools like *Odin Inspector*, but for our use case this is perfectly fine. Remember, we are building a Quest Journal, and at this stage we are defining our base data layer. *Records* are the transport layer between *SQLite* and the runtime of the game; they are not meant to be serialized by Unity.

We will talk more about this in later entries, but for now our data flows like this:

```
SQLite -> Records -> Runtime State -> UI
```

This also means our persistence layer lives in *SQLite*, not in Unity. At first glance this may seem like a drawback, but as the architecture takes shape, you will see how much this decision benefits us.

With serialization off the table, our records become pure data contracts: they define shape, not storage. That clarity is valuable, so let’s properly define the data that will serve as the foundation of the system. After all, a `Quest` needs `Objectives`.

## Main data of a Quest Journal

If you have played any RPG with a quest log, you are familiar with this structure: a list of quests, each with trackable objectives. Games usually provide a UI to review all quests the player has completed or is currently pursuing, commonly called a Quest Journal.

We can define the required data as follows:

- `Quest`: Has a unique identity, descriptive data, an activation state to know whether the player has started it, and completion data.
- `Objective`: Has a unique identity, belongs to a quest, includes descriptive data, and tracks progress toward a target.

This describes a one-to-many relationship: a `Quest` has multiple `Objectives`, but an `Objective` belongs to a single `Quest`.

Expressed as records, this looks like:

```csharp
namespace QuestJournal.SQLData
{
    public record QuestData(
        int Id,
        string Title,
        string Description,
        bool IsActive = false,
        bool IsComplete = false
    );

    public record ObjectiveData(
        int Id,
        int QuestId,
        string Description,
        int CurrentProgress,
        int TargetProgress
    )
    {
        public bool IsComplete => CurrentProgress >= TargetProgress;
    }
}
```

There is a lot to unpack here, so let’s go from top to bottom.

We use integer IDs because these structures will eventually represent *SQLite* data, and integer primary keys are the traditional database approach. This maps directly to the database layer and gives us all of SQLite’s flexibility. Strings would be more readable, but at this base data layer we can safely skip that without concern.

You may notice that `IsActive` and `IsComplete` in `QuestData` have default values. This is simply to show that positional properties support defaults as well.

`ObjectiveData`, on the other hand, includes a `QuestId` field that links it to its parent `Quest`. When we later query quest information, this will allow us to determine which objectives belong to which quest.

Finally, `ObjectiveData` defines an `IsComplete` property inside the record body. This property is derived from `CurrentProgress` and `TargetProgress`. Importantly: derived data should not be stored redundantly. If we precomputed this value and later changed either progress field, the data could become inconsistent. Also note that, for this reason, `IsComplete` does not participate in equality comparisons between `ObjectiveData` instances.

With these two simple *records*, we can start building the Quest Journal. That said, there is one final topic to address before closing the *records* chapter, and it is probably already forming in the back of your mind.

How do we manage a constantly changing game state with immutable data?

## Immutable data vs Mutable game state

This is one of the biggest challenges of the architecture we are building. Games are inherently mutable: their state changes constantly as the player and other systems interact with the world. Our data, on the other hand, is immutable.

When an `Objective` or `Quest` is updated during gameplay, our naive approach might look like this:

```csharp
// Player accepts a quest
var quest = new QuestData(0, "The Lost Artifact", "Find the ancient relic", true, false);

// Store it somewhere
activeQuests.Add(quest);

// ...... time passes, player completes the quest

// Create the completed version
var completedQuest = quest with { IsComplete = true };
```

But now what do we do with `completedQuest`?

`activeQuests` still holds a reference to the old `QuestData`, and so do the UI and *SQLite*. We need a way to update the game’s state with this new data so that changes propagate correctly and can be persisted.

Here lies the central challenge of the entire series. For now, I am only planting the seed. With each post, we will get closer to a proper solution, and by the fourth entry we should be able to answer this question convincingly.

## Bottom Line

I hope you enjoyed the read. In this first entry of the series, we defined our core data contracts with `Quest` and `Objective`. By using *records* we eliminated a large amount of boilerplate that would otherwise be required to enforce **immutability** and **value equality**.

While using *records* in Unity comes with some friction, the compromises do not limit us. If anything, the lack of Unity serialization reinforces their role as data transfer objects.

There is, still, one big elephant in the room that I have not fully addressed: *records* are reference types, just like classes. So what about *structs*?

There is a reasonable case for using structs here. Our data size is relatively small, `readonly struct` gives us immutability, and structs are compared by value by default using `Equals`.

Still, they are not ideal. We may want to override the `==` operator to avoid reflection-based comparisons used by the `Equals` method, adding back some boilerplate code; and we are not dealing with a volume of quests or objectives large enough to justify stack allocation. In this case, sticking with reference-type *records* offers more benefits.

We could consider `readonly record struct`, but that is a C# 10 feature, and with Unity currently targeting C# 9 we have to work with what we have.

If you are interested in the full power of *records*, I encourage you to explore further. Here are some helpful resources:

- [Microsoft’s Records (C# reference)](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record)
- [Microsoft’s Create record types](https://learn.microsoft.com/en-us/dotnet/csharp/tutorials/records)
- [Microsoft blog: C# 9.0 on the record](https://devblogs.microsoft.com/dotnet/c-9-0-on-the-record/)

Finally, *records* shine beyond our practical Quest Journal example. You can use them in a save system, where immutability helps keep state safe, and value equality makes it easy to check whether the current game state differs from the last saved state.

They are also a great fit for event or command systems. The data flowing through these channels usually represents past actions and should be immutable. This enables reliable replay and undo systems.

Lastly, configuration and balance data (such as difficulty settings, damage multipliers, and XP curves) is typically loaded once and referenced everywhere. Immutability prevents gameplay code from accidentally modifying values that are meant to remain fixed at all times.

And with that, we close the first part of *SQLite to UI in Unity: Records, Persistence, and MVP — Building a Quest Journal from Database to Screen*.

In the next entry, we will continue building this architecture:

```
SQLite -> Records -> Runtime State -> UI
```

We will focus on getting *SQLite* running in Unity so these records have somewhere to live. SQLite is a tool that goes underused in Unity and game development in general, yet it comes with some interesting perks and a few setup quirks. Combined with the architecture we are building, it becomes a very powerful solution.

I hope you are looking forward to it.

Let me know in the comments below if you have used anything like this, how you handle it, or if you know of other solutions to the same problem. I am really interested in knowing more!