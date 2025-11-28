document.addEventListener("DOMContentLoaded", () => {
  const bigCards = document.querySelectorAll('.project-inner');
  const smallCards = document.querySelectorAll('.smaller-project-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Smaller projects → staggered animation
      if (entry.target.classList.contains("smaller-project-card")) {
        const index = Array.from(smallCards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 40}ms`;
      }

      // Add the fade-in class
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  bigCards.forEach(el => observer.observe(el));
  smallCards.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".page-content h1").forEach(h1 => {
    observer.observe(h1);
  });
});