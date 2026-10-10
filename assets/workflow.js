/* This illustration only advances after the visitor activates its button. */
(() => {
  'use strict';
  document.querySelectorAll('[data-workflow-demo]').forEach(demo => {
    const action = demo.querySelector('[data-demo-action]');
    const loupe = demo.querySelector('.demo-loupe');
    const placeholder = demo.querySelector('.demo-placeholder');
    const status = demo.querySelector('[data-demo-status]');
    let step = 0;
    const labels = ['Lupe zeigen', 'Treffer öffnen', 'Noch einmal'];
    const descriptions = [
      'In der App: Wahltaste halten, um die Lupe einzublenden. In dieser Illustration starten Sie mit „Lupe zeigen“.',
      'Die Fundstelle ist erkannt. Erst ein Klick öffnet den Wortlaut — hier mit „Treffer öffnen“.',
      'Treffer bestätigt. Rechts sehen Sie die echte App-Aufnahme mit hervorgehobener Stelle.'
    ];
    const render = () => {
      demo.dataset.step = String(step);
      action.textContent = labels[step];
      loupe.hidden = step !== 1;
      placeholder.hidden = step === 2;
      status.textContent = descriptions[step];
    };
    demo.classList.add('demo-enhanced');
    action.hidden = false;
    action.addEventListener('click', () => { step = (step + 1) % 3; render(); });
    render();
  });
})();
