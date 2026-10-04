(() => {
  'use strict';
  const root=document.documentElement;
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)') || {matches:false};
  const fine=window.matchMedia?.('(pointer: fine)') || {matches:false};
  const paused=()=>root.classList.contains('motion-paused') || reduced.matches || document.hidden;
  const controllers=[];
  document.addEventListener('portfolio:motion',()=>controllers.forEach(c=>c()));
  document.addEventListener('visibilitychange',()=>controllers.forEach(c=>c()));
  reduced.addEventListener?.('change',()=>controllers.forEach(c=>c()));

  // Keyboard access to search, without interfering with inputs or open dialogs.
  window.addEventListener('keydown',e=>{
    if(e.key!=='/' || e.ctrlKey || e.metaKey || e.altKey || document.querySelector('dialog[open]') || document.activeElement?.closest('input,textarea,select,[contenteditable="true"]')) return;
    const search=document.getElementById('project-search'); if(!search)return;
    e.preventDefault();document.getElementById('projects').scrollIntoView({behavior:paused()?'instant':'smooth'});search.focus({preventScroll:true});
  });

  // Toolkit labels use the same filter state as the catalogue and dialogs.
  const projects=window.PORTFOLIO_PROJECTS || [];
  const allTags=[...new Set(projects.flatMap(p=>p.stack))];
  document.querySelectorAll('#skills .tags span').forEach(label=>{
    const text=label.textContent.toLowerCase();
    const tags=allTags.filter(t=>{
      const tag=t.toLowerCase();
      if(tag==='c' || tag==='c++') return text==='c / c++' || text===tag;
      return text===tag || (tag.length>2 && text.split(/\s*\/\s*/).some(part=>part===tag || part.startsWith(tag+' ')));
    });
    if(!tags.length)return;
    label.classList.add('linked-skill');label.tabIndex=0;label.setAttribute('role','button');label.title=`Explore projects using ${tags.join(' or ')}`;
    const activate=()=>{document.dispatchEvent(new CustomEvent('portfolio:filter',{detail:{stacks:tags}}));document.getElementById('projects').scrollIntoView({behavior:paused()?'instant':'smooth'});document.getElementById('project-search').focus({preventScroll:true});};
    label.addEventListener('click',activate);label.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});
  });

  // One moving highlight follows the existing active-section navigation.
  const nav=document.getElementById('navigation');
  if(nav){
    const highlight=document.createElement('span');highlight.className='nav-highlight';highlight.setAttribute('aria-hidden','true');nav.prepend(highlight);
    let navFrame=0;
    const draw=()=>{navFrame=0;const a=nav.querySelector('a[aria-current]');if(!a||!nav.offsetWidth){highlight.style.opacity='0';return;}highlight.style.width=`${a.offsetWidth+14}px`;highlight.style.height=`${a.offsetHeight+10}px`;highlight.style.transform=`translate(${a.offsetLeft-7}px,${a.offsetTop-5}px)`;highlight.style.opacity='1';};
    const schedule=()=>{if(!navFrame)navFrame=requestAnimationFrame(draw);};
    if('MutationObserver'in window)new MutationObserver(schedule).observe(nav,{subtree:true,attributes:true,attributeFilter:['aria-current']});
    window.addEventListener('resize',schedule);document.querySelector('.menu-toggle')?.addEventListener('click',schedule);draw();
  }

  // Derived catalogue totals count up only once, when seen.
  document.querySelectorAll('[data-count]').forEach(node=>{
    const target=Number(node.dataset.count);let frame=0,done=false;
    const finish=()=>{cancelAnimationFrame(frame);node.textContent=target;done=true;};
    const run=()=>{if(done)return;if(paused()){finish();return;}const start=performance.now();const tick=t=>{const p=Math.min(1,(t-start)/750);node.textContent=Math.round(target*(1-Math.pow(1-p,3)));if(p<1&&!paused())frame=requestAnimationFrame(tick);else finish();};frame=requestAnimationFrame(tick);};
    controllers.push(()=>{if(paused())finish();});
    if(!paused()&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){run();observer.disconnect();}},{threshold:.2});observer.observe(node);}else finish();
  });

  // A small terminal line cycles through the portfolio's actual disciplines.
  const typing=document.getElementById('typing-text');
  if(typing){
    const words=['networks & security','embedded systems','software development','privacy-aware research'];let word=0,char=0,deleting=false,timer=null,visible=false;
    const stop=()=>{clearTimeout(timer);timer=null;};
    const tick=()=>{timer=null;if(!visible||paused())return;const text=words[word];char+=deleting?-1:1;typing.textContent=text.slice(0,char);let delay=deleting?30:65;if(!deleting&&char===text.length){deleting=true;delay=1700;}else if(deleting&&char===0){deleting=false;word=(word+1)%words.length;delay=260;}timer=setTimeout(tick,delay);};
    const sync=()=>{stop();if(paused()){typing.textContent=words[0];word=0;char=0;deleting=false;}else if(visible)timer=setTimeout(tick,90);};
    controllers.push(sync);
    if('IntersectionObserver'in window){new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync();}).observe(typing);}else typing.textContent=words[0];
  }

  // Fine-pointer effects remain gentle, and stop fully with the motion control.
  if(fine.matches){
    let activeCard=null,activeButton=null;
    const reset=()=>{document.querySelectorAll('[data-tilt]').forEach(c=>{for(const p of ['--tilt-x','--tilt-y','--spot-x','--spot-y'])c.style.removeProperty(p);});if(activeButton)activeButton.style.translate='';};
    document.addEventListener('pointermove',e=>{
      if(paused()||e.pointerType==='touch')return;
      const card=e.target.closest('[data-tilt]');
      if(activeCard&&activeCard!==card){activeCard.style.removeProperty('--tilt-x');activeCard.style.removeProperty('--tilt-y');}activeCard=card;
      if(card){const r=card.getBoundingClientRect();if(r.width&&r.height){const px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--tilt-x',`${-py*4}deg`);card.style.setProperty('--tilt-y',`${px*4}deg`);card.style.setProperty('--spot-x',`${e.clientX-r.left}px`);card.style.setProperty('--spot-y',`${e.clientY-r.top}px`);}}
      const button=e.target.closest('.hero-actions .button,.filter-chip,.technology-chip,.header-contact,.contact-links a');
      if(activeButton&&activeButton!==button)activeButton.style.translate='';activeButton=button;
      if(button){const r=button.getBoundingClientRect();button.style.translate=`${Math.max(-3,Math.min(3,(e.clientX-r.left-r.width/2)*.08))}px ${Math.max(-2,Math.min(2,(e.clientY-r.top-r.height/2)*.08))}px`;}
    },{passive:true});
    document.documentElement.addEventListener('pointerleave',reset);controllers.push(()=>{if(paused())reset();});
  }

  // Decorative network motion; no live data or performance claims are implied.
  function ambientNetwork(section,cap){
    if(!section || reduced.matches || !('IntersectionObserver'in window) || typeof window.CanvasRenderingContext2D!=='function')return;
    const canvas=document.createElement('canvas');canvas.className='ambient-network';canvas.setAttribute('aria-hidden','true');section.classList.add('ambient-section');section.prepend(canvas);
    const ctx=canvas.getContext('2d');if(!ctx){canvas.remove();return;}
    let width=0,height=0,nodes=[],visible=false,frame=0,last=0,mx=-1000,my=-1000;
    const draw=()=>{ctx.clearRect(0,0,width,height);ctx.lineWidth=.7;nodes.forEach((a,i)=>{nodes.slice(i+1).forEach(b=>{const distance=Math.hypot(a.x-b.x,a.y-b.y);if(distance<125){ctx.strokeStyle=`rgba(48,102,71,${(1-distance/125)*.2})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}});const distance=Math.hypot(a.x-mx,a.y-my);if(distance<145){ctx.strokeStyle=`rgba(48,102,71,${(1-distance/145)*.28})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mx,my);ctx.stroke();}ctx.fillStyle='rgba(48,102,71,.35)';ctx.beginPath();ctx.arc(a.x,a.y,1.6,0,Math.PI*2);ctx.fill();});};
    const size=()=>{const r=section.getBoundingClientRect(),scale=Math.min(window.devicePixelRatio||1,2);width=r.width;height=Math.min(r.height,cap);canvas.width=width*scale;canvas.height=height*scale;canvas.style.height=`${height}px`;ctx.setTransform(scale,0,0,scale,0,0);nodes=Array.from({length:Math.min(42,Math.max(12,Math.round(width*height/26000)))},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25}));draw();};
    const tick=time=>{frame=0;if(!visible||paused())return;if(time-last>40){last=time;nodes.forEach(a=>{a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>width)a.vx*=-1;if(a.y<0||a.y>height)a.vy*=-1;});draw();}frame=requestAnimationFrame(tick);};
    const sync=()=>{cancelAnimationFrame(frame);frame=0;if(visible&&!paused())frame=requestAnimationFrame(tick);else draw();};controllers.push(sync);
    new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync();}).observe(section);
    section.addEventListener('pointermove',e=>{const r=section.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;},{passive:true});section.addEventListener('pointerleave',()=>{mx=my=-1000;});
    if('ResizeObserver'in window)new ResizeObserver(size).observe(section);else window.addEventListener('resize',size);size();
  }
  ambientNetwork(document.getElementById('projects'),680);ambientNetwork(document.getElementById('contact'),480);

  // A small portrait shift gives depth without moving interactive targets.
  const portrait=document.querySelector('.portrait-frame');
  if(portrait){let frame=0;const draw=()=>{frame=0;if(paused()){portrait.style.removeProperty('--portrait-shift');return;}const r=portrait.getBoundingClientRect();portrait.style.setProperty('--portrait-shift',`${Math.max(-8,Math.min(8,(r.top+r.height/2-window.innerHeight/2)*-.025))}px`);};const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw);};window.addEventListener('scroll',schedule,{passive:true});controllers.push(draw);}

  // Original experience photos open in a keyboard-accessible gallery.
  const photos=[...document.querySelectorAll('.experience-photo')];
  if(photos.length){
    const gallery=document.createElement('dialog');gallery.id='media-dialog';gallery.className='media-dialog';gallery.setAttribute('aria-labelledby','media-caption');
    gallery.innerHTML='<button type="button" class="media-close" aria-label="Close image">×</button><div class="media-view"><img alt=""><p id="media-caption"></p><div class="media-navigation"><button type="button" data-media-step="-1">← Previous</button><span role="status"></span><button type="button" data-media-step="1">Next →</button></div><a class="media-original" target="_blank" rel="noopener noreferrer">Open original image ↗</a></div>';document.body.append(gallery);
    let group=[],index=0,returnFocus=null;
    const fill=()=>{const photo=group[index],original=photo.querySelector('img');const image=gallery.querySelector('img');image.src=original.src;image.alt=original.alt;gallery.querySelector('#media-caption').textContent=photo.querySelector('figcaption')?.textContent||original.alt;gallery.querySelector('.media-navigation span').textContent=`${index+1} / ${group.length}`;gallery.querySelector('.media-original').href=original.src;gallery.querySelectorAll('[data-media-step]').forEach(b=>b.disabled=group.length<2);};
    const step=direction=>{index=(index+direction+group.length)%group.length;fill();};
    photos.forEach(photo=>{const frame=photo.querySelector('.photo-frame');if(!frame)return;const button=document.createElement('button');button.className='expand-photo';button.type='button';button.setAttribute('aria-label',`Enlarge image: ${photo.querySelector('img').alt}`);button.innerHTML='<span aria-hidden="true">↗</span>';frame.append(button);button.addEventListener('click',()=>{if(!gallery.showModal)return;const container=photo.closest('.experience-story');group=photos.filter(p=>p.closest('.experience-story')===container);index=group.indexOf(photo);returnFocus=button;fill();gallery.showModal();gallery.querySelector('.media-close').focus();});});
    gallery.querySelector('.media-close').addEventListener('click',()=>gallery.close());gallery.addEventListener('click',e=>{const b=e.target.closest('[data-media-step]');if(b)step(Number(b.dataset.mediaStep));if(e.target===gallery){const r=gallery.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)gallery.close();}});
    gallery.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();step(e.key==='ArrowLeft'?-1:1);}});gallery.addEventListener('close',()=>returnFocus?.focus());
  }

  // Merge validated local repository metadata while retaining curated links.
  async function syncRepositories(){
    const host=document.getElementById('extra-repos');if(!host||typeof window.fetch!=='function')return;
    try{const response=await fetch('repos.json');if(!response.ok)return;const repos=await response.json();if(!Array.isArray(repos))return;const known=new Set([...host.querySelectorAll('a')].map(a=>a.href));
      for(const repo of repos){if(!repo||typeof repo.name!=='string'||!/^[A-Za-z0-9_.-]+$/.test(repo.name)||repo.fork||['habit-tracker','MrCtrlAltDefeat','MrCtrlAltDefeat.github.io'].includes(repo.name)||repo.html_url!==`https://github.com/MrCtrlAltDefeat/${repo.name}`||known.has(repo.html_url))continue;const a=document.createElement('a');a.className='repo-mini';a.href=repo.html_url;a.target='_blank';a.rel='noopener noreferrer';const title=document.createElement('b');title.textContent=`${repo.name} ↗`;a.append(title);if(typeof repo.description==='string'){const description=document.createElement('span');description.textContent=repo.description;a.append(description);}host.append(a);known.add(repo.html_url);}
    }catch{/* Existing links remain usable without a network response. */}
  }
  syncRepositories();
})();
