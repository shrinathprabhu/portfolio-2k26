/**
 * Usage statistics, sent to OwlEye Analytics (owleye.dev).
 *
 * The SDK is cookie-free, stores nothing in the browser and drops URL queries
 * and fragments. It records page views and time on page by itself; this file
 * adds Web Vitals, page-load numbers and a few named events.
 *
 * Every event carries ids, hosts, counts and durations that come from this
 * site's own markup. Nothing a visitor types, and no error message.
 *
 * Only shrinath.me reports. Anywhere else (localhost, previews) the same code
 * runs with requests off. `localStorage.owl = "debug"` makes the SDK log what
 * it sends or skips, and why.
 */
const script = document.querySelector("script[data-owl-id]");
const SITE_ID = script.dataset.owlId;
const SDK = script.dataset.owlSdk;

let debug = false;
try {
  debug = localStorage.getItem("owl") === "debug";
} catch {
  // Storage blocked
}

const config = {
  captureCampaigns: true, // utm_source, utm_medium and utm_campaign only
  // Left on (the default), the SDK sends nothing at all from a browser with
  // Global Privacy Control set: Brave, Firefox and others.
  respectGlobalPrivacyControl: false,
  mock: location.hostname !== "shrinath.me",
  debug,
};

const notFound = document.querySelector(".page-404") !== null;
const section = pageSection();

let analytics;
// Events fired before the SDK has loaded
let pending = [];

/** One named event. Fields that are `undefined` are left out. */
function track(name, fields) {
  const records = clean(fields);
  if (analytics) analytics.track(name, records);
  else if (pending && pending.length < 50) pending.push([name, records]);
}

function clean(fields = {}) {
  const out = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null) continue;
    out[key] = typeof value === "string" ? value.slice(0, 80) : value;
  }
  return out;
}

function pageSection() {
  if (notFound) return "not_found";
  const [first, second] = location.pathname.split("/").filter(Boolean);
  if (!first) return "home";
  return first === "blog" && second ? "post" : first;
}

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

/** Where on the page an element sits: a case study's id, or nav / footer / content. */
function areaOf(element) {
  const study = element.closest(".case-study[id]");
  if (study) return study.id;
  if (element.closest("nav")) return "nav";
  if (element.closest("footer")) return "footer";
  return "content";
}

// ── SDK: page views, Web Vitals, console rules ──
async function start() {
  try {
    const [{ useAnalytics }, { trackPerf }] = await Promise.all([
      import(`${SDK}/index.js`),
      import(`${SDK}/performance.js`),
    ]);
    analytics = useAnalytics(SITE_ID, config);
    analytics.setGlobalRecords({ section });
    trackPerf(SITE_ID, config).observeVitals();
    for (const [name, records] of pending) analytics.track(name, records);
  } catch {
    // Blocked or offline: the site works the same without it
  }
  pending = null;
  if (!analytics) return;

  // Rules are the larger half of the SDK and nothing waits on them.
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
  idle(() => {
    import(`${SDK}/rules.js`)
      .then(({ trackRules }) => trackRules(SITE_ID, { ...config, enrichRule }))
      .catch(() => {});
  });
}

/** Extra fields on every rule set up in the OwlEye console. */
function enrichRule(_rule, { element }) {
  const link = element.closest("a[href]");
  return clean({
    section,
    area: areaOf(element),
    to: link && link.host !== location.host ? hostOf(link.href) : undefined,
  });
}

// ── Links: outbound, email, resume download ──
function onLinkClick(event) {
  const target = event.target instanceof Element ? event.target : null;
  const link = target?.closest("a[href]");
  if (!link) return;
  const area = areaOf(link);

  if (link.protocol === "mailto:") {
    track("email_click", { area });
  } else if (link.pathname.endsWith(".pdf") && link.host === location.host) {
    track("resume_download", { area });
  } else if (/^https?:$/.test(link.protocol) && link.host !== location.host) {
    track("outbound_click", { host: hostOf(link.href), area });
  }
}

// Capture phase, so a handler that stops propagation cannot hide a click.
document.addEventListener("click", onLinkClick, true);
// Middle click opens a link in a new tab without a click event.
document.addEventListener(
  "auxclick",
  (event) => {
    if (event.button === 1) onLinkClick(event);
  },
  true,
);

