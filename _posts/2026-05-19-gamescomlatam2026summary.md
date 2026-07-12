---
title: "Latin America's growing video game industry at Gamescom Latam 2026"
tags: [ update, gamescom, gamescomlatam, gamescomlatam2026, unity, mobile-optimization, game-publishing, unity-ai, gamedev ]
category: blog
summary: "It has been a big event, full of amazing games, both local and from around the world, from indie to AAA. And the general public was really full of energy! This was my first time visiting and it was better than expected, and I cannot wait to go again next year."
---

## A big motivation and inspiration

It has been a big event, full of amazing games, both local and from around the world, from indie to AAA. And the general public was really full of energy! This was my first time visiting and it was better than expected, and I cannot wait to go again next year.

Gamescom Latam took place from April 29 to May 3, with over 154,000 visitors, more than 13,000 business meetings held and companies from 59 countries in the business area. You can see more of these statistics in their [official press release](https://www.gamescom.global/en/gamescom-latam-2026-wraps-up-with-record-breaking-results).

My days were split between the B2B area, where I had different kinds of meetings with other companies and representatives, and the show floor itself, where I took my time to play new games and upcoming releases and to talk with some of the local Brazilian developers. The games the local community had on display were of an outstanding quality; it really makes me feel I should level up, both in my craft and in the work of making my own games. There was such a big variety of games, yet also some clear similarities, and both were really inspiring.

One important similarity between the games is that I saw a lot of them using cards for their mechanics. Quite a few were clearly Slay the Spire inspired, while others had a different gameplay loop yet still used cards as the main interaction and representation of their world. Two examples, one of each, are: [Sigils of Nightfall](https://store.steampowered.com/app/3039980/Sigils_of_Nightfall/) and [StackMon](https://store.steampowered.com/app/3729550/Stackmon/).

Similar to my [GDC 2026 Summary](https://theby.github.io/blog/gdc2026summary/) post, in this entry we will go day by day and explore the talks and highlights of each day. This is a long post, as it serves as a personal archive and guide of what I saw and learned. So if you are interested only in a few things, I recommend you at least check out these two talks:

- [Smooth Mobile Games for Peak Performance](#smooth-mobile-games-for-peak-performance): a lot of tips and good practices for mobile game optimization
- [Ask a Publisher: What Deals Really Look Like](#ask-a-publisher-what-deals-really-look-like): a four-publisher roundtable on how publishing deals really work, and the red flags both sides should watch for

As always, feel free to contact me for any extra information you need about the talks, games and the event. I'm always happy to share.

## Index

- [Wednesday](#wednesday)
	- [Google Play Services](#google-play-services)
	- [How Does Wildlife Ship 30 Games in 3 Days](#how-does-wildlife-ship-30-games-in-3-days)
	- [Smooth Mobile Games for Peak Performance](#smooth-mobile-games-for-peak-performance)
	- [Fanatee Free-to-Play Monetization](#fanatee-free-to-play-monetization)
	- [Unity AI](#unity-ai)
	- [The Multiplatform Vision of Google Play](#the-multiplatform-vision-of-google-play)
- [Thursday](#thursday)
- [Friday](#friday)
	- [Turning Networking into Real Partnerships](#turning-networking-into-real-partnerships)
	- [Ask a Publisher: What Deals Really Look Like](#ask-a-publisher-what-deals-really-look-like)
- [Saturday and Sunday](#saturday-and-sunday)
- [Bottom Line](#bottom-line)

## Wednesday

![Unity x Google Play Developer Day]({{ '/assets/images/2026/gamescomlatam/wednesday.jpg' | relative_url }} "Unity x Google Play Developer Day")

This was a pre-event day. You could go to the Gamescom Latam venue to explore the place before it opened to the public on Thursday. I was invited to a private Unity x Google Play event, though, and spent the whole day there. It was mostly focused on mobile development, which I don't do much of besides porting, but a lot of cool things were still pretty interesting.

### Google Play Services

![Google Play Services]({{ '/assets/images/2026/gamescomlatam/googleplayservices01.jpg' | relative_url }} "Google Play Services")

They showed what they are planning to do with Google Play in the future. Here are the highlights:

- Google said the somewhat new **YouTab** option in Google Play has 250M monthly active users. For your game to show here, you need to set it up with all the required information and image sizes so things display correctly to users.
- They are also developing a gaming overlay called **Sidekick**. It incorporates YouTab plus some additional features. The idea is to keep players in the game when looking up information about the game itself, like guides, achievements or related content. It will have an AI for game tips, and they are exploring adding Gemini chat integration.
- Achievements can lead to Quests. These are shown even to players who do not have the game, making them want to try it to get the reward, which can be Play Points or other platform-wide prizes. This also feeds into a League System where you earn even more Play Points by completing these across the whole Google Play environment.
- Finally, they are adding Community posts with auto filtering and AI auto-translation to generate conversations around the game within the Google Play ecosystem.

Through all of it, their goal is to keep users inside Google Play as long as possible, so they don't switch context and let their attention drift somewhere else, like into some social networks. Mobile has always been a market about retention, and we can see here that things are still aiming big in that direction.

### How Does Wildlife Ship 30 Games in 3 Days

Talk by Luis Mendez and Caio Renatti, who showed how their company uses internal game jams to boost its game output:

- They run a hackathon/game jam every three months that lasts 3 days
- They form small teams, with the idea of integrating each member into the whole production process of the game
- Use of AI is encouraged; the objective is to generate great ideas

The process starts 3 weeks before the event, which is when the participating teams are registered. Then, a week later, they submit a one-page GDD, and the organizers help polish it before the game jam date arrives.

At the game jam the days progress as:

- Day 0 is environment setup
- Day 1 should have a build at the end of the day
- Day 2 improving the game
- Day 3 is debug and release

The company invests in some real marketing and campaigns on Android, then 3 weeks later a winner is decided by points following this formula: `Total Time Played / number of developers = points`.

Over the years they have developed templates for the game jam, and these templates implement the different APIs and SDKs that are needed by all games, like monetization, ads, Google Play integration and more. This lets the team focus only on game development.

### Smooth Mobile Games for Peak Performance

![Unity Mobile Optimization]({{ '/assets/images/2026/gamescomlatam/unityoptimization01.jpg' | relative_url }} "Unity Mobile Optimization")

In this talk they went through a lot of tips for optimizing your game for mobile, pretty important and interesting stuff.

General tips:
- The most important is taking care of thermals and battery
- Set a target frame time
- Lower-end devices struggle with Vulkan
- Mobile uses tile memory
- Memory bandwidth usage is important
- Check if your game is CPU or GPU bound

For debugging:
- Use the Unity Frame Debugger
- Use RenderDoc (for Android)

These are pointers on mistakes that are commonly made in different parts of the game.

Typical mesh mistakes:

- Using complex mesh geometry
- Not using LODs
- Not using culling layers
- Having read/write enabled

Typical texture mistakes:

- Not setting a proper max size
- Not using correct texture compression for the device
- Not using power-of-2 textures
- Having read/write enabled
- Not using atlases properly

Typical lighting mistakes:

- Unnecessary dynamic lights
- Light size too big
- Not using light layers
- Shadows not used properly
- Using high-res shadows
- Rendering the skybox even when not in view

Typical camera mistakes:

- Too many cameras
- Not optimizing post-process effects
- Using too large a clipping plane range

Typical shader mistakes:

- High texture sampling count
- Too many variants
- Keyword usage too high
- Not making shaders SRP Batcher compatible
- Unnecessary full precision (use half precision)
- Too much dynamic branching logic (use of if statements in shader code)
- Not using all channels meaningfully
- Having complicated nodes in shader graph

Other mistakes:

- No use of static batching on mobile
- Having oversampling / overdraw

Here are some general recommendations of things to do for optimization.

For graphics optimizations (URP):

- Use the SRP Batcher
- Use the GPU resident drawer

For shaders:

- Log shader compilation
- Strip variants
- Use shader prewarm and pipeline state objects
- Use dynamic shader loading

For thermals:

- Use Adaptive Performance
- Use on-demand rendering
- Aim for 65% of the frame budget

Also, the image in this section is a list of tools they recommend, so please check it out!

These tips are a bit general, and maybe a bit generic if you know what you are doing, but they also work as a good checklist. Not a bad reference if there's a part of the optimization process you haven't paid much attention to.

### Fanatee Free-to-Play Monetization

![Fanatee f2p]({{ '/assets/images/2026/gamescomlatam/f2pfanatee01.jpg' | relative_url }} "Fanatee f2p")

Fanatee is a company deeply invested in the F2P model and how to monetize those games. They gave a rundown of general tips, but also some good distinctions across the different fronts. In general they describe three pillars:

- Acquisition
- Retention
- Monetization

Then you can divide it into:

- IAPs
- Ads
- Subscriptions

And among the more important advice they gave:

- Balance for short- and long-term earnings
- IAPs are about repurchase
- Ads must be smart and treated as something that works over time, not as overload

As you can see, I'm not much of a fan of these topics, so my notes are not that many. But if you are interested, check out Fanatee's platform and games, as they go very deep into this topic.

### Unity AI

Mike Geig from Unity gave quite an impressive demo of the power of Unity AI. It works in the editor and has three ways to use it:

- Ask, to ask questions
- Create things, and iterate on them
- Plan mode, for complex tasks

You can use the Unity agents or use your own, and it's very easy to connect other AIs. However, the Unity AI has an advantage: it can see the editor and make visual decisions about look and other operations, and it clearly knows and understands the Unity language of how things work. When you connect other agents, they get access to the visual display and basically the same full access the Unity AI has, but it is up to those agents to understand it and make proper use of it. I hope we see Claude or others implement specialized Unity agents for this use case.

One very interesting case they mentioned, but did not show, is that you can transform a Figma design into UI, which sounds pretty handy for iteration and testing.

Finally, they were very clear that this AI is intended as assistance, not for final products and results, so it's good for speeding up and working through your ideas, but it won't get you to a polished final product. But you know that won't stop people from trying.

### The Multiplatform Vision of Google Play

![Google Play Multiplatform]({{ '/assets/images/2026/gamescomlatam/googleplaymultiplat01.jpg' | relative_url }} "Google Play Multiplatform")

Google intends to make Android games available on every platform, no exception. It will use emulation on devices that are not Android. If you want your game in this program, it must meet the following:

- Supports joysticks
- Supports mouse and keyboard
- Can switch to 4K assets
- Supports different aspect ratios
- Has an adaptive UI/UX

Play Asset Delivery is a Google CDN that can help with the switch to 4K assets on the fly, downloading them when running on the intended platform. It also seems Android games support keyboard and mouse connection by default, so if the game can read the input, it will work directly.

Google also recommends enabling the Play Trials option in the Play Console settings menu; this way they auto-generate a trial of the game for users to download. It works by downloading the full game, and then they limit how long users can play it through their services. It seems interesting, but downloading the full game for free makes me feel this could open up an easy way to pirate games.

## Thursday

![Thursday]({{ '/assets/images/2026/gamescomlatam/thursday.jpg' | relative_url }} "Thursday")

This was a day of meetings, networking and an overview of the show floor. This was the day the event opened to the public, and there were a lot of people around; if you wanted to play any game or check any booth, you had a line to wait in. This also meant plenty of cosplay, and I saw a lot of favorites.

I did not attend any talks, but I can tell you the event is very well done and organized; if you have the chance to come, even as just an attendee, it is completely worth it. The different booths were impressive, lines were not that long, and there was a lot to do. I loved that they had three different arcade areas with cabinets full of old games, so you could take a break playing those classics like Metal Slug or Street Fighter and more.

## Friday

![Friday]({{ '/assets/images/2026/gamescomlatam/friday.jpg' | relative_url }} "Friday")

Second day of Gamescom Latam, and the last for the B2B meeting area. I had a bunch of meetings this day, but also made some time to go to two pretty good talks. On the way, I saw some great cosplay too!

### Turning Networking into Real Partnerships

Some general advice on how to communicate and make connections at these events. Sometimes these talks come out very generic, who would think any different? but then you hear some horror stories and wonder how that even happened. So when I see something like this, I try to make some time; out of a dozen tips you hear some good stuff:

- You should clearly know what you need and what the other side wants during business meetings
- Check the culture of whom you are meeting
- Don't hype everything or memorize a pitch
- Try to make friends, not contracts
- Find a way to create a connection
- Help them build a connection with other people

Over the years I have found the "try to make friends, not contracts" approach is always the best. In the end, if you manage to build a good relationship, that opens the door to a contract down the line, and it might not be your new friend who hires you, but someone they know who they recommend you to.

### Ask a Publisher: What Deals Really Look Like

![Ask a publisher talk]({{ '/assets/images/2026/gamescomlatam/askapublisher01.jpg' | relative_url }} "Ask a publisher talk")

My good friend [Margarita Pino](https://www.linkedin.com/in/itapino/) works as a Publishing Store Coordinator at The Powell Group, and she, along with three other publishers, held a roundtable about how publishers operate and work. Some good points came out of it.

First, they mentioned that a publisher should handle QA and marketing as part of their business, since they have a better chance of doing it well than a small developer studio does. Ideally the studio should focus on what they know, which is making a video game.

When talking with a publisher, keep these red flags in mind, if they notice one of them it may be an immediate no-no for them:

- It should not feel like they are buying the company
- Don't lie about time and budget
- Budget is for stability, not for profit
- Bad organization and planning
- They fund projects, not companies
- Not understanding your genre and audience
- Too many options with no clear end product

In the end, what you want is to work with someone good to work with, and you must show diligence so they feel secure about a possible deal. They also check your socials, so be aware of that if your personal accounts get mixed with your professional ones.

On the other hand, these are some publisher red flags to be aware of as a developer:

- They want the IP ownership
- They have a bad definition of revenue
- They are not clear on how recoup is done

You have to ask about the strengths and weaknesses of the publisher, as all of them are different. And consider taxes and other cuts when projecting expected profits. Selling a game at $10 does not mean you earned that; depending on your location and local government rules, taxes may turn those $10 into $4 or $2, which is your real income for every sale, sadly.

Remember that a publisher also does some editorial work on the games; they curate, in some capacity, the direction and quality of it, so they are in a position to request changes.

Finally, something somewhat obvious that for some reason had not crossed my mind before: publishers spend more money than what they give you. If the deal is $100,000 USD, they will give you that money, but also spend a lot extra on all the internal processes involved in managing your game — having someone there for you, marketing, QA and more. So their costs are bigger than what is asked in a deal, which shows why they don't say yes to just anything, even if the deal is "cheap".

## Saturday and Sunday

![Weekend]({{ '/assets/images/2026/gamescomlatam/weekend.jpg' | relative_url }} "Weekend")

The B2B area was closed, so I went to the show floor to enjoy the event: lots of cosplay, great games and prizes. I also took the opportunity to connect and network with the local indie developers. There were so many indie games, it was great; I came back with a lot of merch and business cards.

I also had the chance to play Marvel Tokon: Fighting Souls. This fighting game is shaping up very well, the controls felt snappy and the visuals were stunning.

Both days I spent half my time at the event and the other half enjoying the city. São Paulo is an incredible place, super big! and full of different activities. I couldn't help myself and went to visit Japan Town at Liberdade. So happy to see anime and Japanese culture alive here, and a lot of love for Miku; which always makes me happy.

## Bottom Line

Overall, Gamescom Latam has been a blast, complementing GDC nicely not long ago. There is a lot of material to work with for my career and personal projects. A lot of networking, and people to keep in touch with. And also a lot of games I discovered that I want to see released so I can play them! So many great games to play, I need more time in this life to enjoy it all.

If you have read my previous entries, you know that I'm working on my own video game. This event was another wooden log on the fire of my motivation to make it. It would be amazing to come to one of these events to pitch my game, or even to have it on display on the show floor. I dream for now, but give it 1 to 2 years and I will be writing a different blog.