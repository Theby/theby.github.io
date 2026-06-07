document.addEventListener("DOMContentLoaded", () => {
  const bigCards = document.querySelectorAll('.project-inner');
  const smallCards = document.querySelectorAll('.smaller-project-card');

  const h1TriggerMap = new Map();
  const pairedH1s = new Set();

  const pageContent = document.querySelector('#main_content');
  if (pageContent) {
    let currentH1 = null;
    let sectionHasCards = false;

    Array.from(pageContent.children).forEach(el => {
      if (el.tagName === 'H1') {
        currentH1 = el;
        sectionHasCards = false;
      } else if (currentH1 && !sectionHasCards) {
        const firstBig = el.querySelector('.project-inner');
        const firstSmall = el.querySelectorAll('.smaller-project-card');

        if (firstBig) {
          h1TriggerMap.set(firstBig, currentH1);
          pairedH1s.add(currentH1);
          sectionHasCards = true;
        } else if (firstSmall.length > 0) {
          Array.from(firstSmall).slice(0, 3).forEach(card => {
            h1TriggerMap.set(card, currentH1);
          });
          pairedH1s.add(currentH1);
          sectionHasCards = true;
        }
      }
    });
  }

  const triggeredH1s = new Set();
  const h1Observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      triggeredH1s.add(entry.target);
      h1Observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.page-content h1').forEach(h1 => {
    if (!pairedH1s.has(h1)) {
      h1Observer.observe(h1);
    }
  });

  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const associatedH1 = h1TriggerMap.get(entry.target);
      if (associatedH1 && !triggeredH1s.has(associatedH1)) {
        associatedH1.classList.add("in-view");
        triggeredH1s.add(associatedH1);
      }

      if (entry.target.classList.contains("smaller-project-card")) {
        const index = Array.from(smallCards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 40}ms`;
      }

      entry.target.classList.add("visible");
      cardObserver.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  bigCards.forEach(el => cardObserver.observe(el));
  smallCards.forEach(el => cardObserver.observe(el));
});
