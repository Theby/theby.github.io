(() => {
  function getTextFromCodeBlock(root) {
    const codeEl = root.querySelector("pre.highlight > code, pre > code");
    if (!codeEl) return null;

    let text = codeEl.textContent || "";
    if (text.endsWith("\n")) text = text.slice(0, -1);
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
    ta.style.top = "-9999px";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    if (!ok) throw new Error("Copy failed");
  }

  function addButtons() {
    const blocks = document.querySelectorAll(".highlighter-rouge");

    blocks.forEach((block) => {
      if (block.dataset.copyButton === "true") return;

      const text = getTextFromCodeBlock(block);
      if (!text) return;

      block.dataset.copyButton = "true";

      const style = window.getComputedStyle(block);
      if (style.position === "static") block.style.position = "relative";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy-btn";
      btn.textContent = "Copy";

      btn.addEventListener("click", async () => {
        btn.disabled = true;
        const old = btn.textContent;

        try {
          await copyText(text);
          btn.textContent = "Copied!";
        } catch (e) {
          btn.textContent = "Failed";
        }

        setTimeout(() => {
          btn.textContent = old;
          btn.disabled = false;
        }, 1200);
      });

      block.appendChild(btn);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addButtons);
  } else {
    addButtons();
  }
})();