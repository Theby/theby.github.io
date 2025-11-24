---
layout: default
title: Home
---

# Published Games

{% for p in site.data.projects %}
<div class="project-row {% if p.reverse %}reverse{% endif %}">
  <div class="project-inner">
    <a class="project-image-link" href="{{ p.url }}" target="_blank">
      <img src="{{ p.image }}" alt="{{ p.title }}">
    </a>
    <div class="project-text">
      <div class="project-title-row">
        <h2>{{ p.title }}</h2>
        {% if p.release %}
          <span class="project-title-release">{{ p.release }}</span>
        {% endif %}
      </div>
      <div class="project-meta">
        {% if p.tags %}
          {% for tag in p.tags %}
            <span class="project-tag">{{ tag }}</span>
          {% endfor %}
        {% endif %}
      </div>
      <p>{{ p.description }}</p>
      <div class="project-meta">
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