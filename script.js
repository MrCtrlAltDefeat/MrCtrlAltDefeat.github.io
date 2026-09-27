const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.querySelector('#year').textContent=new Date().getFullYear();
const motionButton=document.querySelector('#motion-toggle');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=motionPreference.matches;
function updateMotion(){document.documentElement.classList.toggle('motion-paused',motionPaused);if(motionButton){motionButton.setAttribute('aria-pressed',String(motionPaused));motionButton.textContent=motionPreference.matches?'Reduced motion':motionPaused?'Resume motion':'Pause motion';motionButton.disabled=motionPreference.matches;}}
motionButton?.addEventListener('click',()=>{motionPaused=!motionPaused;updateMotion();});
motionPreference.addEventListener('change',()=>{motionPaused=motionPreference.matches;updateMotion();});updateMotion();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}}},{threshold:.12});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));}

// Keep the existing repository-sync workflow useful without replacing curated projects.
async function loadAdditionalRepos(){
  const known=new Set(['MrCtrlAltDefeat','MrCtrlAltDefeat.github.io']);
  try{
    const response=await fetch('./repos.json');
    if(!response.ok)return;
    const repos=await response.json();
    if(!Array.isArray(repos))return;
    const additions=repos.filter(repo=>typeof repo.name==='string'&&!known.has(repo.name)&&!repo.fork&&repo.html_url===`https://github.com/MrCtrlAltDefeat/${repo.name}`);
    if(!additions.length)return;
    const fragment=document.createDocumentFragment();
    for(const repo of additions){const link=document.createElement('a');link.className='repo-mini';link.href=repo.html_url;link.target='_blank';link.rel='noopener noreferrer';const title=document.createElement('b');title.textContent=repo.name+' ↗';link.append(title);if(typeof repo.description==='string'&&repo.description){const description=document.createElement('span');description.textContent=repo.name==='habit-tracker'?'A habit-tracking system built with Python.':repo.description;link.append(description);}fragment.append(link);}
    document.querySelector('#extra-repos').replaceChildren(fragment);
  }catch{/* The static repository link remains available offline. */}
}
if(location.protocol!=='file:'&&document.querySelector('#extra-repos'))loadAdditionalRepos();


// One shared highlight tracks the current section, including long sections.
const navLinks = Array.from(navigation.querySelectorAll('a'));
const trackedSections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
const highlight = document.createElement('span');
highlight.className = 'nav-highlight';
highlight.setAttribute('aria-hidden', 'true');
navigation.prepend(highlight);
let navFrame = 0;
function updateNavigation() {
  navFrame = 0;
  const threshold = Math.min(window.innerHeight * .3, 220);
  let active = null;
  for (const section of trackedSections) {
    if (section.getBoundingClientRect().top <= threshold) active = section;
  }
  for (const link of navLinks) {
    if ((document.body.classList.contains('case-page') && link.hash === '#projects') || (active && link.hash === '#' + active.id)) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  const current = navigation.querySelector('a[aria-current]');
  if (!current || !navigation.offsetWidth) { highlight.style.opacity = '0'; return; }
  highlight.style.width = current.offsetWidth + 'px';
  highlight.style.height = current.offsetHeight + 'px';
  highlight.style.transform = `translate(${current.offsetLeft}px, ${current.offsetTop}px)`;
  highlight.style.opacity = '1';
}
function scheduleNavigation() { if (!navFrame) navFrame = requestAnimationFrame(updateNavigation); }
addEventListener('scroll', scheduleNavigation, { passive: true });
addEventListener('resize', scheduleNavigation);
menu.addEventListener('click', scheduleNavigation);
new ResizeObserver(scheduleNavigation).observe(navigation);
document.fonts?.ready.then(scheduleNavigation);
updateNavigation();
