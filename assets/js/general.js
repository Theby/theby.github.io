document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // Heading intersection effect
  // ==========================
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
        { threshold: 0.1 }
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

  // ==========================
  // Scroll-to-top button
  // ==========================
  try {
    const btn = document.getElementById("scrollTopBtn");
    if (!btn) {
      return;
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  } catch (err) {
    console.warn("Error setting up scroll-to-top button:", err);
  }
});
