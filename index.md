---
layout: default
title: Home
pageType: projects
---

<nav id="console-dock" class="console-dock" aria-label="Devlog and page sections" hidden>
  {% if site.posts.size > 0 %}
    <div class="console-group" data-group="devlog">
      <button class="console-cmd" type="button" aria-expanded="false" aria-controls="console-out-devlog">
        <span class="console-cmd-prefix">$</span>
        <span class="console-cmd-text">cat devlog</span>
        <span class="blink" aria-hidden="true">█</span>
      </button>
      <ul class="console-out list-reset" id="console-out-devlog">
        {% for post in site.posts limit:3 %}
          <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
        {% endfor %}
      </ul>
    </div>
  {% endif %}

  <div class="console-group" data-group="sections">
    <button class="console-cmd" type="button" aria-expanded="false" aria-controls="console-out-sections">
      <span class="console-cmd-prefix">$</span>
      <span class="console-cmd-text">ls sections</span>
      <span class="blink" aria-hidden="true">█</span>
    </button>
    <ul class="console-out list-reset" id="console-out-sections"></ul>
  </div>
</nav>

# Published Games

{% for item in site.data.projects.games %}
  {% if item.hidden %}
    {% continue %}
  {% endif %}
  {% assign indexMod = forloop.index0 | modulo: 2 %}
  <div class="project-row {% if indexMod == 1 %}reverse{% endif %}">
    <div class="project-inner">
      <h2 class="project-title">{{ item.title }}</h2>
      <div class="project-body">
        <a class="project-image-link" href="{{ item.url }}" target="_blank">
          <img src="{{ item.image }}" alt="{{ item.title }}" loading="lazy">
        </a>
        <div class="project-text">
          {% if item.release %}
            <span class="project-release"><span class="project-release-label">Release date:</span> {{ item.release }}</span>
          {% endif %}
          {% if item.studio or item.engines or item.languages %}
            <div class="project-meta">
              {% if item.studio %}
                {% assign studio = site.data.studios[item.studio] %}
                {% assign studio_name = studio.name | default: item.studio %}
                {% if studio.url and studio.url != "" %}
                  <a class="project-tag project-tag--studio" href="{{ studio.url }}" target="_blank" rel="noopener noreferrer">{{ studio_name }}</a>
                {% else %}
                  <span class="project-tag project-tag--studio">{{ studio_name }}</span>
                {% endif %}
              {% endif %}
              {% for eng in item.engines %}
                {% assign eng_name = site.data.engines[eng].name | default: eng %}
                <span class="tech-badge" title="{{ eng_name }}">
                  <img src="assets/icons/platforms/{{ eng }}.svg" alt="{{ eng_name }}" loading="lazy">
                </span>
              {% endfor %}
              {% for lang in item.languages %}
                {% assign lang_name = site.data.languages[lang].name | default: lang %}
                <span class="tech-badge" title="{{ lang_name }}">
                  <img src="assets/icons/platforms/{{ lang }}.svg" alt="{{ lang_name }}" loading="lazy">
                </span>
              {% endfor %}
            </div>
          {% endif %}
          {% if item.tags %}
            <div class="project-tags">
              {% for tag in item.tags %}
                <span class="project-tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
          {% if item.project_description %}
            <p class="project-game-description">{{ item.project_description }}</p>
          {% endif %}
          {% if item.description %}
            <p class="project-description">{{ item.description }}</p>
          {% endif %}
          <div class="project-badges">
            {% if item.platforms %}
              <div class="platform-badges">
                {% for plat in item.platforms %}
                  <a class="platform-badge" href="{{ plat.url }}" target="_blank" rel="noopener noreferrer">
                    <img src="assets/icons/platforms/{{ plat.id }}.svg" alt="">
                    {{ site.data.platforms[plat.id].name }}
                  </a>
                {% endfor %}
              </div>
            {% endif %}
          </div>
        </div>
      </div>
    </div>
  </div>
{% endfor %}

# Communities

{% for item in site.data.projects.communities %}
  {% if item.hidden %}
    {% continue %}
  {% endif %}
  {% assign indexMod = forloop.index0 | modulo: 2 %}
  <div class="project-row {% if indexMod == 1 %}reverse{% endif %}">
    <div class="project-inner">
      <h2 class="project-title">{{ item.title }}</h2>
      <div class="project-body">
        <a class="project-image-link" href="{{ item.url }}" target="_blank">
          <img src="{{ item.image }}" alt="{{ item.title }}" loading="lazy">
        </a>
        <div class="project-text">
          {% if item.release %}
            <span class="project-release">{{ item.release }}</span>
          {% endif %}
          {% if item.tags %}
            <div class="project-tags">
              {% for tag in item.tags %}
                <span class="project-tag">{{ tag }}</span>
              {% endfor %}
            </div>
          {% endif %}
          {% if item.project_description %}
            <p class="project-game-description">{{ item.project_description }}</p>
          {% endif %}
          {% if item.description %}
            <p class="project-description">{{ item.description }}</p>
          {% endif %}
          <div class="project-badges">
            {% if item.platforms %}
              <div class="platform-badges">
                {% for plat in item.platforms %}
                  <a class="platform-badge" href="{{ plat.url }}" target="_blank" rel="noopener noreferrer">
                    <img src="assets/icons/platforms/{{ plat.id }}.svg" alt="">
                    {{ site.data.platforms[plat.id].name }}
                  </a>
                {% endfor %}
              </div>
            {% endif %}
          </div>
        </div>
      </div>
    </div>
  </div>
{% endfor %}

