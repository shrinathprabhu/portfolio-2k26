(() => {
  const stats = document.querySelector('.stats');
  const allowRolling = matchMedia('(prefers-reduced-motion: no-preference) and (forced-colors: none)');
  if (!stats || !allowRolling.matches || !window.IntersectionObserver || !Element.prototype.animate) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.intersectionRatio < 0.25) return;
    observer.disconnect();
    // Start only once frames are actually rendering. A renderer that never
    // advances time (background tab, screenshot or preview tool) keeps the
    // real numbers instead of a reel frozen on zero.
    requestAnimationFrame(() => requestAnimationFrame(roll));
  }, { threshold: 0.25 });

  function roll() {
    if (!allowRolling.matches) return;

    const animations = Array.from(stats.querySelectorAll('.stat-digit'), (digit, index) => {
      const value = Number(digit.textContent);
      if (value === 0) return null;
      const reel = document.createElement('span');
      reel.className = 'stat-digit__reel';
      reel.dataset.reel = Array.from({ length: value + 1 }, (_, number) => number).join('\n');
      // At rest the reel shows the final digit, so nothing reads zero if the
      // animation is cancelled or never runs.
      const end = `translateY(-${100 * value / (value + 1)}%)`;
      reel.style.transform = end;

      const viewport = document.createElement('span');
      viewport.className = 'stat-digit__window';
      viewport.setAttribute('aria-hidden', 'true');
      viewport.append(reel);
      digit.append(viewport);
      digit.classList.add('is-rolling');

      // No start delay: a delayed roll would sit on zero until it began.
      // The stagger comes from slightly different durations instead.
      const animation = reel.animate([
        { transform: 'translateY(0)' },
        { transform: end },
      ], {
        duration: 680 + index * 45,
        easing: 'cubic-bezier(0.22, 0.7, 0.28, 1)',
      });

      function restoreDigit() {
        digit.classList.remove('is-rolling');
        viewport.remove();
      }
      animation.finished.then(restoreDigit, restoreDigit);
      return animation;
    }).filter(Boolean);

    function stopIfNeeded() {
      if (!allowRolling.matches) animations.forEach(animation => animation.cancel());
    }
    allowRolling.addEventListener('change', stopIfNeeded);
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      allowRolling.removeEventListener('change', stopIfNeeded);
    });
  }

  observer.observe(stats);
})();