// ── Blog ──
document.addEventListener(
  "click",
  (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const copy = target.closest(".code-copy");
    if (copy) {
      const code = copy.closest("pre")?.querySelector("code");
      const language = code?.className.match(/language-([\w-]+)/)?.[1];
      track("code_copied", { language });
    } else if (target.closest("#blog-load-more-btn")) {
      track("blog_load_more");
    }
  },
  true,
);

// How far down a post people read: 25, 50, 75 and 100% of the article body.
const postBody = document.querySelector(".blog-post__body");
if (postBody) {
  const opened = performance.now();
  const milestones = [25, 50, 75, 100];
  let ticking = false;

  const measure = () => {
    ticking = false;
    const rect = postBody.getBoundingClientRect();
    const percent = ((window.innerHeight - rect.top) / rect.height) * 100;
    while (milestones.length && percent >= milestones[0]) {
      track("post_progress", {
        percent: milestones.shift(),
        seconds: Math.round((performance.now() - opened) / 1000),
      });
    }
    if (!milestones.length) window.removeEventListener("scroll", onScroll);
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(measure);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ── Case studies: one event each, once it has held the middle of the screen for a second ──
const studies = document.querySelectorAll(".case-study[id]");
if (studies.length && "IntersectionObserver" in window) {
  const timers = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        clearTimeout(timers.get(target));
        if (!isIntersecting) continue;
        timers.set(
          target,
          setTimeout(() => {
            observer.unobserve(target);
            track("case_study_viewed", { id: target.id });
          }, 1000),
        );
      }
    },
    { rootMargin: "-45% 0px -45% 0px" },
  );
  studies.forEach((study) => observer.observe(study));
}

// ── 404 page and its game ──
if (notFound) {
  // `internal` means a link on this site is broken; `from` says which page has it.
  let internal = false;
  let from;
  try {
    const referrer = new URL(document.referrer);
    internal = referrer.host === location.host;
    from = internal ? referrer.pathname : hostOf(document.referrer);
  } catch {
    // No referrer
  }
  track("not_found", { internal, from });

  let rounds = 0;
  document.addEventListener("game:start", () => track("game_started"));
  document.addEventListener("game:over", ({ detail }) => {
    rounds++;
    track("game_over", { score: detail.score, best: detail.best, round: rounds });
  });
}

// ── Printing (the resume, mostly) ──
window.addEventListener("beforeprint", () => track("page_printed"));

// ── Page load: what the browser measured for this navigation ──
function reportLoad() {
  const [nav] = performance.getEntriesByType("navigation");
  if (!nav || !nav.loadEventEnd) return;
  const resources = performance.getEntriesByType("resource");
  const bytes = resources.reduce((sum, r) => sum + r.transferSize, nav.transferSize);
  track("page_load", {
    nav_type: nav.type,
    protocol: nav.nextHopProtocol || undefined,
    dom_interactive_ms: Math.round(nav.domInteractive),
    dom_ready_ms: Math.round(nav.domContentLoadedEventEnd),
    load_ms: Math.round(nav.loadEventEnd),
    requests: resources.length + 1,
    transfer_kb: Math.round(bytes / 102.4) / 10,
    from_cache: nav.transferSize === 0 && nav.decodedBodySize > 0,
  });
}
// loadEventEnd is filled in only after the load handlers return.
if (document.readyState === "complete") setTimeout(reportLoad);
else window.addEventListener("load", () => setTimeout(reportLoad), { once: true });

// ── Uncaught errors, by type and place, never by message. Three per page is enough to see a bad deploy. ──
let reported = 0;
function reportError(kind, error, file, line) {
  if (reported >= 3) return;
  const name = error instanceof Error ? error.name : typeof error;
  if (name === "AbortError") return;
  reported++;
  track("js_error", {
    kind,
    name,
    file: file?.split("/").pop().split("?")[0] || undefined,
    line: line || undefined,
  });
}
window.addEventListener("error", (e) => {
  if (/ResizeObserver loop/.test(e.message)) return;
  reportError("error", e.error, e.filename, e.lineno);
});
window.addEventListener("unhandledrejection", (e) => reportError("rejection", e.reason));

start();
