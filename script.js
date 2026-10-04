(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-toggle');
  function closeMenu() {
    header?.classList.remove('menu-open');
    menu?.setAttribute('aria-expanded', 'false');
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    header.classList.toggle('menu-open', open);
  });
  document.querySelectorAll('#navigation a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && header?.classList.contains('menu-open')) {
      closeMenu();
      menu?.focus();
    }
  });
  document.addEventListener('click', e => {
    if (header && !header.contains(e.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });

  const projects = window.PORTFOLIO_PROJECTS;
  const grid = document.getElementById('project-grid');
  if (!Array.isArray(projects) || !grid) return;
  const search = document.getElementById('project-search');
  const stack = document.getElementById('stack-filter');
  const chips = [...document.querySelectorAll('[data-area]')];
  const count = document.getElementById('result-count');
  const empty = document.getElementById('no-results');
  const dialog = document.getElementById('project-dialog');
  const content = document.getElementById('dialog-content');
  let area = 'all';
  let selectedStacks = new Set();
  let activeProject = null;
  let returnFocus = null;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => value.toLocaleLowerCase().normalize('NFKC');
  const terms = project => normalize([project.title, project.summary, project.tools, project.context, ...project.categories, ...project.details].join(' '));
  const searchIndex = new Map(projects.map(p => [p.id, terms(p)]));

  function updateURL() {
    const url = new URL(location.href);
    for (const [key, value] of [['area', area], ['q', search.value.trim()]]) {
      if (value && value !== 'all') url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    url.searchParams.delete('stack');
    selectedStacks.forEach(value => url.searchParams.append('stack', value));
    history.replaceState(null, '', url);
  }
  function filterProjects({save = true} = {}) {
    const query = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    const previous = new Map([...grid.querySelectorAll('[data-project]:not([hidden])')].map(c => [c,c.getBoundingClientRect()]));
    const matchBase = p => (!selectedStacks.size || p.stack.some(t => selectedStacks.has(t))) && query.every(term => searchIndex.get(p.id).includes(term));
    let shown = 0;
    for (const p of projects) {
      const visible = (area === 'all' || p.categories.includes(area)) && matchBase(p);
      const card = grid.querySelector(`[data-project="${p.id}"]`);
      const entering = visible && card.hidden;
      card.hidden = !visible;
      if (entering && !document.documentElement.classList.contains('motion-paused') && card.animate) card.animate([{opacity:0,translate:'0 10px'},{opacity:1,translate:'0 0'}],{duration:350,easing:'ease-out'});
      if (visible) shown++;
    }
    chips.forEach(c => {
      const selected = c.dataset.area === area;
      c.classList.toggle('active', selected);
      c.setAttribute('aria-pressed', String(selected));
      const badge = c.querySelector('span');
      if (badge) badge.textContent = projects.filter(p => matchBase(p) && (c.dataset.area === 'all' || p.categories.includes(c.dataset.area))).length;
    });
    document.querySelectorAll('[data-stack-chip]').forEach(b => {
      const active = b.dataset.stackChip === 'all' ? !selectedStacks.size : selectedStacks.has(b.dataset.stackChip);
      b.setAttribute('aria-pressed', String(active)); b.classList.toggle('active', active);
    });
    const selectedHost = document.getElementById('selected-stacks');
    if (selectedHost) {
      selectedHost.hidden = !selectedStacks.size;
      selectedHost.innerHTML = [...selectedStacks].map(t => `<button type="button" data-remove-stack="${escape(t)}" aria-label="Remove ${escape(t)} filter">${escape(t)} <span aria-hidden="true">×</span></button>`).join('');
    }
    stack.value = selectedStacks.size === 1 ? [...selectedStacks][0] : 'all';
    if (!document.documentElement.classList.contains('motion-paused')) previous.forEach((rect,c) => {
      if (c.hidden || !c.animate) return;
      const next = c.getBoundingClientRect(); const dx = rect.left-next.left, dy = rect.top-next.top;
      if (dx || dy) c.animate([{translate:`${dx}px ${dy}px`},{translate:'0 0'}],{duration:430,easing:'cubic-bezier(.22,1,.36,1)'});
    });
    count.textContent = `Showing ${shown} of ${projects.length} project${projects.length === 1 ? '' : 's'}`;
    empty.hidden = shown > 0;
    if (save) updateURL();
    document.dispatchEvent(new CustomEvent('portfolio:results', {detail:{count:shown}}));
  }
  function restoreFilters() {
    const params = new URL(location.href).searchParams;
    area = chips.some(c => c.dataset.area === params.get('area')) ? params.get('area') : 'all';
    selectedStacks = new Set(params.getAll('stack').filter(t => [...stack.options].some(o => o.value === t && t !== 'all')));
    search.value = params.get('q') || '';
    filterProjects({save:false});
  }
  function resetFilters() {
    area = 'all'; selectedStacks.clear(); stack.value = 'all'; search.value = '';
    filterProjects();
    search.focus();
  }
  chips.forEach(c => c.addEventListener('click', () => { area = c.dataset.area; filterProjects(); }));
  search.addEventListener('input', () => filterProjects());
  stack.addEventListener('change', () => { selectedStacks = new Set(stack.value === 'all' ? [] : [stack.value]); filterProjects(); });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-stack-chip],[data-remove-stack]'); if (!b) return;
    const tag = b.dataset.stackChip ?? b.dataset.removeStack;
    if (tag === 'all') selectedStacks.clear();
    else if (selectedStacks.has(tag)) selectedStacks.delete(tag); else selectedStacks.add(tag);
    filterProjects();
  });
  document.getElementById('reset-filters').addEventListener('click', resetFilters);
  document.getElementById('empty-reset').addEventListener('click', resetFilters);

  function openProject(id, trigger = null, saveHash = true) {
    const p = projects.find(p => p.id === id);
    if (!p || typeof dialog.showModal !== 'function') return false;
    const wasOpen = dialog.open;
    if (!wasOpen) returnFocus = trigger || document.activeElement;
    activeProject = p.id;
    content.innerHTML = `<div class="dialog-body"><p class="eyebrow">PROJECT ${escape(p.number)} / ${escape(p.categories.join(' · '))}</p><h2 id="dialog-title">${escape(p.title)}</h2><p class="dialog-summary">${escape(p.summary)}</p><dl class="dialog-snapshot"><div><dt>Context</dt><dd>${escape(p.context)}</dd></div><div><dt>Project status</dt><dd>${escape(p.status)}</dd></div></dl>${p.contribution ? `<p class="dialog-contribution"><strong>My contribution:</strong> ${escape(p.contribution)}</p>` : ''}<h3>Approach</h3><ul class="dialog-points">${p.details.map(d => `<li>${escape(d)}</li>`).join('')}</ul><h3>Tools &amp; methods</h3><p class="dialog-contribution">${escape(p.tools)}</p><div class="stack-tags">${p.stack.map(t => `<span>${escape(t)}</span>`).join('')}</div><figure class="dialog-image"><img src="${escape(p.image)}" alt="${escape(p.imageAlt)}" width="800" height="500"><figcaption>${escape(p.imageAlt)}</figcaption></figure><div class="dialog-actions"><a class="button primary" href="${escape(p.href)}">Full case study <span aria-hidden="true">↗</span></a>${p.github ? `<a class="button secondary" href="${escape(p.github)}" target="_blank" rel="noopener noreferrer">Source on GitHub <span aria-hidden="true">↗</span></a>` : ''}</div>${p.resources.length ? `<div class="dialog-resources">${p.resources.map(r => `<a href="${escape(r.href)}" target="_blank" rel="noopener noreferrer">${escape(r.label)}</a>`).join('')}</div>` : ''}</div>`;
    const toolTags = content.querySelector('.stack-tags');
    toolTags.innerHTML = p.stack.map(t => `<button type="button" data-dialog-stack="${escape(t)}" title="Find projects using ${escape(t)}">${escape(t)}</button>`).join('');
    const visible = visibleProjects(p.id);
    const navigation = document.createElement('div'); navigation.className = 'dialog-project-nav';
    navigation.innerHTML = `<button type="button" data-project-step="-1" ${visible.length<2?'disabled':''}>← Previous</button><span role="status">${visible.findIndex(v=>v.id===p.id)+1} / ${visible.length}</span><button type="button" data-project-step="1" ${visible.length<2?'disabled':''}>Next →</button>`;
    content.querySelector('.dialog-body').append(navigation);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector('.dialog-close').focus();
    if (saveHash) {
      const url = new URL(location.href); url.hash = `project/${p.id}`;
      history.replaceState(null, '', url);
    }
    return true;
  }
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-open]');
    if (!trigger || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (openProject(trigger.dataset.open, trigger)) e.preventDefault();
  });
  document.addEventListener('portfolio:filter', e => {
    const detail = e.detail || {};
    area = chips.some(c => c.dataset.area === detail.area) ? detail.area : 'all';
    selectedStacks = new Set((detail.stacks || []).filter(t => [...stack.options].some(o=>o.value===t && t!=='all')));
    stack.value = 'all';
    search.value = detail.query || '';
    filterProjects();
  });
  function visibleProjects(id = activeProject) {
    const visible = projects.filter(p=>!grid.querySelector(`[data-project="${p.id}"]`).hidden);
    return visible.some(p=>p.id===id) ? visible : projects;
  }
  function stepProject(direction) {
    const visible = visibleProjects(); if (visible.length<2) return;
    const next = visible[(visible.findIndex(p=>p.id===activeProject)+direction+visible.length)%visible.length];
    openProject(next.id);
    dialog.querySelector(`[data-project-step="${direction}"]`).focus();
  }
  dialog.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA|SELECT|VIDEO/.test(e.target.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key==='ArrowRight' || e.key==='ArrowLeft') { e.preventDefault(); stepProject(e.key==='ArrowRight'?1:-1); }
  });
  dialog.addEventListener('click', e => {
    const next = e.target.closest('[data-project-step]'); if (next) stepProject(Number(next.dataset.projectStep));
    const tag = e.target.closest('[data-dialog-stack]');
    if (tag) {
      const technology = tag.dataset.dialogStack; dialog.close();
      document.dispatchEvent(new CustomEvent('portfolio:filter',{detail:{stacks:[technology]}}));
      document.getElementById('projects').scrollIntoView({behavior:document.documentElement.classList.contains('motion-paused')?'instant':'smooth'});
      search.focus({preventScroll:true});
    }
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    activeProject = null;
    if (location.hash.startsWith('#project/')) {
      const url = new URL(location.href); url.hash = 'projects';
      history.replaceState(null, '', url);
    }
    if (returnFocus?.isConnected && !returnFocus.closest('[hidden]')) returnFocus.focus();
    else search.focus();
  });
  function restoreHash() {
    const id = location.hash.startsWith('#project/') ? location.hash.slice(9) : null;
    if (id && id !== activeProject) openProject(id, null, false);
    else if (!id && dialog.open) dialog.close();
  }
  window.addEventListener('hashchange', restoreHash);
  window.addEventListener('popstate', () => { restoreFilters(); restoreHash(); });
  restoreFilters();
  restoreHash();
})();
