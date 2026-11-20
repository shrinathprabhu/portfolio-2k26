const nav = document.querySelector('.nav');
const toggle = nav.querySelector('.nav__toggle');
const links = nav.querySelector('.nav__links');
const activeLink = links.querySelector('.active');
const desktop = matchMedia('(min-width: 641px)');

function setOpen(open) {
  links.classList.toggle('open', open);
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  links.inert = !desktop.matches && !open;
}

setOpen(false);
desktop.addEventListener('change', () => {
  const focusWasInMenu = links.contains(document.activeElement);
  setOpen(false);
  if (!desktop.matches && focusWasInMenu) toggle.focus();
});

toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
document.addEventListener('click', (event) => {
  if (!nav.contains(event.target)) setOpen(false);
});
nav.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && links.classList.contains('open')) {
    setOpen(false);
    toggle.focus();
  }
});

function syncNav() {
  nav.classList.toggle('is-floating', window.scrollY > 36);
}

syncNav();
window.addEventListener('scroll', syncNav, { passive: true });

function highlight(link) {
  if (link && desktop.matches) {
    links.style.setProperty('--indicator-x', `${link.offsetLeft}px`);
    links.style.setProperty('--indicator-width', `${link.offsetWidth}px`);
  }
  links.classList.toggle('has-indicator', Boolean(link && desktop.matches));
}

function restoreHighlight() {
  highlight(links.querySelector('a:focus-visible') || activeLink);
}

for (const link of links.querySelectorAll('a')) {
  link.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') highlight(link);
  });
  link.addEventListener('focus', restoreHighlight);
}
links.addEventListener('pointerleave', restoreHighlight);
links.addEventListener('focusout', (event) => {
  if (!links.contains(event.relatedTarget)) highlight(activeLink);
});
new ResizeObserver(restoreHighlight).observe(links);
restoreHighlight();

// Update only the control under the mouse, at most once per rendered frame.
const opticalControls = '.nav__inner, .btn, .case-study__link, .section-head a, .reading-tools, .voice__play';
const opticalMotion = matchMedia(
  '(hover: hover) and (pointer: fine) and (forced-colors: none)'
);
const reducedTransparency = matchMedia('(prefers-reduced-transparency: reduce), (prefers-contrast: more)');
let litControl;
let lightFrame = 0;

function clearLight() {
  if (lightFrame) cancelAnimationFrame(lightFrame);
  lightFrame = 0;
  litControl?.style.removeProperty('--light-x');
  litControl?.style.removeProperty('--light-y');
  litControl?.style.removeProperty('--nav-light-x');
  litControl?.removeAttribute('data-lit');
  litControl = undefined;
}

function moveLight(event) {
  if (event.pointerType !== 'mouse') return;
  const control = event.target.closest(opticalControls);
  if (control !== litControl) {
    clearLight();
    litControl = control;
  }
  if (!control) return;
  if (lightFrame) cancelAnimationFrame(lightFrame);
  lightFrame = requestAnimationFrame(() => {
    lightFrame = 0;
    const { left, top, width, height } = control.getBoundingClientRect();
    if (control.classList.contains('nav__inner')) {
      control.style.setProperty('--nav-light-x', `${event.clientX - left}px`);
      control.setAttribute('data-lit', '');
      return;
    }
    control.style.setProperty('--light-x', `${(event.clientX - left) / width * 100}%`);
    control.style.setProperty('--light-y', `${(event.clientY - top) / height * 100}%`);
  });
}

function syncOpticalMotion() {
  document.removeEventListener('pointermove', moveLight);
  clearLight();
  if (document.documentElement.dataset.motion === 'enabled' && opticalMotion.matches && !reducedTransparency.matches) {
    document.addEventListener('pointermove', moveLight, { passive: true });
  }
}

document.addEventListener('pointerleave', clearLight);
document.addEventListener('motionchange', syncOpticalMotion);
opticalMotion.addEventListener('change', syncOpticalMotion);
reducedTransparency.addEventListener('change', syncOpticalMotion);
syncOpticalMotion();

// ── Blur-up covers ──
// Lazy-loaded covers fade in over their blurred placeholder. Eager (above the
// fold) covers are left alone so they paint as early as possible, and images
// that are already loaded, or that fail, are never hidden.
{
  for (const img of document.querySelectorAll('.lqip img[loading="lazy"]')) {
    if (img.complete) continue;
    img.classList.add('is-loading');
    const reveal = () => img.classList.remove('is-loading');
    img.addEventListener('load', reveal, { once: true });
    img.addEventListener('error', reveal, { once: true });
  }
}
