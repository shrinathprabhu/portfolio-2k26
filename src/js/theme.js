(() => {
  const storageKey = 'portfolio-theme';
  const motionKey = 'portfolio-motion';
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const validPreference = (value) => ['light', 'dark', 'system'].includes(value);
  let storageAvailable = true;

  function readPreference(key, values) {
    try {
      const value = localStorage.getItem(key);
      return values.includes(value) ? value : 'system';
    } catch {
      storageAvailable = false;
      return 'system';
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(key, value);
      storageAvailable = true;
    } catch {
      storageAvailable = false;
      // Settings still work for this page when storage is unavailable.
    }
  }

  let preference = readPreference(storageKey, ['light', 'dark', 'system']);
  let motionPreference = readPreference(motionKey, ['enabled', 'disabled', 'system']);
  let syncControls = () => {};
  let activeTransition;
  let fallbackTimer;
  let themeRevision = 0;

  function applyMotion() {
    const enabled = motionPreference === 'system' ? !reducedMotion.matches : motionPreference === 'enabled';
    root.dataset.motion = enabled ? 'enabled' : 'disabled';
    root.dataset.motionPreference = motionPreference;
    if (!enabled) {
      activeTransition?.skipTransition();
      clearTimeout(fallbackTimer);
      delete root.dataset.themeTransition;
    }
    syncControls();
    document.dispatchEvent(new CustomEvent('motionchange', { detail: { enabled, preference: motionPreference } }));
  }

  function applyTheme(animate = false) {
    const theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    const revision = ++themeRevision;
    root.dataset.themePreference = preference;
    syncControls();
    activeTransition?.skipTransition();
    clearTimeout(fallbackTimer);
    delete root.dataset.themeTransition;

    const update = () => {
      // A skipped transition can still call its update after a newer choice.
      if (revision !== themeRevision) return;
      root.dataset.theme = theme;
      for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
        meta.content = theme === 'dark' ? '#0b1417' : '#f7fafb';
        meta.removeAttribute('media');
      }
      document.dispatchEvent(new CustomEvent('themechange', { detail: { theme, preference } }));
    };

    if (!animate || root.dataset.motion === 'disabled' || root.dataset.theme === theme) {
      update();
      return;
    }

    if (typeof document.startViewTransition === 'function') {
      try {
        const transition = document.startViewTransition(update);
        activeTransition = transition;
        transition.ready.catch(() => {}); // Hidden tabs or a newer selection may skip the effect.
        transition.updateCallbackDone.catch(update);
        transition.finished.catch(() => {}).finally(() => {
          if (activeTransition === transition) activeTransition = undefined;
        });
        return;
      } catch {
        // Fall through to color transitions when snapshots are unavailable.
      }
    }

    root.dataset.themeTransition = 'fallback';
    root.getBoundingClientRect(); // Establish the old colors before changing the palette.
    update();
    fallbackTimer = setTimeout(() => { delete root.dataset.themeTransition; }, 320);
  }

  function selectPreference(value) {
    if (!validPreference(value)) return;
    preference = value;
    savePreference(storageKey, preference);
    applyTheme(true);
  }

  // This script runs in <head>, before any stylesheet or page content.
  applyMotion();
  applyTheme();
  system.addEventListener('change', () => {
    if (preference === 'system') applyTheme(true);
  });
  reducedMotion.addEventListener('change', () => {
    if (motionPreference === 'system') applyMotion();
  });
  window.addEventListener('storage', (event) => {
    if (event.key === motionKey || event.key === null) {
      motionPreference = readPreference(motionKey, ['enabled', 'disabled', 'system']);
      applyMotion();
    }
    if (event.key === storageKey || event.key === null) {
      preference = readPreference(storageKey, ['light', 'dark', 'system']);
      applyTheme(true);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const selector = document.querySelector('.theme-selector');
    if (!selector) return;
    const toggle = selector.querySelector('.theme-selector__toggle');
    const panel = selector.querySelector('.theme-selector__panel');
    const options = [...selector.querySelectorAll('input[name="theme"]')];
    const motionToggle = selector.querySelector('.motion-toggle');
    const motionStatus = selector.querySelector('#motion-status');
    const motionReset = selector.querySelector('.motion-reset');
    const navToggle = document.querySelector('.nav__toggle');

    syncControls = () => {
      for (const option of options) option.checked = option.value === preference;
      const label = `Appearance: ${preference[0].toUpperCase()}${preference.slice(1)}`;
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
      const enabled = root.dataset.motion === 'enabled';
      motionToggle.setAttribute('aria-checked', String(enabled));
      motionToggle.querySelector('.motion-toggle__state').textContent = enabled ? 'On' : 'Off';
      motionStatus.textContent = motionPreference === 'system'
        ? 'Following your device setting.'
        : (storageAvailable ? 'Your preference is saved.' : 'Applies to this page only.');
      motionReset.hidden = motionPreference === 'system';
    };

    function setOpen(open, restoreFocus = false) {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) options.find((option) => option.checked)?.focus();
      else if (restoreFocus) toggle.focus();
    }

    toggle.addEventListener('click', () => {
      if (panel.hidden && navToggle?.getAttribute('aria-expanded') === 'true') navToggle.click();
      setOpen(panel.hidden);
    });
    for (const option of options) {
      option.addEventListener('change', () => selectPreference(option.value));
    }
    motionToggle.addEventListener('click', () => {
      motionPreference = root.dataset.motion === 'enabled' ? 'disabled' : 'enabled';
      savePreference(motionKey, motionPreference);
      applyMotion();
    });
    motionReset.addEventListener('click', () => {
      motionPreference = 'system';
      savePreference(motionKey, motionPreference);
      motionToggle.focus();
      applyMotion();
    });
    selector.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false, true);
      }
      if (event.target.matches('input[name="theme"]') && ['Home', 'End'].includes(event.key)) {
        event.preventDefault();
        const option = options[event.key === 'Home' ? 0 : options.length - 1];
        option.focus();
        selectPreference(option.value);
      }
    });
    selector.addEventListener('focusout', (event) => {
      // Clicking a label/SVG can briefly move focus to the document before
      // the browser activates its radio. Let the outside-click handler close
      // the panel in that case so the selection is not swallowed.
      if (event.relatedTarget && !selector.contains(event.relatedTarget)) setOpen(false);
    });
    document.addEventListener('click', (event) => {
      if (!panel.hidden && !selector.contains(event.target)) {
        setOpen(false, panel.contains(document.activeElement));
      }
    });
    syncControls();
    selector.hidden = false;
  }, { once: true });
})();
