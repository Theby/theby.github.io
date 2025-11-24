document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".project-inner");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach(item => observer.observe(item));
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