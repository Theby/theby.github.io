---
title: "Latin America growing video game industry at Gamescome Latam 2026"
tags: [ update, gamescom, gamescomlatam, gamescomelatam2026 ]
category: blog
excerpt_separator: "<!--more-->"
---

# A big motivation and inspiration

I am back from São Paulo, Brazil after espending four days at Gamescom Latam 2026. It has been a big event, full of amazing games, but local and from the world, as well as indie to AAA games. And the general public is really full of energy!

<!--more-->

Gamescom took place from X to Y.

My days were split between the B2B area where I had different kinds of meetings with other companies and representatives, and the showcase floor itself where I took my time to play the games on display, upcoming releases and talking with some of the local developers of Brazil. The games the local community had in display were of an amazing quality, it really makes me feel I should level up, both on my craft and on the work of making my own games. There was such a big variaty of games, yet some similarities, that were really inspiring. 

Similar to my [GDC 2026 Summary] post, on this entry we will go day by day and explore the talks and highlights of each day. This is a long post, as it serves as a personal archive and guide of what I saw and learned. So if you are interested only in a few things I recommend you to check these two talks:

- unity optimization
- ask a publisher

As always feel free to contact me for any extra information you need regarding the talks, games and the event. I am always happy to share.

## Index

- [Wednesday](#wednesday)
	- Google Play Services
	- How does Wildlife ship 30 games in 3 days
	- Smooth Mobile Games for peak performance
	- Fanatee Free-to-play monetization
	- Unity AI
	- The multiplatform vision of Google Play
- [Friday](#friday)
	- Networking talk
	- Ask a publisher
- [Bottom Line](#bottom-line)

## Wednesday

This day was a pre-event day. You could go to the Gamescom Latam venue to explore the place before it open to the public on Thursday. Yet I was invited to a private Unity x Google Play event and I was the whole day on it. It was mostly focus on mobile development which I dont do much of, but still a lot of cool things were pretty interesting.

### Google Play Services

YouTab with 250m active monthly users
You nede to set up for your game so things are shown

Sidekick is an overlay for gaming, incorporates YouTab + other features
The idea is to keep players in game when looking informtion up about the game itself
AI game tips
Gemini chat integration
Achievements

Achievements can lead to Quests, that grant goals even if you dont have the game

League system to earn even more Play points

Community posts with auto-filtering and AI-auto translate

### How does Wildlife ship 30 games in 3 days

By Luis Mendez y Caio Renatti

They do a hackaton/game jam every three months that lasts 3 days
They do small teams with the idea to integrate each member in the whole production process of the game
Use if AI is encorauge, the objective is to generate great ideas

3 weeks before the event is the group reservation
2 weeks they send a 1 page GDD, organizers help polish this before the date arrives

Day 0 is environment setup
Day 1 should have a build at the end of the day
Day 3 is debug and release

The company invest in some real marketing and campaigns on Android
3 weeks later a winner is decided by points: total time played / developers = points

They make use of template to accelerate development

### Smooth Mobile Games for peak performance

Most important is thermals and battery

Set a target frame time
Lower devices struggle with volkan

Render Pipeline Arquitecture
Mobile uses tile memory
Memory bandwish usage is important

Check if your game is CPU or GPU bound

Use Unity Frame Debbuger
User Render Doc (For Android)

Mesh Mistakes
- Complex mesh geometry
- Not using LODs
- Not using culling layers
- read/write enabled

Textures
- Set a max size
- Use correct texture compression for device
- Not using power of 2 textures
- having read/write
- not using atlas properly

Lighting
- unnecessary dynamic lights
- size of the light too big
- use light layers
- make shadow usage properly
- consider lower res shadows
- dont render skybox unless in view

Camera
- too many cameras
- optimize post process effects
- too large of a clipping plane range

Shader
- texture sampling count
- too many variants
- keyword usage too high
- SRP Batcher compatibilty, use this
- unnesesary full precision, use half
- too many dynamic branching logic (use of if statements)
- use all channels meaningfully
- complicated nodes in shader graph

Others
- no static batching on mobile
- overshappling/overdraw

Graphic optimizations (URP)
- Use SRP Batcher
- GPU resident drawer use it

Shaders todo
- Log shader compilation
- Strip variants
- Use shader prewaram, pipeline state object
- Dynamic shader loading

Thermals todo
- Use adaptative performance
- On demand rendering
- Aim to 65% frame budget

Use tools (Check photo for more info)
- Requirse Compute Shaders
	- Compile shader requirements

### Fanatee Free-to-play monetization

Three pillars: Acquisition, retention and monetization. (Check photo for more info)
IAPs/ Ads / Subscriptions
Balance for short and long term earnings
IAPs is about repurchase
Ads must be smart, and seen as something overtime and not overload

### Unity AI

By Mike Geig

It works in the editor and has:

Ask to ask questions

Agent (Use Unitys or your own)
Create things, can iterate on them
Unity AI can see the editor so is better at graphics things at the moment
You can transform a FIGMA to UI

AI is intended as assistance not for final product and results

Plan mode for complex tasks

6.0 has AI implemented, 6.4 will add one to analysis profiling results

### The multiplatform vision of Google Play

All platform no exception
Uses emulation on devices that are not android

Your game must be done considering all environments
- Controllers
- Mouse and keyboard
- 4K assets
- Aspect rations
- UI / UX

Play Assets Delivery is a CDN of google

Native android games support keyboard and mouse connection by default

Consider enabling Game Trails, its an option in the Play Console Settings

(Check photo for more info)

## Thursday

This day was a day of meetings, networking and a overview of the showfloor. This day the event was open to the public and a lot of people was all around, if you wanted to play any game or check any booth you had a line to wait at. This also meant a lot of cosplays, I saw a lot of favorites.

I did not attend any talks this day, but I can tell you the event is very well done and organized, if you have the chance to come even as just an atendee is completely worth it.

## Friday

### Networking talk

You should clearly know what you need and what the other wants
Check culture of whom you are meeting
Dont hype everthing nor memorize a pitch
Try to make friends not contracts
Find a way to create a connection
Help them build a connection with other people

### Ask a publisher

A publisher should consider QA and Marketing

Red flags
- should not feel like they are buying the company
- dont lie with time and budget
- budget is for stability not for profit
- bad organization and planning
- they fund projects, not companies
- not understanding your genre and audience
- too many options with not clear end product

You want to work with someone nice

Show diligence

They check your socials

Publisher redflags
- ip ownership
- bad definition of revenuew
- how recoup is done

Ask strenghts and weeknes of publisher
consider taxes and other cuts when showing expected profits

consider publisher preparation costs that makes them picky

publisher also does some editorial work on the games

## Saturday and Sunday

The B2B area was closed Friday and as such I went to the showfloor to enjoy the event, a lot of cosplay and amaing games and prizes.
I also took the oportunity to connect and network with the local indie developers.

## Bottom Line

