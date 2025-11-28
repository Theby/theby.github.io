---
layout: default
title: Home
pageType: projects
---

# Published Games

{% for p in site.data.projects %}
{% assign indexMod = forloop.index0 | modulo: 2 %}
<div class="project-row {% if indexMod == 1 %}reverse{% endif %}">
  <div class="project-inner">
    <a class="project-image-link" href="{{ p.url }}" target="_blank">
      <img src="{{ p.image }}" alt="{{ p.title }}">
    </a>
    <div class="project-text">
      <div class="project-title-row">
        <h2>{{ p.title }}</h2>
        {% if p.release %}
          <span class="project-release">{{ p.release }}</span>
        {% endif %}
      </div>
      <div class="project-tags">
        {% if p.tags %}
          {% for tag in p.tags %}
            <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        {% endif %}
      </div>
      {% if p.project_description %}
        <p class="project-game-description">{{ p.project_description }}</p>
      {% endif %}
      {% if p.description %}
        <p class="project-description">{{ p.description }}</p>
      {% endif %}
      <div class="project-badges">
        {% if p.platforms %}
          <div class="platform-badges">
            {% for plat in p.platforms %}
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

{% for c in site.data.projects-communities %}
{% assign indexMod = forloop.index0 | modulo: 2 %}
<div class="project-row {% if indexMod == 1 %}reverse{% endif %}">
  <div class="project-inner">
    <a class="project-image-link" href="{{ c.url }}" target="_blank">
      <img src="{{ c.image }}" alt="{{ c.title }}">
    </a>
    <div class="project-text">
      <div class="project-title-row">
        <h2>{{ c.title }}</h2>
        {% if c.release %}
          <span class="project-release">{{ c.release }}</span>
        {% endif %}
      </div>
      <div class="project-tags">
        {% if c.tags %}
          {% for tag in c.tags %}
            <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        {% endif %}
      </div>
      {% if c.project_description %}
        <p class="project-game-description">{{ c.project_description }}</p>
      {% endif %}
      {% if c.description %}
        <p class="project-description">{{ c.description }}</p>
      {% endif %}
      <div class="project-badges">
        {% if c.platforms %}
          <div class="platform-badges">
            {% for plat in c.platforms %}
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
  {% for sp in site.data.projects-smaller-projects %}
  {% if sp.hidden %}
    {% continue %}
  {% endif %}
    <div class="smaller-project-card">
        <a class="smaller-project-image-link" href="{{ sp.url }}" target="_blank" rel="noopener noreferrer">
          <img src="{{ sp.image }}" alt="{{ sp.title }}">
        </a>
      <h2>{{ sp.title }}</h2>
      {% if sp.release %}
        <span class="project-release">{{ sp.release }}</span>
      {% endif %}
      <div class="project-tags">
        {% if sp.tags %}
          {% for tag in sp.tags %}
            <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        {% endif %}
      </div>
      {% if sp.project_description %}
        <p class="project-game-description">{{ sp.project_description }}</p>
      {% endif %}
      {% if sp.description %}
        <p class="project-description">{{ sp.description }}</p>
      {% endif %}
      <div class="project-badges">
      {% if sp.platforms %}
        <div class="platform-badges">
          {% for plat in sp.platforms %}
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
