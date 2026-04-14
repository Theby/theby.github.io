# Building a Quest Journal in Unity: Part 2 - SQLite

## A clean way to have SQLite running in Unity for any platform and need.

In Part 1 we defined the data we will use for our Quest Journal:  `QuestData` and `ObjectiveData` as C# Records. They provide us with immutable and value-equal data, ready to carry our quest state through the system. But records describe data. They do not store it.

In this six-part series, we are building a Quest Journal from raw data to a polished UI using a practical, production-minded architecture for Unity. We'll target Unity 6.3 and lean on modern C# features up to C# 9.0 where Unity supports them.

By the end of this article, you will have SQLite running inside Unity, a `.db` file on disk, and a connection service the rest of the series will build on. We will also cover how to get SQLite running seamlessly in Unity, platform differences and how it is important to start with a correct connection management that goes beyond just a single line of code.

## The Problem

Our objective is to have the Quest Journal information persist between sessions, updating as we go. C# Records offer us a pretty good way to handle the quest data during runtime, but we need a place where we can store the information of all quests in the game, as well as their state.

You may be thinking of JSON files since there are good libraries to create, edit and read JSON in Unity, but the main issue is that if you only have one file with the whole Quest Journal you will be loading the entire file into memory just to read a couple of entries at a time. If you then consider splitting into multiple files it quickly balloons into a file organization problem, growing pretty fast and prone to human error. You can see how ScriptableObjects presents similar problems.

So then, how does SQLite help us in this context? SQLite is a full relational database engine in a single file, with no server required. It supports SQL queries, transactions, and foreign keys. It ships with iOS and Android at the OS level. And for a system with a clear one-to-many relationship between quests and objectives, where we will eventually query "all active quests with incomplete objectives", the relational model fits naturally. Additionally, SQLite does not load fully into memory, instead it loads only the pages that satisfy a query.

However, if you search the web for how to get SQLite into Unity you will realize there are quite a few options, and none of them is quite straightforward, which is one of the main reasons SQLite does not get too much love in Unity.

## Getting SQLite into Unity

There is no official Unity package for SQLite, and the common approaches like NuGet-via-Unity, third-party wrappers, and asset store plugins; all introduce tooling friction or maintenance risk. The cleanest path is also the most direct. Copy the library source into your project.

