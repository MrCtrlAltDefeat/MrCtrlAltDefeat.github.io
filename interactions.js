(() => {
  'use strict';
  const root = document.documentElement;
  const motionMedia = window.matchMedia?.('(prefers-reduced-motion: reduce)') || {matches:false};
  const motionButton = document.getElementById('motion-toggle');
  let savedMotion = false;
  try { savedMotion = localStorage.getItem('portfolio-motion-paused') === 'true'; } catch {}
  let paused = motionMedia.matches || savedMotion;
  let revealObserver = null;
  function setMotion(value, save = false) {
    paused = motionMedia.matches || value;
    root.classList.toggle('motion-paused', paused);
    if (motionButton) {
      motionButton.setAttribute('aria-pressed', String(paused));
      motionButton.disabled = motionMedia.matches;
      motionButton.innerHTML = motionMedia.matches ? 'Reduced motion enabled' : paused ? '<span aria-hidden="true">▷</span> Enable animations' : '<span aria-hidden="true">Ⅱ</span> Pause animations';
    }
    if (paused) {
      revealObserver?.disconnect();
      root.classList.remove('reveal-enabled');
      document.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('is-visible'));
    }
    if (save) { savedMotion = value; try { localStorage.setItem('portfolio-motion-paused', String(value)); } catch {} }
    document.dispatchEvent(new CustomEvent('portfolio:motion', {detail:{paused}}));
  }
  motionButton?.addEventListener('click', () => setMotion(!paused, true));
  motionMedia.addEventListener?.('change', () => setMotion(savedMotion));
  setMotion(paused);

  if (!paused && 'IntersectionObserver' in window) {
    root.classList.add('reveal-enabled');
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, {threshold:0,rootMargin:'0px 0px -20px 0px'});
    document.querySelectorAll('[data-reveal]').forEach(e => revealObserver.observe(e));
  }

  const opening = document.getElementById('opening');
  const replay = document.getElementById('replay-intro');
  const progressBar = document.getElementById('reading-progress');
  const sentence = opening?.querySelector('.opening-sentence');
  const greeting = opening?.querySelector('.opening-greeting');
  const rest = opening?.querySelector('.opening-rest');
  const clamp = value => Math.min(1, Math.max(0, value));
  let letters = [];
  if (rest) {
    const original = rest.textContent;
    rest.setAttribute('aria-hidden', 'true');
    greeting.setAttribute('aria-hidden', 'true');
    rest.replaceChildren();
    letters = Array.from(original, char => {
      const letter = document.createElement('span'); letter.textContent = char; rest.append(letter); return letter;
    });
    if (location.hash && location.hash !== '#home' && location.hash !== '#opening') opening.hidden = true;
  }
  const sections = [...document.querySelectorAll('main>section[id]')];
  const navLinks = [...document.querySelectorAll('#navigation a')];
  let frame = 0;
  function renderScroll() {
    frame = 0;
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progressBar) progressBar.style.transform = `scaleX(${clamp(window.scrollY / scrollable)})`;
    if (opening && !opening.hidden) {
      const travelled = -opening.getBoundingClientRect().top;
      const progress = clamp(travelled / (Math.max(1, window.innerHeight) * 1.05));
      const reveal = paused ? 1 : clamp((progress - .04) / .88);
      sentence.style.transform = 'none'; greeting.style.transform = 'none';
      const box = sentence.getBoundingClientRect(); const hi = greeting.getBoundingClientRect();
      const dx = box.left + box.width / 2 - (hi.left + hi.width / 2);
      const dy = box.top + box.height / 2 - (hi.top + hi.height / 2);
      const settle = paused ? 1 : clamp(progress * 3);
      greeting.style.transform = `translate(${dx * (1-settle)}px, ${dy * (1-settle)}px) scale(${1 + .55 * (1-settle)})`;
      letters.forEach((letter, i) => { letter.style.opacity = paused ? 1 : clamp((reveal * (letters.length + 7) - i) / 7); });
      opening.classList.toggle('intro-complete', progress > .9 || paused);
    }
    let active = null;
    sections.forEach(s => { if (s.getBoundingClientRect().top <= 150) active = s.id; });
    navLinks.forEach(a => {
      const selected = a.getAttribute('href') === `#${active}`;
      a.classList.toggle('nav-active', selected);
      if (selected) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(renderScroll); };
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule);
  document.addEventListener('portfolio:motion', schedule);
  document.fonts?.ready.then(schedule);
  replay?.addEventListener('click', () => {
    if (!opening) return;
    opening.hidden = false;
    const url = new URL(location.href); url.hash = 'opening'; history.replaceState(null, '', url);
    opening.querySelector('.intro-skip').focus({preventScroll:true});
    window.scrollTo({top:0,behavior:paused?'instant':'smooth'});
    schedule();
  });
  renderScroll();

  const explorer = document.getElementById('engineering-explorer');
  const projects = window.PORTFOLIO_PROJECTS;
  if (!explorer || !Array.isArray(projects)) return;
  const domains = {
    networks: {area:'Networks & Security',title:'Networks & security',index:'01 / CONNECT & SECURE',description:'I like understanding how the infrastructure keeps connected systems secure, from a self-hosted home lab to privacy-aware research.',tools:['Proxmox VE','Linux','Docker','Wi-Fi']},
    software: {area:'Software Development',title:'Software development',index:'02 / BUILD & EXPERIMENT',description:'Full-stack applications, browser tools, and concurrent systems: projects that turn code into something people can use.',tools:['Next.js','FastAPI','PostgreSQL','JavaScript','POSIX threads']},
    embedded: {area:'Embedded Systems',title:'Embedded systems',index:'03 / SENSE & PROCESS',description:'Projects that connect sensing, real-time processing, and embedded programming, from an ECG simulation to an acoustic sensing design.',tools:['ESP32','FreeRTOS','Arduino','C / C++']}
  };
  let activeDomain = 'networks';
  const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function chooseDomain(id) {
    const domain = domains[id]; if (!domain) return;
    activeDomain = id; explorer.dataset.domain = id;
    explorer.querySelector('.circuit-caption span:last-child').textContent = `${domain.index.slice(0,2)} / 03`;
    explorer.querySelectorAll('[data-domain-button]').forEach(b => {
      const selected = b.dataset.domainButton === id;
      b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected));
    });
    document.getElementById('domain-index').textContent = domain.index;
    document.getElementById('domain-title').textContent = domain.title;
    document.getElementById('domain-description').textContent = domain.description;
    document.getElementById('domain-tools').innerHTML = domain.tools.map(t=>`<span>${escape(t)}</span>`).join('');
    const matches = projects.filter(p=>p.categories.includes(domain.area));
    document.getElementById('domain-projects').innerHTML = matches.slice(0,2).map(p=>`<a class="domain-project" href="${escape(p.href)}" data-open="${escape(p.id)}"><img src="${escape(p.image)}" alt="" width="80" height="60" loading="lazy"><span><b>${escape(p.title)}</b><small>${escape(p.tools)}</small></span><i aria-hidden="true">↗</i></a>`).join('');
    document.getElementById('domain-explore').innerHTML = `Explore ${matches.length} projects <span aria-hidden="true">→</span>`;
    const panel = explorer.querySelector('.domain-content');
    if (!paused && typeof panel.animate === 'function') panel.animate([{opacity:.5,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:230,easing:'ease-out'});
  }
  explorer.querySelectorAll('[data-domain-button]').forEach(b => b.addEventListener('click',()=>chooseDomain(b.dataset.domainButton)));
  document.getElementById('domain-explore').addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('portfolio:filter',{detail:{area:domains[activeDomain].area}}));
    document.getElementById('projects').scrollIntoView({behavior:paused?'instant':'smooth',block:'start'});
    document.getElementById('project-search').focus({preventScroll:true});
  });
  chooseDomain(activeDomain);
})();
