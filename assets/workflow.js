/* Browser simulation of ScannerOverlay.swift. Two local text fixtures, no OCR.
   Native geometry: 260×34 capsule, clear centre, 20% dimming, 500 ms hold.
   The capture/lookup happens on click, never on hover or on key-down. */
(() => {
  'use strict';
  const demo = document.querySelector('[data-lens-demo]');
  if (!demo) return;
  const stage = demo.querySelector('[data-lens-stage]');
  const lens = demo.querySelector('[data-selection-lens]');
  const dimming = demo.querySelector('.lens-dimming');
  const hole = demo.querySelector('[data-lens-hole]');
  const result = demo.querySelector('[data-lens-result]');
  const action = demo.querySelector('[data-lens-activate]');
  const status = demo.querySelector('[data-lens-status]');
  const pin = demo.querySelector('[data-result-pin]');
  const citations = [...demo.querySelectorAll('[data-norm]')];
  // Exact paragraph text from the app's read-only BGB database snapshot.
  const norms = {
    '433': {
      label: '§ 433 BGB', title: 'Vertragstypische Pflichten beim Kaufvertrag',
      detail: 'Absatz 1, Satz 1',
      highlighted: 'Durch den Kaufvertrag wird der Verkäufer einer Sache verpflichtet, dem Käufer die Sache zu übergeben und das Eigentum an der Sache zu verschaffen.',
      remainder: 'Der Verkäufer hat dem Käufer die Sache frei von Sach- und Rechtsmängeln zu verschaffen.',
      continuation: '(2) Der Käufer ist verpflichtet, dem Verkäufer den vereinbarten Kaufpreis zu zahlen und die gekaufte Sache abzunehmen.'
    },
    '823': {
      label: '§ 823 BGB', title: 'Schadensersatzpflicht', detail: 'Absatz 1',
      highlighted: 'Wer vorsätzlich oder fahrlässig das Leben, den Körper, die Gesundheit, die Freiheit, das Eigentum oder ein sonstiges Recht eines anderen widerrechtlich verletzt, ist dem anderen zum Ersatz des daraus entstehenden Schadens verpflichtet.',
      continuation: '(2) Die gleiche Verpflichtung trifft denjenigen, welcher gegen ein den Schutz eines anderen bezweckendes Gesetz verstößt. Ist nach dem Inhalt des Gesetzes ein Verstoß gegen dieses auch ohne Verschulden möglich, so tritt die Ersatzpflicht nur im Falle des Verschuldens ein.'
    }
  };
  let active = false;
  let pinned = false;
  let pointerInside = false;
  let pointer = { x: 0, y: 0 };
  let lastCitation = citations[0];
  let center = { x: 0, y: 0 };
  let size = { width: 260, height: 34 };
  let holdTimer = null;
  let optionDown = false;
  let held = false;
  let returnFocus = null;
  const clamp = (value, low, high) => Math.max(low, Math.min(value, high));
  const initialMessage = 'Wahltaste halten. Lupe über eine Fundstelle legen. Klicken.';

  const moveLens = (x, y) => {
    size.width = Math.min(size.width, stage.clientWidth - 16);
    size.height = Math.min(size.height, stage.clientHeight - 16);
    center = {
      x: clamp(x, size.width / 2 + 8, stage.clientWidth - size.width / 2 - 8),
      y: clamp(y, size.height / 2 + 8, stage.clientHeight - size.height / 2 - 8)
    };
    const left = center.x - size.width / 2;
    const top = center.y - size.height / 2;
    Object.assign(lens.style, {
      left: `${left}px`, top: `${top}px`, width: `${size.width}px`, height: `${size.height}px`,
      '--rim': `${clamp(size.height * .22, 7, 16)}px`
    });
    Object.entries({ x: left, y: top, width: size.width, height: size.height, rx: Math.min(size.width, size.height) / 2 })
      .forEach(([key, value]) => hole.setAttribute(key, String(value)));
  };
  const overCitation = citation => {
    const rect = citation.getBoundingClientRect();
    const parent = stage.getBoundingClientRect();
    moveLens(rect.left + rect.width / 2 - parent.left, rect.top + rect.height / 2 - parent.top);
  };
  const showLens = visible => {
    lens.hidden = !visible;
    // SVGElement has no HTMLElement.hidden property; change the actual attribute.
    dimming.toggleAttribute('hidden', !visible);
  };
  const setPinned = value => {
    pinned = value;
    pin.setAttribute('aria-pressed', String(value));
    pin.querySelector('span').textContent = value ? 'Bleibt stehen' : 'Festhalten';
  };
  const closeResult = (focus = false) => {
    result.hidden = true;
    setPinned(false);
    if (focus && returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  };
  const stop = (focus = false, preview = false) => {
    active = false;
    closeResult(focus);
    demo.dataset.state = 'ready';
    action.setAttribute('aria-pressed', 'false');
    action.textContent = 'Lupe ausprobieren ⌥';
    status.textContent = initialMessage;
    overCitation(lastCitation);
    // Only the first visit shows a stationary preview. Cancellation really hides it.
    showLens(preview);
  };
  const start = (citation = null) => {
    closeResult();
    active = true;
    demo.dataset.state = 'scanning';
    action.setAttribute('aria-pressed', 'true');
    action.textContent = 'Lupe beenden · Esc';
    status.textContent = 'Lupe bewegen und klicken. Scrollen ändert die Breite, ⇧ + Scrollen die Höhe.';
    if (citation) { lastCitation = citation; overCitation(citation); }
    else if (pointerInside) moveLens(pointer.x, pointer.y);
    else overCitation(lastCitation);
    showLens(true);
  };
  const placeResult = () => {
    result.style.maxHeight = `${stage.clientHeight - 28}px`;
    const width = result.offsetWidth;
    const height = result.offsetHeight;
    const margin = 14;
    let x = center.x + 140;
    const leftCandidate = center.x - width - 140;
    if (x + width + margin > stage.clientWidth && leftCandidate >= margin) x = leftCandidate;
    let y = center.y + 90;
    const aboveCandidate = center.y - height - 90;
    if (y + height + margin > stage.clientHeight && aboveCandidate >= margin) y = aboveCandidate;
    result.style.left = `${clamp(x, margin, stage.clientWidth - width - margin)}px`;
    result.style.top = `${clamp(y, margin, stage.clientHeight - height - margin)}px`;
  };
  const openNorm = (citation, keyboard = false) => {
    const norm = norms[citation.dataset.norm];
    returnFocus = keyboard ? citation : action;
    lastCitation = citation;
    demo.querySelector('[data-result-title]').textContent = norm.label;
    demo.querySelector('[data-result-subtitle]').textContent = norm.title;
    const text = demo.querySelector('[data-result-text]');
    const detail = document.createElement('p');
    detail.className = 'result-detail';
    detail.textContent = norm.detail;
    const paragraph = document.createElement('p');
    paragraph.className = 'result-paragraph';
    paragraph.append('(1) ');
    const mark = document.createElement('mark');
    mark.textContent = norm.highlighted;
    if (norm.remainder) {
      const number = document.createElement('sup');
      number.textContent = '1';
      mark.prepend(number);
    }
    paragraph.append(mark);
    if (norm.remainder) {
      const number = document.createElement('sup');
      number.textContent = '2';
      paragraph.append(' ', number, norm.remainder);
    }
    const context = document.createElement('p');
    context.className = 'result-context';
    context.textContent = norm.continuation;
    text.replaceChildren(detail, paragraph, context);
    active = false;
    demo.dataset.state = 'result';
    action.setAttribute('aria-pressed', 'false');
    action.textContent = 'Andere Fundstelle ansehen ⌥';
    showLens(false);
    result.hidden = false;
    placeResult();
    // Reset after layout: hidden scroll containers can retain the previous offset.
    text.scrollTop = 0;
    status.textContent = `${norm.label}: ${norm.detail} hervorgehoben. Der vollständige Paragraph ist im Ergebnisfenster scrollbar.`;
    if (keyboard) demo.querySelector('[data-result-close]').focus({ preventScroll: true });
  };
  const hitCitation = () => {
    const parent = stage.getBoundingClientRect();
    // Only accept a complete citation inside the selected OCR aperture.
    return citations.find(citation => {
      const rect = citation.getBoundingClientRect();
      const x = rect.left - parent.left;
      const y = rect.top - parent.top;
      return x >= center.x - size.width / 2 && x + rect.width <= center.x + size.width / 2 &&
        y < center.y + size.height / 2 && y + rect.height > center.y - size.height / 2;
    });
  };

  action.hidden = false;
  action.addEventListener('click', () => { if (active) stop(); else start(lastCitation); });
  citations.forEach(citation => {
    citation.addEventListener('click', event => {
      event.stopPropagation();
      // Tap / keyboard fallback: first activation places the lens, second confirms.
      // Mouse selection must still depend on what lies inside the capsule.
      const keyboard = event.detail === 0;
      if (!active) { start(citation); return; }
      if (keyboard || event.pointerType === 'touch') overCitation(citation);
      const hit = hitCitation();
      if (hit) openNorm(hit, keyboard);
      else status.textContent = 'Die Fundstelle liegt nicht vollständig in der Lupe. Lupe verschieben oder breiter scrollen.';
    });
  });
  stage.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    pointerInside = true;
    const parent = stage.getBoundingClientRect();
    pointer = { x: event.clientX - parent.left, y: event.clientY - parent.top };
    if (active) { moveLens(pointer.x, pointer.y); showLens(true); }
  });
  stage.addEventListener('pointerleave', () => { pointerInside = false; if (active) showLens(false); });
  stage.addEventListener('click', event => {
    if (result.contains(event.target)) return;
    if (active) {
      const hit = hitCitation();
      if (hit) openNorm(hit);
      else status.textContent = 'Keine vollständige Fundstelle in der Auswahl. Legen Sie die Lupe über einen der beiden Verweise.';
    } else if (!result.hidden && !pinned) stop();
  });
  stage.addEventListener('contextmenu', event => {
    if (!active) return;
    event.preventDefault();
    stop();
  });
  stage.addEventListener('wheel', event => {
    if (!active || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const delta = -event.deltaY * (event.deltaMode === 0 ? .6 : 4);
    if (event.shiftKey) size.height = clamp(size.height + delta, 26, 400);
    else {
      const width = clamp(size.width + delta, 120, 1200);
      size.height = clamp(size.height + (width - size.width) * size.height / size.width * .5, 26, 400);
      size.width = width;
    }
    moveLens(center.x, center.y);
  }, { passive: false });
  pin.addEventListener('click', () => setPinned(!pinned));
  demo.querySelector('[data-result-text]').addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || !['Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const text = event.currentTarget;
    text.scrollTop = event.key === 'Home' ? 0 : text.scrollHeight - text.clientHeight;
  });
  demo.querySelector('[data-result-close]').addEventListener('click', () => stop(true));
  document.addEventListener('click', event => {
    if (!demo.contains(event.target) && !result.hidden && !pinned) stop();
  });

  const clearHold = () => { window.clearTimeout(holdTimer); holdTimer = null; };
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && (active || !result.hidden)) { clearHold(); stop(true); return; }
    if (event.key !== 'Alt' || event.ctrlKey || event.metaKey || event.shiftKey) {
      if (optionDown) { clearHold(); held = true; }
      return;
    }
    const rect = demo.getBoundingClientRect();
    if (event.repeat || rect.bottom < 80 || rect.top > innerHeight || document.querySelector('dialog[open]') ||
        event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    optionDown = true;
    held = false;
    clearHold();
    holdTimer = window.setTimeout(() => {
      held = true;
      start();
      holdTimer = null;
    }, 500);
  });
  document.addEventListener('keyup', event => {
    if (event.key !== 'Alt' || !optionDown) return;
    clearHold();
    optionDown = false;
    // Releasing after a hold does NOT stop the native scanner. A short tap does.
    if (!held && (active || !result.hidden)) stop(true);
  });
  window.addEventListener('blur', () => { clearHold(); optionDown = false; if (active) stop(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearHold(); optionDown = false; if (active) stop(); }
  });
  new ResizeObserver(() => {
    if (!active) overCitation(lastCitation);
    else moveLens(center.x, center.y);
    if (!result.hidden) placeResult();
  }).observe(stage);
  document.fonts.ready.then(() => {
    if (!active && result.hidden && !lens.hidden) overCitation(lastCitation);
  });
  stop(false, true);
})();
