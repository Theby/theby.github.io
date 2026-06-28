document.addEventListener("DOMContentLoaded", () => {
  const bigCards = document.querySelectorAll('.project-inner');
  const smallCards = document.querySelectorAll('.smaller-project-card');

  const h1AnchorMap = new Map();

  const mainContent = document.querySelector('#main_content');
  if (mainContent) {
    let currentH1 = null;
    let sectionHasCards = false;

    Array.from(mainContent.children).forEach(el => {
      if (el.tagName === 'H1') {
        currentH1 = el;
        sectionHasCards = false;
        h1AnchorMap.set(currentH1, []);
      } else if (currentH1 && !sectionHasCards) {
        const firstBig = el.querySelector('.project-inner');
        const firstSmall = el.querySelectorAll('.smaller-project-card');
        if (firstBig) {
          h1AnchorMap.get(currentH1).push(firstBig);
          sectionHasCards = true;
        } else if (firstSmall.length > 0) {
          Array.from(firstSmall).slice(0, 3)
            .forEach(c => h1AnchorMap.get(currentH1).push(c));
          sectionHasCards = true;
        }
      }
    });
  }

  const sectionIndex = document.querySelector('#section-index');
  if (sectionIndex && mainContent) {
    const list = sectionIndex.querySelector('.section-index-list');
    const toggle = sectionIndex.querySelector('.section-index-toggle');
    const linkById = new Map();
    const sectionH1s = Array.from(mainContent.querySelectorAll('h1')).filter(h1 => h1.id);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scrollToTarget = getDest => {
      const behavior = prefersReduced ? 'auto' : 'smooth';
      const tolerance = 2;
      const maxAttempts = 8;
      let attempts = 0;
      let cancelled = false;

      const onUserInput = () => { cancelled = true; };
      const inputEvents = ['wheel', 'touchstart', 'keydown'];
      inputEvents.forEach(ev =>
        window.addEventListener(ev, onUserInput, { passive: true, once: true })
      );
      const cleanup = () =>
        inputEvents.forEach(ev => window.removeEventListener(ev, onUserInput));

      const go = () => {
        window.scrollTo({ top: getDest(), behavior });

        let lastY = null;
        let stableFrames = 0;
        const watch = () => {
          if (cancelled) { cleanup(); return; }
          const y = window.scrollY;
          if (y === lastY) {
            stableFrames++;
          } else {
            stableFrames = 0;
            lastY = y;
          }
          if (stableFrames < 3) {
            requestAnimationFrame(watch);
            return;
          }

          if (Math.abs(getDest() - window.scrollY) > tolerance && attempts < maxAttempts) {
            attempts++;
            go();
          } else {
            cleanup();
          }
        };
        requestAnimationFrame(watch);
      };
      go();
    };

    sectionH1s.forEach((h1, i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${h1.id}`;
      a.textContent = h1.textContent.trim();
      li.appendChild(a);
      list.appendChild(li);
      linkById.set(h1.id, a);

      a.addEventListener('click', e => {
        e.preventDefault();
        if (i === 0 && window.matchMedia('(min-width: 801px)').matches) {
          scrollToTarget(() => 0);
        } else {
          scrollToTarget(() => Math.max(0, h1.getBoundingClientRect().top + window.scrollY));
        }
        if (!window.matchMedia('(min-width: 801px)').matches) {
          sectionIndex.classList.remove('is-open');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    if (linkById.size > 0) {
      sectionIndex.removeAttribute('hidden');

      if (toggle) {
        toggle.addEventListener('click', () => {
          const open = sectionIndex.classList.toggle('is-open');
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      }

      if (window.matchMedia('(min-width: 801px)').matches) {
        sectionIndex.classList.add('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
      }

      const setActive = id => {
        linkById.forEach((link, key) => link.classList.toggle('active', key === id));
      };

      let spyTicking = false;
      const updateSpy = () => {
        spyTicking = false;
        const line = window.innerHeight * 0.45;
        let currentId = sectionH1s[0].id;
        for (const h1 of sectionH1s) {
          if (h1.getBoundingClientRect().top <= line) currentId = h1.id;
          else break;
        }
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        if (atBottom) currentId = sectionH1s[sectionH1s.length - 1].id;
        setActive(currentId);
      };

      const onSpyScroll = () => {
        if (spyTicking) return;
        spyTicking = true;
        requestAnimationFrame(updateSpy);
      };

      window.addEventListener('scroll', onSpyScroll, { passive: true });
      window.addEventListener('resize', onSpyScroll, { passive: true });
      updateSpy();
    }
  }

  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (entry.target.classList.contains("visible")) {
        cardObserver.unobserve(entry.target);
        return;
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

  const h1Observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      h1Observer.unobserve(entry.target);

      const anchors = h1AnchorMap.get(entry.target) || [];
      anchors.forEach(card => {
        if (!card.classList.contains("visible")) {
          if (card.classList.contains("smaller-project-card")) {
            const index = Array.from(smallCards).indexOf(card);
            card.style.transitionDelay = `${index * 40}ms`;
          }
          card.classList.add("visible");
          cardObserver.unobserve(card);
        }
      });
    });
  }, { threshold: 0, rootMargin: "0px 0px 50px 0px" });

  document.querySelectorAll('#main_content h1').forEach(h1 => h1Observer.observe(h1));
});
