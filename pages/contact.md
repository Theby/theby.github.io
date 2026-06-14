---
layout: default
title: Contact
permalink: /contact
---

<style>
  .contact-layout {
    display: flex;
    gap: 32px;
    align-items: flex-start;
    margin-top: 24px;
  }

  .contact-form {
    flex: 2;
    max-width: 480px;
  }

  .contact-form label {
    display: block;
    margin-bottom: 14px;
    font-size: 14px;
  }

  .contact-form input[type="text"],
  .contact-form input[type="email"],
  .contact-form textarea {
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-top: 4px;
    padding: 8px 10px;
    border-radius: 4px;
    border: 1px solid var(--green);
    background: rgba(0, 0, 0, 0.6);
    color: var(--text-light);
    font-family: inherit;
    font-size: 14px;
  }

  .contact-form input[type="text"]:focus,
  .contact-form input[type="email"]:focus,
  .contact-form textarea:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--green);
  }

  .contact-form .terminal-btn {
    margin-top: 8px;
  }

  .contact-meta {
    flex: 1;
    font-size: 14px;
    opacity: 0.9;
  }

  .contact-meta h2 {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .contact-meta p {
    margin-bottom: 12px;
  }

  .contact-meta ul {
    margin: 0;
    padding-left: 0; /* remove default indent */
  }

  .contact-links {
    list-style: none;        /* remove bullets */
    list-style-image: none;  /* override theme bullet.png */
    padding-left: 0;
  }

  .contact-links li {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  .contact-links-icon {
    width: 18px;
    height: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .contact-links-icon img {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 800px) {
    .contact-layout {
      flex-direction: column;
    }

    .contact-form,
    .contact-meta {
      max-width: 100%;
    }
  }
</style>

<h1>Contact me</h1>

<div class="contact-layout">
  <form
    action="https://formspree.io/f/mkgdbnba"
    method="POST"
    class="contact-form"
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

  <aside class="contact-meta">
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
