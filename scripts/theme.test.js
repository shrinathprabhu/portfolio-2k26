import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../src/js/theme.js', import.meta.url), 'utf8');

function fixture({ theme, motion, dark = false, reduced = false, blocked = false, transitions = false } = {}) {
  const element = (props = {}) => ({
    handlers: {}, attributes: {},
    addEventListener(type, callback) { this.handlers[type] = callback; },
    setAttribute(name, value) { this.attributes[name] = value; },
    focus() {},
    ...props,
  });
  const root = { dataset: {}, getBoundingClientRect() {} };
  const storage = new Map([['portfolio-theme', theme], ['portfolio-motion', motion]]);
  const system = element({ matches: dark });
  const reduce = element({ matches: reduced });
  const options = ['light', 'dark', 'system'].map(value => element({ value, checked: false }));
  const toggle = element();
  const panel = element({ hidden: true });
  const state = { textContent: '' };
  const motionToggle = element({ querySelector: () => state });
  const status = { textContent: '' };
  const reset = element();
  const selector = element({
    querySelector: (name) => ({
      '.theme-selector__toggle': toggle,
      '.theme-selector__panel': panel,
      '.motion-toggle': motionToggle,
      '#motion-status': status,
      '.motion-reset': reset,
    })[name],
    querySelectorAll: () => options,
    contains: node => [selector, toggle, panel, motionToggle, reset, ...options].includes(node),
  });
  const meta = { content: '', removeAttribute() {} };
  const document = element({
    documentElement: root,
    querySelectorAll: () => [meta],
    querySelector: name => name === '.theme-selector' ? selector : null,
    dispatchEvent() {},
  });
  const window = element({ matchMedia: query => query.includes('color-scheme') ? system : reduce });
  const pending = [];
  if (transitions) document.startViewTransition = update => {
    let finish;
    const transition = {
      ready: Promise.resolve(),
      updateCallbackDone: Promise.resolve(),
      finished: new Promise(resolve => { finish = resolve; }),
      skipped: false,
      skipTransition() { this.skipped = true; },
      update,
      finish: () => finish(),
    };
    pending.push(transition);
    return transition;
  };
  runInNewContext(source, {
    document, window,
    localStorage: {
      getItem(key) { if (blocked) throw Error('blocked'); return storage.get(key) ?? null; },
      setItem(key, value) { if (blocked) throw Error('blocked'); storage.set(key, value); },
    },
    CustomEvent: class {}, setTimeout: () => 1, clearTimeout() {},
  });
  document.handlers.DOMContentLoaded();
  return {
    root, system, reduce, storage, window, selector, panel, toggle,
    motionToggle, reset, status, meta, pending,
    select: value => options.find(option => option.value === value).handlers.change(),
  };
}

test('defaults follow device theme and reduced motion; explicit choices win', () => {
  for (const dark of [false, true]) for (const reduced of [false, true]) {
    const defaults = fixture({ dark, reduced });
    assert.equal(defaults.root.dataset.theme, dark ? 'dark' : 'light');
    assert.equal(defaults.root.dataset.motion, reduced ? 'disabled' : 'enabled');
    for (const theme of ['light', 'dark']) for (const motion of ['enabled', 'disabled']) {
      const saved = fixture({ theme, motion, dark, reduced });
      assert.equal(saved.root.dataset.theme, theme);
      assert.equal(saved.root.dataset.motion, motion);
    }
  }
});

test('selecting a mode updates the page, browser color, and persisted choice', () => {
  const f = fixture();
  f.select('dark');
  assert.equal(f.root.dataset.theme, 'dark');
  assert.equal(f.meta.content, '#0b1417');
  assert.equal(f.storage.get('portfolio-theme'), 'dark');
  assert.equal(f.root.dataset.themeTransition, 'fallback');
  f.select('light');
  assert.equal(f.root.dataset.theme, 'light');
  f.select('system');
  f.system.matches = true;
  f.system.handlers.change();
  assert.equal(f.root.dataset.theme, 'dark');
  assert.equal(f.storage.get('portfolio-theme'), 'system');
});

test('a label temporarily losing focus does not close the panel before selection', () => {
  const f = fixture();
  f.toggle.handlers.click();
  f.selector.handlers.focusout({ relatedTarget: null });
  assert.equal(f.panel.hidden, false);
  f.select('dark');
  assert.equal(f.root.dataset.theme, 'dark');
  f.selector.handlers.focusout({ relatedTarget: {} });
  assert.equal(f.panel.hidden, true);
});

test('manual motion override persists and can return to live device settings', () => {
  const f = fixture({ reduced: true });
  f.motionToggle.handlers.click();
  assert.equal(f.root.dataset.motion, 'enabled');
  assert.equal(f.storage.get('portfolio-motion'), 'enabled');
  assert.equal(f.reset.hidden, false);
  f.reduce.handlers.change();
  assert.equal(f.root.dataset.motion, 'enabled');
  f.motionToggle.handlers.click();
  assert.equal(f.root.dataset.motion, 'disabled');
  assert.equal(f.storage.get('portfolio-motion'), 'disabled');
  f.reset.handlers.click();
  assert.equal(f.storage.get('portfolio-motion'), 'system');
  assert.equal(f.reset.hidden, true);
  f.reduce.matches = false;
  f.reduce.handlers.change();
  assert.equal(f.root.dataset.motion, 'enabled');
});

test('disabled motion switches instantly, including when a transition is active', () => {
  const f = fixture({ transitions: true });
  f.select('dark');
  assert.equal(f.pending.length, 1);
  f.motionToggle.handlers.click();
  assert.equal(f.pending[0].skipped, true);
  f.select('light');
  f.pending[0].update();
  assert.equal(f.root.dataset.theme, 'light');
  assert.equal(f.pending.length, 1);
  assert.equal(f.root.dataset.themeTransition, undefined);
});

test('rapid selections cannot apply an outdated view-transition callback', () => {
  const f = fixture({ transitions: true });
  f.select('dark');
  f.select('light');
  f.pending[0].update();
  assert.equal(f.root.dataset.theme, 'light');
  assert.equal(f.pending[0].skipped, true);
  f.select('dark');
  f.pending[1].update();
  assert.equal(f.root.dataset.theme, 'dark');
});

test('storage changes synchronize settings and clearing restores device defaults', () => {
  const f = fixture({ reduced: true });
  f.storage.set('portfolio-theme', 'dark');
  f.storage.set('portfolio-motion', 'enabled');
  f.window.handlers.storage({ key: null });
  assert.equal(f.root.dataset.theme, 'dark');
  assert.equal(f.root.dataset.motion, 'enabled');
  f.storage.clear();
  f.window.handlers.storage({ key: null });
  assert.equal(f.root.dataset.themePreference, 'system');
  assert.equal(f.root.dataset.motion, 'disabled');
});

test('invalid or unavailable storage leaves controls usable', () => {
  for (const blocked of [false, true]) {
    const f = fixture({ theme: 'invalid', motion: 'invalid', blocked });
    assert.equal(f.root.dataset.themePreference, 'system');
    assert.equal(f.root.dataset.motionPreference, 'system');
    f.select('dark');
    f.motionToggle.handlers.click();
    assert.equal(f.root.dataset.theme, 'dark');
    assert.equal(f.root.dataset.motion, 'disabled');
    assert.equal(f.status.textContent, blocked ? 'Applies to this page only.' : 'Your preference is saved.');
  }
});
