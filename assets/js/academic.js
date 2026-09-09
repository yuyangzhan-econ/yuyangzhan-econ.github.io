/* Isolated, dependency-free interactions for the academic layout. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const storage = {
    read(key, session = false) { try { return (session ? sessionStorage : localStorage).getItem(key); } catch (_) { return null; } },
    write(key, value, session = false) { try { (session ? sessionStorage : localStorage).setItem(key, value); } catch (_) {} }
  };

  function initTheme() {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    const sync = (dark) => {
      root.dataset.theme = dark ? 'dark' : 'light';
      button.setAttribute('aria-pressed', String(dark));
      const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
      button.title = label;
      document.querySelector('#theme-color')?.setAttribute('content', dark ? '#272727' : '#ffffff');
    };
    sync(root.dataset.theme === 'dark');
    button.hidden = false;
    button.addEventListener('click', async () => {
      if (button.disabled) return;
      const dark = root.dataset.theme !== 'dark';
      const apply = () => { sync(dark); storage.write('theme', dark ? 'dark' : 'light'); };
      if (reducedMotion.matches || !Element.prototype.animate) { apply(); return; }
      button.disabled = true;
      const overlay = document.createElement('div');
      overlay.className = 'theme-bars';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.append(overlay);
      try {
        const animations = [];
        for (let i = 0; i < 10; i++) {
          const bar = document.createElement('div');
          bar.className = 'theme-bar';
          Object.assign(bar.style, { top: `${i * 10}%`, height: 'calc(10% + 1px)', background: dark ? '#272727' : '#ffffff' });
          overlay.append(bar);
          animations.push(bar.animate([{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }], {
            duration: 700, delay: (dark ? 9 - i : i) * 40,
            easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards'
          }).finished);
        }
        await Promise.all(animations);
        apply();
        await overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' }).finished;
      } catch (_) { apply(); }
      finally { overlay.remove(); button.disabled = false; }
    });
  }

  function initReveals() {
    // Keep seen sections when visiting Personal and returning. A reload resets them.
    const key = 'academic-sections-seen-v1';
    if (performance.getEntriesByType('navigation')[0]?.type === 'reload') storage.write(key, '[]', true);
    let seen;
    try { const data = JSON.parse(storage.read(key, true) || '[]'); seen = new Set(Array.isArray(data) ? data : []); }
    catch (_) { seen = new Set(); }
    const sections = [...document.querySelectorAll('section[data-reveal]')];
    if (!sections.length) return;
    const reveal = (section) => {
      section.classList.remove('reveal-pending');
      section.classList.add('is-revealed');
      seen.add(section.id);
      storage.write(key, JSON.stringify([...seen]), true);
    };
    if (reducedMotion.matches || !('IntersectionObserver' in window)) { sections.forEach(reveal); return; }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { reveal(entry.target); observer.unobserve(entry.target); }
      });
    }, { threshold: 0, rootMargin: '-12% 0px -18% 0px' });
    sections.forEach(section => {
      if (seen.has(section.id)) reveal(section);
      else { section.classList.add('reveal-pending'); observer.observe(section); }
    });
    reducedMotion.addEventListener('change', event => {
      if (event.matches) { sections.forEach(reveal); observer.disconnect(); }
    });
    // A keyboard user must never focus a still-dim interactive control.
    sections.forEach(section => section.addEventListener('focusin', () => { reveal(section); observer.unobserve(section); }));
  }

  function initAbstracts() {
    document.querySelectorAll('details.paper-abstract').forEach(details => {
      const summary = details.querySelector('summary');
      const body = details.querySelector('.abstract-body');
      if (!summary || !body) return;
      let animation = null;
      let desiredOpen = details.open;
      summary.addEventListener('click', event => {
        if (reducedMotion.matches || !Element.prototype.animate) return;
        event.preventDefault();
        desiredOpen = animation ? !desiredOpen : !details.open;
        const start = details.getBoundingClientRect().height;
        if (animation) { animation.onfinish = null; animation.cancel(); }
        details.style.height = `${start}px`;
        details.style.overflow = 'hidden';
        details.open = true;
        const end = desiredOpen ? summary.getBoundingClientRect().height + body.getBoundingClientRect().height : summary.getBoundingClientRect().height;
        animation = details.animate({ height: [`${start}px`, `${end}px`] }, { duration: 240, easing: 'ease-in-out' });
        animation.onfinish = () => {
          details.open = desiredOpen;
          details.style.height = '';
          details.style.overflow = '';
          animation = null;
        };
      });
    });
  }

  function initNavigation() {
    const header = document.querySelector('.site-header');
    if (header) {
      const updateHeight = () => root.style.setProperty('--nav-height', `${header.getBoundingClientRect().height}px`);
      updateHeight();
      if ('ResizeObserver' in window) new ResizeObserver(updateHeight).observe(header);
      else window.addEventListener('resize', updateHeight, { passive: true });
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
      try {
        const url = new URL(link.href);
        if (url.pathname === location.pathname && url.pathname.endsWith('/personal/')) link.setAttribute('aria-current', 'page');
      } catch (_) { /* A self-contained offline preview has no HTTP base URL. */ }
    });
  }

  // Each feature fails independently; content is visible without JavaScript.
  [initTheme, initReveals, initAbstracts, initNavigation].forEach(init => {
    try { init(); } catch (error) {
      if (init === initReveals) document.querySelectorAll('.reveal-pending').forEach(section => section.classList.remove('reveal-pending'));
      console.warn('Optional site interaction unavailable:', error);
    }
  });
})();
