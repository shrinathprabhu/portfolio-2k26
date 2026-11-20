// Copy-to-clipboard for code blocks
document.querySelectorAll(".blog-post__body pre").forEach((pre) => {
  const btn = document.createElement("button");
  btn.className = "code-copy";
  btn.setAttribute("aria-label", "Copy code");
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
  pre.style.position = "relative";
  pre.appendChild(btn);
  btn.addEventListener("click", () => {
    const code = pre.querySelector("code");
    navigator.clipboard.writeText(code.textContent).then(() => {
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
      btn.classList.add("copied");
      setTimeout(() => {
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        btn.classList.remove("copied");
      }, 1500);
    });
  });
});

const outline = document.querySelector('.post-outline');
if (outline) {
  const desktopLinks = [...outline.querySelectorAll('.post-outline__desktop a')];
  const mobileLinks = [...outline.querySelectorAll('.post-outline__mobile a')];
  const headings = desktopLinks.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1))));
  const details = outline.querySelector('details');
  const lists = [desktopLinks, mobileLinks].map(links => ({
    links,
    element: links[0].closest('ol'),
  }));
  let sectionTops = [];
  let currentIndex = -1;

  function markSection() {
    const index = sectionTops.findLastIndex(top => top <= window.scrollY + 110);
    if (index === currentIndex) return;
    for (const { links, element } of lists) {
      links[currentIndex]?.removeAttribute('aria-current');
      links[index]?.setAttribute('aria-current', 'location');
      positionRail(element, 'active', links[index]);
    }
    currentIndex = index;
  }

  function measureOutline() {
    sectionTops = headings.map(heading => heading.getBoundingClientRect().top + window.scrollY);
    markSection();
  }

  mobileLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      details.open = false;
      headings[index].focus({ preventScroll: true });
    });
  });
  function positionRail(list, state, link) {
    const visible = Boolean(link?.offsetHeight);
    if (visible) {
      const center = link.offsetTop + link.offsetHeight / 2;
      list.style.setProperty(`--outline-${state}`, `${center}px`);
    }
    list.style.setProperty(`--outline-${state}-visible`, Number(visible));
  }

  const outlineResize = new ResizeObserver(measureOutline);
  outlineResize.observe(document.querySelector('.blog-post'));
  for (const { links, element } of lists) {
    const resizeRail = new ResizeObserver(() => {
      positionRail(element, 'active', links[currentIndex]);
    });
    resizeRail.observe(element);

    let hoveredLink;
    let focusedLink;
    const updatePreview = () => positionRail(element, 'preview', hoveredLink || focusedLink);

    element.addEventListener('pointerover', (event) => {
      if (event.pointerType !== 'mouse') return;
      hoveredLink = event.target.closest('a');
      updatePreview();
    });
    element.addEventListener('pointerleave', () => {
      hoveredLink = null;
      updatePreview();
    });
    element.addEventListener('focusin', (event) => {
      focusedLink = event.target.closest('a:focus-visible');
      updatePreview();
    });
    element.addEventListener('focusout', () => {
      focusedLink = null;
      updatePreview();
    });
  }

  measureOutline();
  window.addEventListener('scroll', markSection, { passive: true });
  window.addEventListener('resize', markSection, { passive: true });
}
