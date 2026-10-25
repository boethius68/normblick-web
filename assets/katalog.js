/* Der Katalog filtert ausschließlich bereits ausgeliefertes HTML; keine Netzanfragen. */
(() => {
  'use strict';
  const form = document.querySelector('.catalog-filters');
  if (!form) return;
  const input = form.querySelector('input');
  const select = form.querySelector('select');
  const status = document.querySelector('[data-catalog-status]');
  const empty = document.querySelector('.catalog-empty');
  const falten = text => text.normalize('NFC').toLocaleLowerCase('de').replaceAll('ä', 'ae').replaceAll('ö', 'oe').replaceAll('ü', 'ue').replaceAll('ß', 'ss').normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  const groups = [...document.querySelectorAll('.catalog-group')].map(element => ({
    element,
    count: element.querySelector('[data-group-count]'),
    rows: [...element.querySelectorAll('[data-law]')].map(element => ({ element, text: falten(element.textContent) }))
  }));
  const filtern = () => {
    const tokens = falten(input.value.trim()).split(/\s+/).filter(Boolean);
    const source = select.value;
    let total = 0;
    let visibleGroups = 0;
    for (const group of groups) {
      const sourceMatch = source === 'alle' || source === group.element.dataset.source;
      let count = 0;
      for (const row of group.rows) {
        const matches = sourceMatch && tokens.every(token => row.text.includes(token));
        row.element.hidden = !matches;
        if (matches) count++;
      }
      group.element.hidden = count === 0;
      group.element.open = count > 0 && (tokens.length > 0 || source !== 'alle');
      group.count.textContent = `${count} ${count === 1 ? 'Gesetz' : 'Gesetze'}`;
      total += count;
      if (count) visibleGroups++;
    }
    status.textContent = `${total} ${total === 1 ? 'Gesetz' : 'Gesetze'} in ${visibleGroups} ${visibleGroups === 1 ? 'Rechtskreis' : 'Rechtskreisen'}`;
    empty.hidden = total !== 0;
  };
  form.addEventListener('submit', event => { event.preventDefault(); filtern(); });
  input.addEventListener('input', filtern);
  select.addEventListener('change', filtern);
  form.addEventListener('reset', () => { input.value = ''; select.value = 'alle'; filtern(); input.focus(); });
  form.hidden = false;
  filtern();
})();
