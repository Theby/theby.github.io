document.addEventListener("DOMContentLoaded", () => {
  const HEADING_VISIBLE_RATIO = 0.1;
  const SCROLL_TOP_REVEAL_PX = 300;

  // ==========================
  // Heading intersection effect
  // ==========================
  const hasProjectCards = !!document.querySelector('.project-inner, .smaller-project-card');
  if (!hasProjectCards) {
    try {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
              }
            });
          },
          { threshold: HEADING_VISIBLE_RATIO }
        );

        const headings = document.querySelectorAll(".page-content h1");
        if (headings && headings.length > 0) {
          headings.forEach((h1) => observer.observe(h1));
        }
      } else {
        console.warn("IntersectionObserver not supported; skipping heading animations.");
      }
    } catch (err) {
      console.warn("Error setting up heading IntersectionObserver:", err);
    }
  }

  // ==========================
  // Scroll-to-top button
  // ==========================
  try {
    const btn = document.getElementById("scrollTopBtn");
    if (btn) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > SCROLL_TOP_REVEAL_PX) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
      });

      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  } catch (err) {
    console.warn("Error setting up scroll-to-top button:", err);
  }
});