# Additional Projects

<div class="smaller-projects-grid">
  {% for item in site.data.projects.additional %}
    {% if item.hidden %}
      {% continue %}
    {% endif %}
    <div class="smaller-project-card">
      <h2 class="project-title">{{ item.title }}</h2>
      <a class="smaller-project-image-link" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">
        <img src="{{ item.image }}" alt="{{ item.title }}" loading="lazy">
      </a>
      {% if item.release %}
        <span class="project-release"><span class="project-release-label">Release date:</span> {{ item.release }}</span>
      {% endif %}
      {% if item.studio or item.engines or item.languages %}
        <div class="project-meta">
          {% if item.studio %}
            {% assign studio = site.data.studios[item.studio] %}
            {% assign studio_name = studio.name | default: item.studio %}
            {% if studio.url and studio.url != "" %}
              <a class="project-tag project-tag--studio" href="{{ studio.url }}" target="_blank" rel="noopener noreferrer">{{ studio_name }}</a>
            {% else %}
              <span class="project-tag project-tag--studio">{{ studio_name }}</span>
            {% endif %}
          {% endif %}
          {% for eng in item.engines %}
            {% assign eng_name = site.data.engines[eng].name | default: eng %}
            <span class="tech-badge" title="{{ eng_name }}">
              <img src="assets/icons/platforms/{{ eng }}.svg" alt="{{ eng_name }}" loading="lazy">
            </span>
          {% endfor %}
          {% for lang in item.languages %}
            {% assign lang_name = site.data.languages[lang].name | default: lang %}
            <span class="tech-badge" title="{{ lang_name }}">
              <img src="assets/icons/platforms/{{ lang }}.svg" alt="{{ lang_name }}" loading="lazy">
            </span>
          {% endfor %}
        </div>
      {% endif %}
      {% if item.tags %}
        <div class="project-tags">
          {% for tag in item.tags %}
            <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        </div>
      {% endif %}
      {% if item.project_description %}
        <p class="project-game-description">{{ item.project_description }}</p>
      {% endif %}
      {% if item.description %}
        <p class="project-description">{{ item.description }}</p>
      {% endif %}
      {% if item.platforms %}
      <div class="project-badges">
        <div class="platform-badges">
          {% for plat in item.platforms %}
            <a class="platform-badge" href="{{ plat.url }}" target="_blank" rel="noopener noreferrer">
              <img src="assets/icons/platforms/{{ plat.id }}.svg" alt="">
              {{ site.data.platforms[plat.id].name }}
            </a>
          {% endfor %}
        </div>
      </div>
      {% endif %}
    </div>
  {% endfor %}
</div>

# Public Speaking & Interviews

<div class="texts-list">
  {% for item in site.data.projects.talks %}
    {% if item.hidden %}
      {% continue %}
    {% endif %}
    <div class="text-entry">
      <div class="text-header">
        <a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
        {% if item.release %}
          <span class="text-release">{{ item.release }}</span>
        {% endif %}
      </div>
      {% if item.event %}
        <p class="text-event">{{ item.event }}</p>
      {% endif %}
      {% if item.description %}
        <p class="text-description">{{ item.description }}</p>
      {% endif %}
      {% if item.authors %}
        <p class="text-authors">
          <strong>By:</strong> {{ item.authors }}
        </p>
      {% endif %}
    </div>
  {% endfor %}
</div>

# Publications

<div class="texts-list">
  {% for item in site.data.projects.publications %}
    {% if item.hidden %}
      {% continue %}
    {% endif %}
    <div class="text-entry">
      <div class="text-header">
        <a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
        {% if item.release %}
          <span class="text-release">{{ item.release }}</span>
        {% endif %}
      </div>
      {% if item.description %}
        <p class="text-description">{{ item.description }}</p>
      {% endif %}
      {% if item.authors %}
        <p class="text-authors">
          <strong>Authors:</strong> {{ item.authors }}
        </p>
      {% endif %}
    </div>
  {% endfor %}
</div>

# What’s Next?

<div class="closing-section">
  <p>
    Thank you for reading all the way to the end. If you’re interested in my work and would like to hire me, explore a collaboration, discuss consulting, or just nerd out about Unity and game dev, feel free to reach out.
  </p>

  <div class="closing-links">
    <a href="/resume">Resume</a>
    {% assign linkedin = site.socials | where: "name", "linkedin" | first %}
    <a href="{{ linkedin.url }}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href="/contact">Contact me</a>
  </div>
</div>
