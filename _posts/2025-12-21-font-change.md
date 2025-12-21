---
title: "Temporal post to test fonts for better reading"
tags: [ test ]
category: blog
---

<style>
.post-content {
    font-family: system-ui, "IBM Plex Sans", "Segoe UI", Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace;
}

code, pre, kbd, samp {
    font-family: "IBM Plex Mono", "Fira Code", Consolas, "Lucida Console", monospace;
}

.gist {
  filter: invert(100%) hue-rotate(180deg) brightness(110%);
}

.gist .blob-code, 
.gist .blob-num {
  font-family: "IBM Plex Mono", "Fira Code", Consolas, "Lucida Console", monospace !important;
}

.gist .gist-meta {
  font-family: system-ui, "IBM Plex Sans", "Segoe UI", Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace !important;
}

/* Copy button for fenced code blocks */
pre {
  position: relative; /* harmless even if already set */
}

.code-copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;

  font-size: 12px;
  line-height: 1;
  padding: 6px 10px;

  border: 1px solid var(--green);
  border-radius: 4px;

  background: rgba(0, 0, 0, 0.35);
  color: var(--text-light);

  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.code-copy-btn:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.code-copy-btn:disabled {
  cursor: default;
  opacity: 0.6;
  transform: none;
}

.code-copy-btn { opacity: 0; pointer-events: none; }
pre:hover .code-copy-btn { opacity: 1; pointer-events: auto; }

</style>

## Title

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at mattis dui. Sed sed metus nec nisl cursus vulputate. In tristique ex a nisi facilisis, id tristique lacus luctus. Suspendisse sodales elementum sodales. *Cras varius facilisis congue*. Cras ullamcorper iaculis fermentum. Suspendisse nec ligula arcu. Praesent commodo **tellus non eleifend** ultricies. Aliquam id neque suscipit, eleifend ipsum quis, ullamcorper massa. Nunc ac diam enim. Mauris mollis maximus massa a vulputate. ***Maecenas elementum luctus neque***, sit amet tempus erat. Sed nec arcu non sapien aliquet sollicitudin. Sed id porta eros, at viverra augue. Nunc id placerat lacus.

{% highlight csharp linenos %}
public static async Task WaitingExampleAsync(string animationName)
{
    await PlayAnimationAsync(animationName);
}

public static Task<bool> PlayAnimationAsync(string name)
{
    var taskCompletion = new TaskCompletionSource<bool>();
    
    PlayAnimation(name, onComplete: () =>
    {
        taskCompletion.SetResult(true);
    });
    
    return taskCompletion.Task;
}
{% endhighlight %}

Nulla elementum imperdiet felis ac commodo. Suspendisse porta orci in elementum porta. Cras vehicula eleifend mi. Sed et consectetur ipsum. Donec eu mauris vel tortor pulvinar rutrum a id nisi. Duis nulla odio, cursus vel viverra ut, dignissim fringilla arcu. Phasellus dignissim augue eu augue molestie venenatis. Donec at libero nisi. Vivamus id urna a mi aliquam egestas vitae cursus diam. Morbi venenatis volutpat lorem eget ornare. Morbi blandit, risus at vehicula posuere, nulla tellus dignissim augue, quis ornare enim tellus eget leo. Sed eu suscipit massa. Nunc commodo eu felis nec ultrices. Ut id neque vel leo dictum lobortis. Suspendisse ut elementum justo. Nam mollis sem at massa volutpat, ornare posuere nibh iaculis.

- Proin at orci id libero egestas suscipit non at metus.
- Nulla semper quam id libero fringilla convallis.
- Integer convallis lacus at magna placerat, varius efficitur libero cursus.
- Praesent auctor sapien non magna bibendum venenatis.
- Maecenas a odio ornare, dignissim dolor sit amet, sollicitudin lacus.

```c#
public delegate void MediaPickCallback(string path);

public static void GetImageFromGallery(MediaPickCallback callback, /* some optional config params */) { ... }
```

### Smaller Title

Aenean volutpat urna dolor, eget vulputate sem interdum at. `GetImageFromGallery()` Vivamus malesuada ultricies metus non tincidunt. Maecenas elit lectus, sollicitudin sed consectetur quis, consectetur vel lectus. Etiam ut nunc metus. Maecenas aliquet sapien a consequat viverra. Ut posuere egestas diam, vitae laoreet leo tempus et. Pellentesque vel neque ut ante posuere `GetImageFromGallery()` fringilla id a magna. Nunc blandit scelerisque viverra.
- test 1
- test 2

In hac habitasse platea dictumst. Nulla facilisi. Donec hendrerit euismod ante. Nulla ut vehicula dui. In hac habitasse platea dictumst. Morbi ut sollicitudin libero, eu venenatis massa. Proin diam justo, suscipit nec tempus eu, `GetImageFromGallery()` posuere eu leo. Suspendisse tortor tellus, posuere a blandit ut, convallis vitae diam. Etiam tempus dictum neque consectetur mollis. Vivamus in eros sodales, porta arcu ac, iaculis lectus. Praesent a posuere est.

Maecenas aliquam tempor eleifend. Donec at imperdiet tortor. `GetImageFromGallery()`, `GetImageFromGallery()`, `GetImageFromGallery()` Nulla facilisi. Vestibulum magna tellus, vulputate a odio ac, hendrerit volutpat diam. Suspendisse non metus a neque ultricies hendrerit non eget justo. Curabitur ut sapien arcu. Phasellus scelerisque augue sit amet ante molestie suscipit. Praesent vulputate mauris nec mi fringilla commodo. Aenean eu metus eleifend, efficitur justo sit amet, porta elit. Suspendisse faucibus a libero ac.

Asto sit amet, porta elit. Suspendisse foo:
{% gist 1fb77671f2e6e6d0d0b586b080404206 %}

Ullamcorper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla ac euismod elit.

<script>
    // assets/js/code-copy.js
    (() => {
      function getCodeText(codeEl) {
        // textContent is safest for code (no layout-dependent whitespace changes).
        let text = codeEl.textContent || "";

        // Trim a single trailing newline (common in rendered markdown).
        if (text.endsWith("\n")) text = text.slice(0, -1);

        return text;
      }

      async function copyToClipboard(text) {
        // Modern API
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return;
        }

        // Fallback
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();

        const ok = document.execCommand("copy");
        document.body.removeChild(ta);

        if (!ok) throw new Error("Copy command failed");
      }

      function addCopyButtons() {
        // Only code blocks that are actually <pre><code>...</code></pre>
        const codeBlocks = document.querySelectorAll("pre > code");

        codeBlocks.forEach((codeEl) => {
          const pre = codeEl.parentElement;
          if (!pre) return;

          // Avoid double-injecting
          if (pre.dataset.copyButton === "true") return;
          pre.dataset.copyButton = "true";

          // Make sure we can position the button
          const preStyle = window.getComputedStyle(pre);
          if (preStyle.position === "static") {
            pre.style.position = "relative";
          }

          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "code-copy-btn";
          btn.textContent = "Copy";

          btn.addEventListener("click", async () => {
            const text = getCodeText(codeEl);

            btn.disabled = true;
            const prev = btn.textContent;

            try {
              await copyToClipboard(text);
              btn.textContent = "Copied!";
            } catch (e) {
              btn.textContent = "Failed";
              // Optional: console.debug(e);
            }

            window.setTimeout(() => {
              btn.textContent = prev;
              btn.disabled = false;
            }, 1200);
          });

          pre.appendChild(btn);
        });
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", addCopyButtons);
      } else {
        addCopyButtons();
      }
    })();
</script>