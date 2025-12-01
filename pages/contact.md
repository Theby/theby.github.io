---
layout: default
title: Contact
permalink: /contact
---

<style>
  .contact-form {
    max-width: 480px;
    margin: 24px auto;
    padding: 0 12px;
  }

  .contact-intro {
    max-width: 480px;
    margin: 0 auto 12px;
    padding: 0 12px;
    font-size: 14px;
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

  .contact-form .btn {
    margin-top: 8px;
  }
</style>


<h1>Contact me</h1>

<p class="contact-intro">
  Prefer email? Write to: <a href="mailto:estebanagf@gmail.com">estebanagf@gmail.com</a>
</p>

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

  <button type="submit" class="btn">Send</button>
</form>
