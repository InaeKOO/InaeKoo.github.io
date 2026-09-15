(() => {
  'use strict';
  const dialog = document.querySelector('.detail-dialog');
  const body = document.querySelector('.dialog-body');
  const sources = new Map([...document.querySelectorAll('#section-content > section')].map(section => [section.id, section]));
  const title = document.title;
  let opener = null;
  let activeId = null;

  // Use actual sections as a no-JavaScript fallback; move a single section into
  // the dialog to preserve IDs, images, and accessible document structure.
  if (typeof dialog.showModal === 'function') {
    document.documentElement.classList.add('enhanced');
    for (const anchor of document.querySelectorAll('a[href^="#"]')) {
      if (sources.has(anchor.hash.slice(1))) anchor.setAttribute('aria-haspopup', 'dialog');
    }
    function restoreSection() {
      if (!activeId) return;
      const section = sources.get(activeId);
      section.id = activeId;
      section.querySelector('h2').removeAttribute('id');
      section.querySelector('h2').removeAttribute('tabindex');
      document.querySelector('#section-content').append(section);
      activeId = null;
    }
    function showSection(id) {
      if (activeId === id) return;
      if (!dialog.open) opener = document.activeElement;
      restoreSection();
      const section = sources.get(id);
      // Hashes are routes in enhanced mode. Avoid native fragment scrolling
      // into the moved section, especially during direct-link navigation.
      section.dataset.section = id;
      section.id = `detail-${id}`;
      const heading = section.querySelector('h2');
      heading.id = 'dialog-title';
      heading.tabIndex = -1;
      body.append(section);
      activeId = id;
      document.title = `${section.dataset.label} — Inhoe Koo`;
      if (!dialog.open) dialog.showModal();
      document.body.classList.add('dialog-open');
      dialog.scrollTop = 0;
      heading.focus({ preventScroll: true });
      syncMotion();
    }
    function hideSection() {
      if (!dialog.open) return;
      dialog.close();
      restoreSection();
      document.body.classList.remove('dialog-open');
      document.title = title;
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
      syncMotion();
    }
    function route() {
      const id = location.hash.slice(1);
      if (sources.has(id)) showSection(id);
      else hideSection();
    }
    function close() {
      history.pushState(null, '', location.pathname + location.search);
      hideSection();
    }
    document.addEventListener('click', event => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const id = anchor.hash.slice(1);
      if (sources.has(id)) {
        event.preventDefault();
        if (location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
        showSection(id);
      } else if (anchor.classList.contains('dialog-home')) {
        event.preventDefault(); close();
      }
    });
    dialog.querySelector('.close-dialog').addEventListener('click', close);
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('a[href], button:not([disabled])')].filter(element => element.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement.id === 'dialog-title')) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    });
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    let backdropDown = false;
    dialog.addEventListener('pointerdown', event => { backdropDown = event.target === dialog; });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog || !backdropDown) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    });
    window.addEventListener('popstate', route);
    window.addEventListener('hashchange', route);
    // Wait until motion state below is initialized before opening a deep link.
    queueMicrotask(route);
  }

  const universe = document.querySelector('.universe');
  const preview = document.querySelector('.orbit-preview');
  const summaries = {
    about: ['01 / ABOUT ME', 'Inhoe Koo · Quantum computing & AI'],
    publications: ['02 / PUBLICATIONS', 'QFlowNet · IEEE QCNC 2026'],
    goals: ['03 / VISION & GOALS', 'Quantum simulation. An independent research career.'],
    education: ['04 / EDUCATION', 'Seoul National University · ETH Zürich'],
    research: ['05 / RESEARCH', 'Algorithms, atoms & superconducting systems'],
    beyond: ['06 / BEYOND THE LAB', 'Teaching, community & a little curiosity']
  };
  let previewDismissed = false;
  function showPreview(node) {
    previewDismissed = false;
    const [label, summary] = summaries[node.dataset.preview];
    preview.querySelector('span').textContent = label;
    preview.querySelector('p').textContent = summary;
    universe.classList.add('is-exploring');
  }
  for (const node of document.querySelectorAll('[data-preview]')) {
    node.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') showPreview(node); });
    node.addEventListener('focus', () => showPreview(node));
    node.addEventListener('blur', () => { if (!universe.matches(':hover')) universe.classList.remove('is-exploring'); });
  }
  universe.addEventListener('pointerleave', () => {
    if (!universe.contains(document.activeElement) || previewDismissed) universe.classList.remove('is-exploring');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { previewDismissed = true; universe.classList.remove('is-exploring'); }
  });

  const electrons = [...document.querySelectorAll('.electron')];
  const cloud = document.querySelector('.particle-cloud');
  // A deterministic point cloud suggests an orbital probability distribution.
  let seed = 37;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let index = 0; index < 110; index++) {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const angle = random() * Math.PI * 2;
    const radius = 37 + Math.pow(random(), 1.8) * 77;
    dot.setAttribute('cx', String(360 + Math.cos(angle) * radius));
    dot.setAttribute('cy', String(240 + Math.sin(angle) * radius * .84));
    dot.setAttribute('r', String(.5 + random() * 1.3));
    dot.setAttribute('opacity', String(.13 + random() * .43));
    cloud.append(dot);
  }
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('.motion-button');
  let paused = reduceMotion.matches;
  let visible = true;
  let frame = null;
  let previousTime = 0;
  let elapsed = 0;
  function render(time) {
    const rotations = [0, Math.PI / 3, -Math.PI / 3];
    electrons.forEach((electron, index) => {
      const phase = time * (.00026 + index * .000035) + index * 2.1 + .45;
      const x = 238 * Math.cos(phase), y = 81 * Math.sin(phase), rotation = rotations[index];
      electron.setAttribute('transform', `translate(${360 + x * Math.cos(rotation) - y * Math.sin(rotation)} ${240 + x * Math.sin(rotation) + y * Math.cos(rotation)})`);
    });
  }
  function tick(time) {
    if (previousTime) elapsed += Math.min(time - previousTime, 64);
    previousTime = time;
    render(elapsed);
    frame = requestAnimationFrame(tick);
  }
  function syncMotion() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    previousTime = 0;
    if (!paused && visible && !document.hidden && !dialog.open) frame = requestAnimationFrame(tick);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.innerHTML = paused ? '<span aria-hidden="true">▷</span> Resume motion' : '<span aria-hidden="true">Ⅱ</span> Pause motion';
  }
  motionButton.addEventListener('click', () => { paused = !paused; syncMotion(); });
  reduceMotion.addEventListener('change', event => { paused = event.matches; syncMotion(); });
  document.addEventListener('visibilitychange', syncMotion);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; syncMotion(); }).observe(universe);
  render(0);
  syncMotion();
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
