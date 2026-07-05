---
layout: default
title: About
permalink: /about
pageCss: about
---

<section>
  <h1>About Me</h1>

  <div class="about-layout">
    <div class="about-text">
      <p>
        I’m Esteban Gaete Flores, a senior Unity game developer with 10+ years of experience
        building games and tools for console, PC, and mobile. I specialize in
        gameplay programming, performance optimization, and editor tooling that
        help teams ship smoother, more responsive experiences.
      </p>
      <p>
        I’ve contributed to commercial projects like <a href="https://apps.apple.com/us/app/garden-joy-exterior-designer/id1618284064">Garden Joy</a>,
        <a href="https://store.steampowered.com/app/1736620/The_Eightfold_Path/">The Eightfold Path</a>, <a href="https://store.steampowered.com/app/1111590/Linked_Mask/">Linked Mask</a>, <a href="https://store.steampowered.com/app/1721170/What_Lies_in_the_Multiverse/">What Lies in the
        Multiverse</a>, and <a href="https://www.youtube.com/shorts/xTE-vbB2ylE">NBA Clash</a>, often joining teams in the messy
        middle to improve performance, streamline pipelines, and keep features
        moving. I enjoy translating design goals into robust systems, connecting
        backend data to UI, and building tools that reduce repetitive work for the
        rest of the team.
      </p>
      <p>
        Outside of studio work, I co-organize GameDev Planet, the largest Chilean
        game dev community, where we’ve hosted dozens of events, talks, and
        showcases to help local developers connect and grow. I’m especially
        passionate about platformers, metroidvanias, and gameplay-driven projects,
        and I’m happiest when I’m iterating on feel, helping teammates be more
        effective, and supporting strong, collaborative teams.
      </p>
      <p>
        If you’re interested in my work and would like to hire me, explore a collaboration,
        discuss consulting, or just nerd out about Unity and game dev, feel free to reach out.
      </p>
      <div class="closing-links">
        <a href="/resume">Resume</a>
        {% assign linkedin = site.socials | where: "name", "linkedin" | first %}
        <a href="{{ linkedin.url }}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="/contact">Contact me</a>
      </div>
    </div>
    <div class="about-photo">
      <img
        src="/assets/images/default-preview-image.png"
        alt="Portrait of Esteban Gaete Flores"
        loading="lazy"
      >
    </div>
  </div>
</section>
