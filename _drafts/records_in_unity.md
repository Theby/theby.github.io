---
title: ""
tags: [ "C#",  ]
category: unity
summary: 
---

	Maybe change this section and open with a problem so its more appealing

## On Unity and C#

When working in the Unity environment it's easy to forget that C# and .NET are technologies that every year get new features and updates. Currently Unity 6 uses **C# 9.0** (Partially) and **.NET Standard 2.1**, while the latest C# is 13 and .NET 10 as of November 2025.

	Add why being behind is bad

We seem to be a bit behind. And this slow update has made a lot of Unity developers to stay in their comfort zone of learning more about the language. Luckily, in the recent Unity [Engine Roadmap from Unite 2025](https://youtu.be/rEKmARCIkSI?t=1503) they showed they are working to have Unity 6.7+ up to date with the CoreCLR runtime, so it will be easier to update and support C# 10 and beyond.

But for now, there is one cool new thing I want to talk about from C# 9 which I've found very useful in making the code cleaner, managing data and keeping it protected: *records*.

## What are records

			Add about Positional Syntax

Records are a keyword that help you define a **class** or **struct** with some specific pre-defined behaviors useful for when you work with data models. In particular you want to use them when:

- You need data that depends on *value equality*
- You need data that is *immutable*

*Value equality* means that when you compare two objects, they are equal if both objects are of the same type and all of their field values are equal. which is different when doing regular *class* comparisons which by default only compare their memory reference.

*Immutable* means the data of the object won't ever change after the object is instantiated.

Records can be declared using the following syntax:

```csharp
public record Character(int Health, int Level, int Exp);
```

The first thing to note is that for *record class* you only need the *record* keyword, while for the *struct* you need to be more explicit and type *record struct*, but more on *structs* later.

The way this definition helps you with *value equality* and *immutability* is:

- It automatically overrides the equal comparisons for `Object.Equals(Object)`, `==` and `!=`, checking type and each of the parameters defined in the signature.
- If you read again the example above, each parameter defined was written with upper case first, this is because you are actually declaring properties, and this properties are automatically defined as *init-only*, meaning you can only set their values during object instantiation. Then they are accessed as properties, which you would normally write as PascalCase.
- Additionally, a *record* class can inherit from another *record* class, but it would not work if you do it with the regular class.
- A *record* also overrides `ToString()` giving you a handy formatted string, which for our example above would be:

```csharp
Character character = new(100, 1, 0);
Debug.Log(character.ToString());
// output: Character { Health = 100, Level = 1, Exp = 0 }
```

	non-destructive mutation with with

For *structs* they are declared slightly different:

```csharp
public record struct Weapon(int Damage, int Range, int Ammo);
public readonly record struct Profile(string Name, int Age);
```

A regular `record struct` has it's properties declared as read-write, so you need to use `readonly` like in `Profile` to make it `immutable`. It's easy to confuse this when you work with `record` classes and struct. 

Also, only for `record struct`, a parameter-less constructor is generated, which initialize all the parameters with their default values.

There are more details and implementations that you can do with *records*, it's actually pretty flexible, but with the information I have show you above we can start exploring how to use them in our code and how they help us.




## Using records






	Why I Started Using <Feature> / Hook
	The Old Way / Context/The Problem
	What <Feature> Actually Does
	Applying <Feature> to a Real Example
When This Shines (and When It Doesn’t)
Gotchas and Unity-Specific Notes
How This Changed My Code
Conclusion/Key Takeaway