[sqlite-net](https://github.com/praeclarum/sqlite-net) is a lightweight C# library that maps your classes directly to SQLite tables. It ships as a single file, `sqlite-net/src/SQLite.cs`, which you grab straight from the repository and drop into your Assets folder. No package manager, no DLL conflicts, no indirect dependencies to untangle. The file becomes part of your project, you own it, you can read it, and you can modify it when needed.

The only additional requirement is a native SQLite library, and what that means depends on your target platform.

### Mac and iOS

These operating systems ship SQLite natively at the OS level. No native binary is needed on your end. Just having `SQLite.cs` into your project is enough to make it work on these platforms.

### Windows PC

There is no native SQLite included here. After copying `SQLite.cs` into your project we need to supply the native layer. It is recommended in [sqlite-net](https://github.com/praeclarum/sqlite-net) to get `sqlite3.dll` from the [official SQLite downloads page](https://www.sqlite.org/download.html) and place it in `Assets/Plugins/x86_64/`. Unity will include it in the build automatically.

### Android

Every Android device ships with SQLite natively like iOS, however different devices can have different versions of it, so it is recommended in [sqlite-net](https://github.com/praeclarum/sqlite-net) to get the [official sqlite-android AAR](https://github.com/requery/sqlite-android) rather than relying on the system version. This gives you a consistent SQLite build across devices. The downloaded `.aar` must be placed in `Assets/Plugins/Android/`. 

### Unity Folder structure

Once the files are in place, your project structure may look like this:

```
Assets/
  Plugins/
    Android/
      sqlite-android-3.xx.x.aar
    x86_64/
      sqlite3.dll
  ThirdParty/
	  SQLite/
		  SQLite.cs
```

If you use a different structure feel free to adapt it, the important step is to have the `.aar` and `.dll` files under the Plugins folder.

## SQLite.cs Library Path

Depending on your platform of choice we need to do an update to `SQLite.cs`, I recommend doing this regardless of your current target, since it adapts automatically as you switch platforms.

We need to update the `LibraryPath` constant near the top of `SQLite.cs` to point to the correct SQLite version for each platform:

```csharp
// In SQLite.cs, find this constant and update the Android value
const string LibraryPath = "sqlite3";

// Change to
#if UNITY_IOS && !UNITY_EDITOR
		const string LibraryPath = "__Internal";
#elif UNITY_ANDROID && !UNITY_EDITOR
		const string LibraryPath = "sqliteX";
#else
		const string LibraryPath = "sqlite3";
#endif
```

For iOS, `__Internal` is only needed during a device build. The `!UNITY_EDITOR` guard ensures the Editor never tries to use it. For Android, the AAR exposes its library under the name `sqliteX` to avoid collisions with the system library, so we need to use that name instead. In all other cases, whether it is Mac or Windows, `sqlite3` is the correct value. This way the right native library is always targeted for whichever platform you are building on.

## Creating the database file

To create the database in code we simply need to tell our SQLite library where it is located. If it does not find a file there, it will create one at that location on the first write or table creation.

```csharp
// Creating the path to the Database file
var dbPath = Path.Combine(Application.persistentDataPath, "quest_journal.db");
```

It is important that the file ends with the `.db` extension and that you use `Application.persistentDataPath` for compatibility across platforms. Unity ensures this path is not cleared between sessions and that you can write to it, even on mobile devices.

With this path we can create our database and secure a connection to it using the following constructor, provided by `SQLite.cs`:

```csharp
// Creating the Database and securing a connection to it
var connection = new SQLiteConnection(dbPath);
```

It would be ideal to have a Service class where we can manage this database creation, so now we are jumping into proper code implementation, creating a management layer for our database.

## Connection Management

We need a place to own our `SQLiteConnection` so we can manage its lifetime correctly and dispose of it when necessary.  

```csharp
namespace QuestJournal.Services
{
    public class SQLiteService : IDisposable
    {
        private SQLiteConnection connection;
        private bool disposed;

        public SQLiteService(string databaseName)
        {
            var fullName = Path.ChangeExtension(databaseName, "db");
            var path = Path.Combine(Application.persistentDataPath, fullName);
            connection = new SQLiteConnection(path);
        }

        public void Dispose()
        {
            if (disposed)
	            return;

            connection?.Close();
            connection?.Dispose();
            disposed = true;
        }
        
        // We are adding this as temporary code for testing the connection
        public void LogConnectionInfo()
				{
				    var path = connection.DatabasePath;
				    var version = connection.ExecuteScalar<string>("SELECT sqlite_version();");
				
				    Debug.Log($"[QuestJournal] DB path: {path}");
				    Debug.Log($"[QuestJournal] SQLite version: {version}");
				}
    }
}
```

This class allows us to create a database by giving it a name, and then dispose of it cleanly when it is no longer needed.

You may notice the `Close` call before `Dispose`, this ensures the connection is terminated correctly on any platform and is the recommended way to release a connection in the sqlite-net documentation.

This class is designed with reusability in mind. For our Quest Journal we will need only one database, but if you are wondering whether multiple concurrent connections are possible the answer is yes, and this class supports that by simply creating a new object passing a different name.

In the third entry of this series we will expand this class with CRUD methods so we can Create, Read, Update and Delete records in the database directly.

To wire this into Unity's lifecycle we can use a bootstrapper like this:

```csharp
using UnityEngine;
using QuestJournal.Services;
		
namespace QuestJournal
{
	public class QuestJournalBootstrapper : MonoBehaviour
	{
		private SQLiteService sqliteService;

    private void Awake()
    {
        sqliteService = new SQLiteService("quest_journal");
        sqliteService.LogConnectionInfo();
    }

    private void OnDestroy()
    {
        sqliteService?.Dispose();
    }
	}
}
```

By doing this we can expect a log like the following from `LogConnectionInfo()`:

```
// Logged at Awake
[QuestJournal] DB path: /Users/name/Library/Application Support/DefaultCompany/QuestJournal/quest_journal.db
[QuestJournal] SQLite version: 3.43.2
```

The version number confirms the native library loaded correctly. The path tells you exactly where the file landed on this platform. If the native binaries are missing or misconfigured you will get an exception when running Unity.

Navigate to that path and confirm the database file has been created. I recommend using [DB Browser for SQLIte](https://sqlitebrowser.org) (free and cross-platform) to open the file and explore it. Even though it is empty right now, it is a useful habit to verify that what you write to the database later looks exactly as you expect.

## Bottom Line

SQLite is now running inside Unity 6.3. We vendored sqlite-net directly into the project, handled the platform differences once and cleanly, and wrapped the connection in a disposable service with a well-defined lifetime. The hard part of SQLite in Unity is usually just getting it in, but that is now on the bag.

The open question from Part 1, how immutable records coexist with a constantly changing game state, is still open. Deliberately so. Today's job was giving those records a place to live. The answer to that question builds from here.

What comes next has a wrinkle worth looking forward to: sqlite-net needs to construct objects when it reads rows back from the database, and positional records do not make that easy by default. Part 3 goes into exactly that, how Records and SQLite relate, what constraints exist between them, and how we expand `SQLiteService` into a full data layer. The Quest Journal is about to get real.