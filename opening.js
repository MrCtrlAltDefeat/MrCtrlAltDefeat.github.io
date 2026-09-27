(() => {
  const opening = document.querySelector('#opening');
  if (!opening) return;
  if (location.hash && location.hash !== '#home') { opening.remove(); return; }
  const sentence = opening.querySelector('.opening-sentence');
  const greeting = sentence.firstElementChild;
  const rest = opening.querySelector('.opening-rest');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const panel = document.createElement('div');
  panel.className = 'opening-panel';
  opening.append(panel);
  panel.append(sentence);
  const skip = document.createElement('a');
  skip.className = 'intro-skip';
  skip.href = '#about';
  skip.textContent = 'Skip introduction ↓';
  panel.append(skip);
  opening.classList.add('scroll-opening');
  const original = rest.textContent;
  rest.setAttribute('aria-hidden', 'true');
  sentence.setAttribute('aria-label', 'Hi' + original);
  rest.replaceChildren();
  const letters = Array.from(original, char => {
    const span = document.createElement('span');
    span.textContent = char;
    rest.append(span);
    return span;
  });
  let frame = 0;
  const clamp = value => Math.min(1, Math.max(0, value));
  const render = () => {
    frame = 0;
    const viewport = window.innerHeight;
    const travelled = -opening.getBoundingClientRect().top;
    const progress = clamp(travelled / (viewport * 1.05));
    const reveal = clamp((progress - .04) / .88);
    // Measure the untransformed inline layout so the first word begins centered.
    sentence.style.transform = 'none';
    greeting.style.transform = 'none';
    const box = sentence.getBoundingClientRect();
    const hi = greeting.getBoundingClientRect();
    const dx = box.left + box.width / 2 - (hi.left + hi.width / 2);
    const dy = box.top + box.height / 2 - (hi.top + hi.height / 2);
    const settle = clamp(progress * 3);
    greeting.style.transform = `translate(${dx * (1-settle)}px, ${dy * (1-settle)}px) scale(${1 + (motion.matches ? 0 : .55 * (1-settle))})`;
    letters.forEach((letter, index) => {
      const visible = clamp((reveal * (letters.length + 7) - index) / 7);
      letter.style.opacity = visible;
    });
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  document.fonts?.ready.then(schedule);
  render();
})();
