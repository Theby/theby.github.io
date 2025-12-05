---
layout: blog
title: Blog
permalink: /blog
---

<h1>Devlog</h1>

<ul class="post-list">
  {% for post in site.posts %}
    <li class="post-list-item">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <div class="post-list-meta">
        {% if post.categories and post.categories != empty %}
          <span class="post-list-category">
            [{{ post.categories | join: ", " }}]
          </span>
        {% endif %}
        {% if post.tags and post.tags != empty %}
          <span class="post-list-tags">
            | 
            {% for tag in post.tags %}
              {{ tag }}{% unless forloop.last %}, {% endunless %}
            {% endfor %}
          </span>
        {% endif %}
        <span class="post-list-date">
          | 
          {{ post.date | date: "%b %d, %Y" }}
        </span>
      </div>
      {% if post.excerpt %}
        <p class="post-list-excerpt">
          {{ post.excerpt | strip_html | truncate: 160 }}
        </p>
      {% endif %}
      <a class="post-list-read-more" href="{{ post.url | relative_url }}">
        Read More
      </a>
    </li>
  {% endfor %}
</ul>
