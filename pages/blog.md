---
layout: blog
title: Blog
permalink: /blog
---

<h1>Devlog</h1>

<ul class="post-list">
  {% for post in site.posts %}
    <li class="post-list-item">
      <h2 class="post-list-title">
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </h2>
      <div class="post-list-meta">
        {% if post.categories and post.categories != empty %}
          <span class="post-list-category">
            [
            {% for category in post.categories %}
              <a
                href="{{ '/blog/categories' | relative_url }}#category-{{ category | slugify }}"
                class="post-meta-link"
              >
                {{ category }}
              </a>{% unless forloop.last %}, {% endunless %}
            {% endfor %}
            ]
          </span>
        {% endif %}
        {% if post.tags and post.tags != empty %}
          <span class="post-list-tags">
            |
            {% for tag in post.tags %}
              <a
                href="{{ '/blog/tags' | relative_url }}#tag-{{ tag | slugify }}"
                class="post-meta-link"
              >
                {{ tag }}
              </a>{% unless forloop.last %}, {% endunless %}
            {% endfor %}
          </span>
        {% endif %}
        <span class="post-list-date">
          |
          <a
            href="{{ '/blog/archive' | relative_url }}#archive-{{ post.date | date: '%Y-%m' }}"
            class="post-meta-link"
          >
            {{ post.date | date: "%b %d, %Y" }}
          </a>
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
