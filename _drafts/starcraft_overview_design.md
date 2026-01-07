---
title: ""
tags: [ ,  ]
category: 
summary: 
---

## Introduction

I've recently finished **StarCraft Remastered**, both the base game and the expansion. It was a great trip back to old times, when I was much younger, Blizzard was a respectable studio and RTS games were still a big deal.

However, while playing it, I noticed something I had never noticed before. From a game design perspective *StarCraft* is incredibly clever, and I'm not talking about the asymmetric races and the impressive balance of unit and moment-to-moment gameplay. Instead, I'm referring to how the story and game progression are structured and presented.

In this review of *StarCraft* I will talk about how the "game" is put together: how the missions and story are structured, how they are presented to the player, and how cohesively these systems support the core gameplay. You'll see that despite using very simplistic solutions, even for the time, they work remarkably well, and the approach used is still highly relevant for indie games of today.

	**starCraft general image here**

## What is StarCraft

I feel this game needs no introduction, but nowadays many people are unfamiliar with it or its legacy, so let's start with a short overview before jumping into the analysis itself.

*StarCraft* is a Real-Time Strategy game released by Blizzard Entertainment on March 31, 1998. Its expansion, **StarCraft: Brood War**, released shortly after on November 30 of the same year. Because the gap between releases was so short, it's difficult to think of them as separate products; for most of the game's lifetime players have experienced them as a complete package. The game launched with Battle.net integration for 
online multiplayer, and the expansion's additional content helped fuel the 
competitive scene that made StarCraft a cultural phenomenon, particularly in 
South Korea.

The game consists of three main game modes: story, custom and online.

In story mode you're introduced to the gameplay mechanics, the world, the interaction between units, and the main characters. The base game functions largely as a tutorial for each race. You start with the Terrans, learning how to harvest minerals and build units. With the Zerg, you learn more about the world and the races from a lore perspective, while also experiencing how different factions force you to think differently about development and strategy. Finally, you play as the Protoss, bringing the first part of the story to a close while still being gently introduced to their unique mechanics and strengths.

It's in the expansion where the story and stakes truly ramp up. You're forced to think on your feet, the narrative takes interesting twists and turns, and the pacing is excellent. This time, you play the Protoss first, then the Terrans, and finally the Zerg. Culminating in three final stages that will push your Zerg control to the limit if you want to succeed. The expansion really tests you, especially in its later half.

As for custom and online modes, these are free-play environments where the goal is simply to win, or experiment with custom map conditions. If you enjoyed the game's story, this is where you can spend years refining your play, fighting other players, and mastering build orders. *StarCraft* is nothing short of a masterclass in RTS design, and the fact that professional players are still active, and competitions still running nearly three decades after release is proof of that.

As I mentioned earlier, I'm not here to talk in detail about each race, their units, balance, strategies, or maps. What I want to focus on is what wraps the gameplay: the structure of the game itself, and the clever, efficient solutions used to present it in a way that's cool, effective, and surprisingly inexpensive.

	**marine cinematic image here**

Now that we're up to date with what *StarCraft* is, lets dig into it's game structure and what makes it clever.

## The Game Structure

Even though completing the story mode takes around 20 to 30 hours, with 56 missions in total (30 in the base game and 26 in the expansion), there is actually **no persistent player state or progression**.

By this I mean that nothing carries over from one mission to another. There are no player stats, levels, or retained units. There are no branching decisions, alternative outcomes, or actions in one mission that affect another. Each mission is a completely isolated map where you attempt to complete the given objective using your own skill.

	**image of mission select screen here**

The game is fully aware of this and doesn't try to hide it. When you enter the mission selection screen for the first time, you can immediately see all three campaigns. The only thing preventing you from playing "the wrong one" first is a simple warning text and a pop-up. Even those can be skipped by clicking OK, and doing so has no gameplay consequences other than potentially missing story context.

	**image of popup here**

Given this flexibility, I'm surprised that individual missions aren't unlocked in the same way. You still need to unlock them one by one for each race. I wonder whether allowing access to all missions would have been too much, or whether Blizzard intentionally allowed access to all races upfront so players could focus on their favorite faction without having to play through the entire story.

When you start single-player mode, you create a profile under which your **stage progress** is saved, along with your save files. These saves only exist to let you pause a mission and resume it later; they track nothing beyond your in-mission actions, and you can create as many as you want.

	**another image here**

This approach is extremely clever. The underlying system for progression is incredibly pragmatic: it only tracks which missions of which race have been completed. That's it. It couldn't be simpler, and it's effective precisely because of that. A more complex progression system would have taken time and resources away from the core of the game: the gameplay itself. *StarCraft* is all about moment-to-moment play, and even the way its story is presented reflects that priority.

## Story Presentation

The story of *StarCraft* is presented entirely through cinematics, which fall into four distinct categories, each simpler and more efficient than the last.

### Video Cinematics

	**example image here**

The full video cinematics of *StarCraft* are classics. Their visual style, sound design, and presentation are iconic and very much products of their time, yet timeless because of it. You can clearly feel the care and effort put into them. There are only a handful, though, which makes sense given how expensive they must have been to produce. As a result, they're reserved for the most important narrative moments of the game, or to present a cool moment where text alone would not have suffice.

### Slideshow Cinematics

	**example image here**

This is an area where the Remastered version made an interesting improvement. The original game displayed green text on a black background, while the remaster adds still images that accompany the same text. Both approaches are similar in spirit: they're cheap to produce, easy to edit, and quick to present.

