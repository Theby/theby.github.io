document.addEventListener("DOMContentLoaded", () => {
  const MAX_ANCHORED_SMALL_CARDS = 3;
  const SCROLL_SETTLE_TOLERANCE_PX = 2;
  const MAX_SCROLL_ATTEMPTS = 8;
  const STABLE_FRAMES_REQUIRED = 3;
  const SCROLLSPY_LINE_RATIO = 0.45;
  const PAGE_BOTTOM_EPSILON_PX = 2;
  const CARD_STAGGER_MS = 40;
  const CARD_VISIBLE_RATIO = 0.2;
  const H1_PEEK_ROOT_MARGIN = "0px 0px 50px 0px";

  // 801 = one past the `max-width: 800px` breakpoint used in general.css:260,
  // projects.css:137, pages/about.css:19 and pages/contact.css:80
  const DESKTOP_MEDIA_QUERY = '(min-width: 801px)';
  const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);

  const bigCards = document.querySelectorAll('.project-inner');
  const smallCards = document.querySelectorAll('.smaller-project-card');
  const smallCardOrder = Array.from(smallCards);

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
          Array.from(firstSmall).slice(0, MAX_ANCHORED_SMALL_CARDS)
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

    const setIndexOpen = open => {
      sectionIndex.classList.toggle('is-open', open);
      if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const scrollToTarget = getDest => {
      const behavior = reducedMotionQuery.matches ? 'auto' : 'smooth';
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
          if (stableFrames < STABLE_FRAMES_REQUIRED) {
            requestAnimationFrame(watch);
            return;
          }

          if (
            Math.abs(getDest() - window.scrollY) > SCROLL_SETTLE_TOLERANCE_PX &&
            attempts < MAX_SCROLL_ATTEMPTS
          ) {
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
        if (i === 0 && desktopQuery.matches) {
          scrollToTarget(() => 0);
        } else {
          scrollToTarget(() => Math.max(0, h1.getBoundingClientRect().top + window.scrollY));
        }
        if (!desktopQuery.matches) setIndexOpen(false);
      });
    });

    if (linkById.size > 0) {
      sectionIndex.removeAttribute('hidden');

      if (toggle) {
        toggle.addEventListener('click', () => {
          setIndexOpen(!sectionIndex.classList.contains('is-open'));
        });
      }

      if (desktopQuery.matches) setIndexOpen(true);

      const setActive = id => {
        linkById.forEach((link, key) => link.classList.toggle('active', key === id));
      };

      let spyTicking = false;
      const updateSpy = () => {
        spyTicking = false;
        const line = window.innerHeight * SCROLLSPY_LINE_RATIO;
        let currentId = sectionH1s[0].id;
        for (const h1 of sectionH1s) {
          if (h1.getBoundingClientRect().top <= line) currentId = h1.id;
          else break;
        }
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - PAGE_BOTTOM_EPSILON_PX;
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

  const applyStagger = card => {
    if (!card.classList.contains("smaller-project-card")) return;
    const index = smallCardOrder.indexOf(card);
    card.style.transitionDelay = `${index * CARD_STAGGER_MS}ms`;
  };

  const revealCard = card => {
    if (!card.classList.contains("visible")) {
      applyStagger(card);
      card.classList.add("visible");
    }
    cardObserver.unobserve(card);
  };

  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) revealCard(entry.target);
    });
  }, { threshold: CARD_VISIBLE_RATIO });

  bigCards.forEach(el => cardObserver.observe(el));
  smallCards.forEach(el => cardObserver.observe(el));

  const h1Observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      h1Observer.unobserve(entry.target);

      const anchors = h1AnchorMap.get(entry.target) || [];
      anchors.forEach(revealCard);
    });
  }, { threshold: 0, rootMargin: H1_PEEK_ROOT_MARGIN });

  document.querySelectorAll('#main_content h1').forEach(h1 => h1Observer.observe(h1));
});
