(() => {
  const COPY_FEEDBACK_MS = 1200;
  const OFFSCREEN_OFFSET = "-9999px";
  const COPY_LABEL = "Copy";

  function normalizeTrailingNewline(text) {
    if (text.endsWith("\n")) return text.slice(0, -1);
    return text;
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // Fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = OFFSCREEN_OFFSET;
    ta.style.left = OFFSCREEN_OFFSET;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    if (!ok) throw new Error("Copy failed");
  }

  function attachCopyButton(host, className, getText, failMessage) {
    const style = window.getComputedStyle(host);
    if (style.position === "static") host.style.position = "relative";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = className;
    btn.textContent = COPY_LABEL;

    btn.addEventListener("click", async () => {
      btn.disabled = true;

      try {
        await copyText(getText());
        btn.textContent = "Copied!";
      } catch (err) {
        console.warn(failMessage, err);
        btn.textContent = "Failed";
      }

      setTimeout(() => {
        btn.textContent = COPY_LABEL;
        btn.disabled = false;
      }, COPY_FEEDBACK_MS);
    });

    host.appendChild(btn);
  }

  // -----------------------------
  // Rouge / fenced blocks
  // -----------------------------
  function addRougeCopyButtons(root = document) {
    const blocks = root.querySelectorAll(".highlighter-rouge");

    blocks.forEach((block) => {
      if (block.dataset.copyButton === "true") return;

      const codeEl = block.querySelector("pre.highlight > code, pre > code");
      if (!codeEl) return;

      block.dataset.copyButton = "true";

      attachCopyButton(
        block,
        "code-copy-btn",
        () => normalizeTrailingNewline(codeEl.textContent || ""),
        "Copy failed:"
      );
    });
  }

  // -----------------------------
  // Gist blocks
  // -----------------------------
  function getGistText(gistFileEl) {
    // Gist renders each line in a .blob-code-inner span (best source of truth)
    const lines = gistFileEl.querySelectorAll(".blob-code-inner");
    if (lines && lines.length) {
      const text = Array.from(lines, (n) => n.textContent || "").join("\n");
      return normalizeTrailingNewline(text);
    }

    // Fallback
    const codeEl = gistFileEl.querySelector("pre > code, code");
    if (codeEl) return normalizeTrailingNewline(codeEl.textContent || "");

    return null;
  }

  function addGistCopyButtons(root = document) {
    const gistFiles = root.querySelectorAll(".gist .gist-file");

    gistFiles.forEach((gistFile) => {
      if (gistFile.dataset.copyButton === "true") return;

      if (!getGistText(gistFile)) return;

      gistFile.dataset.copyButton = "true";

      attachCopyButton(
        gistFile,
        "gist-copy-btn",
        () => {
          // Re-read at click time in case something changed (tabs, etc.)
          const liveText = getGistText(gistFile);
          if (!liveText) throw new Error("No gist text found");
          return liveText;
        },
        "Gist copy failed:"
      );
    });
  }

  function runAll(root = document) {
    addRougeCopyButtons(root);
    addGistCopyButtons(root);
  }

  function observeLateContent() {
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          // Run on the subtree that got added (cheap enough)
          runAll(node);
        }
      }
    });

    obs.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      runAll(document);
      observeLateContent();
    });
  } else {
    runAll(document);
    observeLateContent();
  }
})();