These cinematics are typically used to bridge gaps between missions, provide campaign introductions, or offer additional context. Interestingly, they're also used at the very end of the game to show the aftermath of events just before the credits roll.


### Briefing Cinematics

	**example image here**

Briefings occur before every mission and, as the name suggests, they explain the current situation and objectives from a narrative perspective. On the same screen, in the bottom-left corner, you can see the gameplay objectives, which are more direct and blunt. The Start button is always available, so in practice you can skip the dialogue entirely, read the objectives, and jump straight into the mission.

There's nothing strictly required in the briefing to play the mission, but the story is engaging enough that, unless you're replaying content, you'll usually want to listen.

The assets used here are extremely efficient. Each race uses the same background throughout its entire campaign. At most, four characters appear on screen, each with a looping animation that isn't synchronized to the voice-over. Everything is driven by audio, with a transcript displayed in the center.

This structure never changes, which means most of the effort goes into writing and voice acting. That's likely what made it feasible to include a briefing for every single mission.

### In-game conversation Cinematics

	**example image here**

These cinematics happen during missions. Not every mission has them, and when they do appear, they're usually at the beginning or end. They're reserved for character introductions or pivotal story moments; most missions simply end with a Victory pop-up once the objectives are completed.

These are arguably the cleverest cinematics of all. The game shows the speaking character's avatar in the UI, reusing the same animations from the briefing cinematics, along with voice-over and on-screen text. If the character is physically present on the map, their selection ring briefly blinks to indicate who is speaking.

That's about it. Characters rarely move or interact with each other. Occasionally, they'll arrive via Overlord, Shuttle, or Dropship before moving into position to speak. In only a handful of cases do characters actually damage each other. Everything is kept deliberately simple, providing story context in the cheapest possible way.

### General thoughts on cinematics

When I say "cheap", "simple", or "easy", I mean that in the best possible way. The game makes very deliberate compromises in how its story is presented, always prioritizing gameplay. And yet, despite these limitations, *StarCraft* delivers a compelling, memorable narrative.

There's clear passion behind the writing and a strong sense of purpose in the events being told. While playing, you never think about these constraints because everything works so well together. Substance and quality win over flashy presentation here, and I love that approach.

## The Player Character

	**example image here**

You are a character in *StarCraft*. During briefings and in-game conversations characters speak directly to you: not to the player, but to the character you embody. This role changes depending on the race: for the Terrans you are the **Commander**; for the Protoss the **Executor**; and for the Zerg a **Cerebrate**.

Interestingly, you never speak. You have no physical representation and never appear in cinematics or major story moments. Once you move on to another race campaign, this character effectively disappears from the narrative without causing any issues, because it never had real narrative weight to begin with.

You could argue that you're responsible for winning the missions, including some extremely difficult ones, but ultimately you're just another tool used by the story's main characters. Blizzard later expanded on these roles in novels, comics, and other media, but those came years after the game's release. Within the context of *StarCraft* itself, your character is essentially a non-character.

This is another smart resource-saving decision. By minimizing the player's narrative presence, Blizzard retained full control over the story while avoiding the need to create additional characters. It's utilitarian, but effective.

## Lessons to learn as an Indie Game Developer

*StarCraft* is a powerful lesson in prioritization. Its primary focus is RTS gameplay, and that's what players remember and return for. Compared to that core, other aspects of the game make clear, intentional compromises.

Custom and online modes are where the game truly shines long-term, supported by a massive community, a map editor, and countless unique experiences. But Blizzard still needed to give the game an identity, a world, a tone, and memorable characters. They achieved that through smart constraints and efficient presentation.

To recap:

- Extremely simple story progression tracking  
- Multiple layers of cinematics:
  - Full-motion video for major moments  
  - Slideshow cinematics for transitions and context  
  - Briefings to establish tone and objectives  
  - Minimal in-game cinematics for key story beats  
- No traditional player character

If you're developing a game where gameplay is the main focus, consider similar shortcuts. These ideas can often be abstracted to other systems as well. A linear overworld? *StarCraft* uses a simple drop-down menu. Need characters to interact outside gameplay? Use a static hub with voice and text.

Modern Unity tools make this even easier. Slideshows, briefings, and in-game cinematics can be built using Cinemachine and Timeline. Instead of a complex save system, something as simple as PlayerPrefs might be enough.

Of course, this was all done in 1998. Market expectations have changed, but these design decisions are still relevant, especially for indie developers who need to prioritize what truly matters.

## Bottom Line

Every game has something to teach you, whether it's a good or bad game. *StarCraft* is a golden example of RTS design, and the structure surrounding that gameplay is nothing short of brilliant.

As indie developers, it's easy to spread effort evenly across every system, but it's far more important to understand where that effort truly pays off. Seeing a game like *StarCraft* make smart compromises, and still deliver a complete, memorable experience, which is reassuring. Execution and content matter more than complexity.

Thank you for reading my first game review. I'm constantly playing games and discussing ideas with friends, and it feels good to finally have a place to ramble about the things that interest me in writing form. Expect more reviews in the future, across many genres. One day it might be a 1998 classic, the next something modern. That's just how I enjoy gaming.

Let me know in the comments what you think about this post and *StarCraft*. Are you still playing it? Do you have a favorite race, or a main when playing online? Hit me up if you want a match.

	**svc image**