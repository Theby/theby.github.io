---
layout: default
title: Home
pageType: projects
---

# New Blog Entries

<div class="texts-list">
  {% for post in site.posts limit:3 %}
    <div class="text-entry">
      <div class="text-header">
        <a href="{{ post.url }}">{{ post.title }}</a>
        <span class="text-release">{{ post.date | date: "%b %Y" }}</span>
      </div>
    </div>
  {% endfor %}
</div>

# Published Games

{% for item in site.data.projects %}
{% assign indexMod = forloop.index0 | modulo: 2 %}
<div class="project-row {% if indexMod == 1 %}reverse{% endif %}">
  <div class="project-inner">
    <a class="project-image-link" href="{{ item.url }}" target="_blank">
      <img src="{{ item.image }}" alt="{{ item.title }}">
    </a>
    <div class="project-text">
      <div class="project-title-row">
        <h2>{{ item.title }}</h2>
        {% if item.release %}
          <span class="project-release">{{ item.release }}</span>
        {% endif %}
      </div>
      <div class="project-tags">
        {% if item.tags %}
          {% for tag in item.tags %}
            <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        {% endif %}
      </div>
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
                <img src="assets/icons/platforms/{{ plat.id }}.svg" alt="{{ plat.id }} icon">
                {{ site.data.platforms[plat.id].name }}
              </a>
            {% endfor %}
          </div>
        {% endif %}
      </div>
    </div>
  </div>
</div>
{% endfor %}

# Communities

{% for item in site.data.projects-communities %}
{% assign indexMod = forloop.index0 | modulo: 2 %}
<div class="project-row {% if indexMod == 1 %}reverse{% endif %}">
  <div class="project-inner">
    <a class="project-image-link" href="{{ item.url }}" target="_blank">
      <img src="{{ item.image }}" alt="{{ item.title }}">
    </a>
    <div class="project-text">
      <div class="project-title-row">
        <h2>{{ item.title }}</h2>
        {% if item.release %}
          <span class="project-release">{{ item.release }}</span>
        {% endif %}
      </div>
      <div class="project-tags">
        {% if item.tags %}
          {% for tag in item.tags %}
            <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        {% endif %}
      </div>
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
                <img src="assets/icons/platforms/{{ plat.id }}.svg" alt="{{ plat.id }} icon">
                {{ site.data.platforms[plat.id].name }}
              </a>
            {% endfor %}
          </div>
        {% endif %}
      </div>
    </div>
  </div>
</div>
{% endfor %}

# Smaller Projects

<div class="smaller-projects-grid">
  {% for item in site.data.projects-smaller-projects %}
    {% if item.hidden %}
      {% continue %}
    {% endif %}
    <div class="smaller-project-card">
        <a class="smaller-project-image-link" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">
          <img src="{{ item.image }}" alt="{{ item.title }}">
        </a>
      <h2>{{ item.title }}</h2>
      {% if item.release %}
        <span class="project-release">{{ item.release }}</span>
      {% endif %}
      <div class="project-tags">
        {% if item.tags %}
          {% for tag in item.tags %}
            <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        {% endif %}
      </div>
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
              <img src="assets/icons/platforms/{{ plat.id }}.svg" alt="{{ plat.id }} icon">
              {{ site.data.platforms[plat.id].name }}
            </a>
          {% endfor %}
        </div>
    </div>
    </div>
  {% endif %}
  {% endfor %}
</div>

# Public Speaking & Interviews

<div class="texts-list">
  {% for item in site.data.projects-talks %}
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
          <strong>By:</strong> {{ item.authors }}
        </p>
      {% endif %}
    </div>
  {% endfor %}
</div>

# Publications

<div class="texts-list">
  {% for item in site.data.projects-papers %}
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
