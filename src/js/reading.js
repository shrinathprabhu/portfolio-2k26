(() => {
  // Use the article body when present and the primary content on other pages.
  const tools = document.querySelector('.reading-tools');
  const main = document.querySelector('main');
  const content = main.querySelector('.blog-post__body') || main;
  const pageTitle = main.querySelector('h1') || main;
  const progress = tools.querySelector('progress');
  const percentage = progress.nextElementSibling;
  const copyLink = tools.querySelector('.reading-tools__copy');
  const copyStatus = copyLink.querySelector('[role="status"]');
  let scheduled = false;
  let feedbackTimer;

  function updateReadingTools() {
    scheduled = false;
    const body = content.getBoundingClientRect();
    const readingLine = Math.min(160, window.innerHeight / 4);
    const distance = Math.max(1, body.height - window.innerHeight + readingLine);
    const value = Math.round(Math.min(1, Math.max(0, (readingLine - body.top) / distance)) * 100);
    if (progress.value !== value) {
      progress.value = value;
      percentage.textContent = `${value}%`;
    }
    const contentEnd = body.bottom + window.scrollY;
    const revealAt = Math.min(100, Math.max(0, contentEnd - window.innerHeight));
    tools.hidden = window.scrollY < revealAt && !tools.contains(document.activeElement);
  }

  function scheduleReadingUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateReadingTools);
  }

  window.addEventListener('scroll', scheduleReadingUpdate, { passive: true });
  window.addEventListener('resize', scheduleReadingUpdate);
  tools.addEventListener('focusout', scheduleReadingUpdate);
  new ResizeObserver(scheduleReadingUpdate).observe(main);
  updateReadingTools();

  tools.querySelector('.reading-tools__top').addEventListener('click', () => {
    if (!pageTitle.hasAttribute('tabindex')) pageTitle.setAttribute('tabindex', '-1');
    pageTitle.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  });

  copyLink.addEventListener('click', async () => {
    clearTimeout(feedbackTimer);
    try {
      const url = document.querySelector('link[rel="canonical"]')?.href || location.href;
      await navigator.clipboard.writeText(url);
      copyStatus.textContent = 'Copied';
    } catch {
      copyStatus.textContent = 'Copy failed';
    }
    feedbackTimer = setTimeout(() => { copyStatus.textContent = 'Copy link'; }, 2200);
  });
})();
