/* Progressive enhancement only. No network APIs, tracking or storage. */
(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (header && menuButton && nav) {
    const mobile = window.matchMedia('(max-width: 767px)');
    const closeMenu = (returnFocus = false) => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = 'Menü';
      nav.classList.remove('is-open');
      if (returnFocus) menuButton.focus();
    };
    menuButton.hidden = false;
    header.classList.add('nav-enhanced');
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? 'Schließen' : 'Menü';
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) return;
      closeMenu();
      if (link.hash && link.pathname === window.location.pathname) {
        const target = document.getElementById(link.hash.slice(1));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
      }
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) closeMenu();
    });
    mobile.addEventListener('change', () => closeMenu());
  }

  document.querySelectorAll('.gallery').forEach(gallery => {
    const controls = gallery.querySelector('.gallery-controls');
    if (!controls) return;
    const tabs = [...controls.querySelectorAll('[role="tab"]')];
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
    if (panels.some(panel => !panel)) return;
    const select = (index, focus = false) => {
      tabs.forEach((tab, i) => {
        tab.setAttribute('aria-selected', String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      const img = panels[index].querySelector('img');
      if (img) img.loading = 'eager';
      if (focus) tabs[index].focus();
    };
    panels.forEach((panel, i) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabs[i].id);
      panel.tabIndex = 0;
      const img = panel.querySelector('img');
      if (img) {
        img.addEventListener('error', () => {
          if (panel.querySelector('.image-error')) return;
          const error = document.createElement('p');
          error.className = 'image-error';
          error.setAttribute('role', 'status');
          error.textContent = 'Die Aufnahme konnte nicht geladen werden. Nutzen Sie „Vergrößern“, um das Originalbild zu öffnen, oder laden Sie die Seite erneut.';
          img.after(error);
        });
      }
    });
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(index));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          select(next, true);
        }
      });
    });
    select(0);
    controls.hidden = false;
    gallery.classList.add('gallery-enhanced');
  });

  const dialog = document.getElementById('bilddialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('#dialog-image');
  const viewport = dialog.querySelector('.dialog-viewport');
  const closeButton = dialog.querySelector('[data-close]');
  const zoomButton = dialog.querySelector('[data-zoom]');
  const error = dialog.querySelector('.image-error');
  const original = dialog.querySelector('#dialog-original');
  let trigger = null;
  let loadTimeout;
  const finishLoad = failed => {
    window.clearTimeout(loadTimeout);
    viewport.classList.remove('loading');
    viewport.setAttribute('aria-busy', 'false');
    error.hidden = !failed;
    image.hidden = failed;
  };
  image.addEventListener('load', () => finishLoad(false));
  image.addEventListener('error', () => finishLoad(true));

  document.querySelectorAll('[data-enlarge]').forEach(link => {
    link.addEventListener('click', event => {
      // Modified clicks retain native direct-image navigation.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      const preview = link.querySelector('img') || link.closest('figure')?.querySelector('img');
      const src = preview?.currentSrc || link.href;
      viewport.classList.toggle('result-snapshot', src.includes('ergebnis-hell'));
      dialog.querySelector('#dialog-title').textContent = link.dataset.title || 'App-Aufnahme';
      dialog.querySelector('#dialog-caption').textContent = link.dataset.caption || preview?.alt || '';
      image.alt = preview?.alt || link.dataset.caption || 'App-Aufnahme von Normblick';
      image.width = Number(preview?.getAttribute('width')) || 2000;
      image.height = Number(preview?.getAttribute('height')) || 1400;
      image.hidden = false;
      error.hidden = true;
      viewport.classList.remove('zoomed');
      viewport.classList.add('loading');
      viewport.setAttribute('aria-busy', 'true');
      zoomButton.setAttribute('aria-pressed', 'false');
      zoomButton.textContent = 'Lesemodus';
      original.href = src;
      window.clearTimeout(loadTimeout);
      loadTimeout = window.setTimeout(() => finishLoad(true), 15000);
      image.src = src;
      dialog.showModal();
      document.body.classList.add('dialog-open');
      viewport.scrollTop = 0;
      viewport.scrollLeft = 0;
      dialog.scrollTop = 0;
      closeButton.focus({ preventScroll: true });
      if (image.complete && image.naturalWidth > 0) finishLoad(false);
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  zoomButton.addEventListener('click', () => {
    const zoomed = zoomButton.getAttribute('aria-pressed') !== 'true';
    zoomButton.setAttribute('aria-pressed', String(zoomed));
    zoomButton.textContent = zoomed ? 'Ganzes Bild' : 'Lesemodus';
    viewport.classList.toggle('zoomed', zoomed);
    viewport.scrollTop = 0;
    viewport.scrollLeft = 0;
  });
  // The native dialog supplies focus containment and Escape/cancel behavior.
  dialog.addEventListener('close', () => {
    window.clearTimeout(loadTimeout);
    document.body.classList.remove('dialog-open');
    viewport.classList.remove('loading');
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) {
      dialog.close();
    }
  });
})();
