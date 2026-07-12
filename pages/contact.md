---
layout: default
title: Contact
permalink: /contact
pageCss: contact
---

<h1>Contact me</h1>

<div class="contact-layout page-columns">
  <form
    action="https://formspree.io/f/mkgdbnba"
    method="POST"
    class="contact-form page-columns-main"
  >
    <label>
      Title
      <input type="text" name="title" required>
    </label>
    <label>
      Your email
      <input type="email" name="_replyto" required>
    </label>
    <label>
      Message
      <textarea name="message" rows="5" required></textarea>
    </label>
    <div style="display:none;">
      <label>
        Your favorite videogame is
        <input type="text" name="_gotcha">
      </label>
    </div>
    <input type="hidden" name="_subject" value="New message from portfolio site">
    <button type="submit" class="terminal-btn">
      <span class="terminal-btn-prefix">$</span>
      <span class="terminal-btn-command">send message</span>
      <span class="blink">█</span>
    </button>
  </form>

  <aside class="contact-meta page-columns-aside">
    <h2>Prefer email?</h2>
    <p>
      You can also contact me directly at
      <a href="mailto:estebanagf@gmail.com">estebanagf@gmail.com</a>.
    </p>
    <h2>Or maybe just a quick chat?</h2>
    <p>You can find me on:</p>
    <ul class="contact-links">
      {% for platform in site.chat_platforms %}
        <li>
          <span class="contact-links-icon">
            <img src="/assets/icons/platforms/{{ platform.name }}.svg" alt="{{ platform.name }}">
          </span>
          {% if platform.url %}
            <a href="{{ platform.url }}" target="_blank" rel="noopener">
              {{ platform.handler }}
            </a>
          {% else %}
            <span>{{ platform.handler }}</span>
          {% endif %}
        </li>
      {% endfor %}
    </ul>
  </aside>
</div>
