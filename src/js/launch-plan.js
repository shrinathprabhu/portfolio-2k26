/**
 * /launch-plan/: tabs, the 15–31 Oct calendar, task ticks, copy buttons and
 * the scoreboard. Ticks, scoreboard numbers and the open tab are kept in this
 * browser's localStorage only, and the page works the same when it's blocked.
 */
(() => {
  const root = document.querySelector(".lp");
  if (!root) return;

  const store = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Storage blocked
      }
    },
  };

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
  const LAUNCH_DAY = 20;

  // ── Sticky offsets: the site nav sits above the tab bar ──
  const siteNav = document.querySelector(".nav");
  const tabBar = root.querySelector("nav.tabs");
  const navHeight = () => (siteNav ? siteNav.offsetHeight : 0);
  function measure() {
    root.style.setProperty("--lp-nav-h", `${navHeight()}px`);
    root.style.setProperty("--lp-tabs-h", `${tabBar.offsetHeight}px`);
  }
  measure();
  window.addEventListener("resize", measure, { passive: true });

  // ── Tabs ──
  const tabs = [...tabBar.querySelectorAll("button[data-tab]")];
  const panels = [...root.querySelectorAll("section.panel")];

  function scrollToTabs() {
    const top = tabBar.offsetTop - navHeight();
    if (window.scrollY > top) window.scrollTo({ top, behavior: motion });
  }

  function show(id, { scroll = true } = {}) {
    if (!panels.some((panel) => panel.id === id)) id = "plan";
    tabs.forEach((tab) => {
      const selected = tab.dataset.tab === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== id;
    });
    store.set("owl-tab", id);

    // Keep the selected tab visible when the bar scrolls sideways
    const selected = tabs.find((tab) => tab.dataset.tab === id);
    const { scrollLeft, clientWidth } = tabBar;
    if (
      selected.offsetLeft < scrollLeft ||
      selected.offsetLeft + selected.offsetWidth > scrollLeft + clientWidth
    ) {
      tabBar.scrollTo({ left: selected.offsetLeft - 16, behavior: motion });
    }
    if (scroll) scrollToTabs();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      show(tab.dataset.tab);
      history.replaceState(null, "", `#${tab.dataset.tab}`);
    });
    tab.addEventListener("keydown", (event) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (!step) return;
      event.preventDefault();
      const next = tabs[(index + step + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });

  // ── Days ──
  function goToDay(day) {
    if (day === LAUNCH_DAY) {
      show("launch");
      history.replaceState(null, "", "#launch");
      return;
    }
    const block = document.getElementById(`day-${day}`);
    if (!block) return;
    show("days", { scroll: false });
    history.replaceState(null, "", `#day-${day}`);
    requestAnimationFrame(() => {
      block.scrollIntoView({ behavior: motion, block: "start" });
      block.classList.remove("flash");
      void block.offsetWidth; // restart the animation
      block.classList.add("flash");
    });
  }

  root.querySelectorAll("[data-goto]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goToDay(Number(link.dataset.goto));
    });
  });

  root.querySelectorAll("[data-show]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show(link.dataset.show);
      history.replaceState(null, "", `#${link.dataset.show}`);
    });
  });

  // Today, in the viewer's own time zone
  const now = new Date();
  const today =
    now.getFullYear() === 2026 && now.getMonth() === 9 ? now.getDate() : null;
  const firstDay = 15;
  const lastDay = 31;
  if (today && today >= firstDay && today <= lastDay) {
    root.querySelector(`.cal__day[data-goto="${today}"]`)?.classList.add("is-today");
  }
  const todayButton = root.querySelector("#jump-today");
  if (todayButton) {
    if (now < new Date(2026, 9, firstDay)) {
      todayButton.textContent = "Jump to day one";
      todayButton.addEventListener("click", () => goToDay(firstDay));
    } else if (today && today <= lastDay) {
      todayButton.addEventListener("click", () => goToDay(today));
    } else {
      todayButton.hidden = true;
    }
  }

  // ── Ticks and progress ──
  const groups = [...root.querySelectorAll("[data-day]")];
  const overall = root.querySelector("#cal-overall");

  function updateProgress() {
    let doneAll = 0;
    let totalAll = 0;
    groups.forEach((group) => {
      const boxes = group.querySelectorAll("input[type=checkbox]");
      const done = [...boxes].filter((box) => box.checked).length;
      const total = boxes.length;
      doneAll += done;
      totalAll += total;

      const count = group.querySelector(".count");
      if (count) {
        count.textContent = `${done}/${total} done`;
        count.classList.toggle("all", total > 0 && done === total);
      }
      const cell = root.querySelector(`.cal__day[data-goto="${group.dataset.day}"]`);
      if (cell) {
        cell.querySelector(".cal__prog b").style.width = total
          ? `${(done / total) * 100}%`
          : "0";
        cell.classList.toggle("is-done", total > 0 && done === total);
        cell.setAttribute(
          "aria-label",
          `${cell.dataset.label}: ${done} of ${total} tasks done`,
        );
      }
    });
    if (overall) overall.textContent = `${doneAll} of ${totalAll} tasks done`;
  }

  root.querySelectorAll(".slot input[type=checkbox]").forEach((box) => {
    if (store.get(`owl-cb-${box.id}`) === "1") box.checked = true;
    box.addEventListener("change", () => {
      store.set(`owl-cb-${box.id}`, box.checked ? "1" : "0");
      updateProgress();
    });
  });
  updateProgress();

  // ── Highlight {{blanks}}, keep the raw text for copying ──
  const escape = (text) =>
    text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  root.querySelectorAll("pre.copytext").forEach((pre) => {
    const raw = pre.textContent;
    pre.dataset.raw = raw;
    pre.innerHTML = escape(raw).replace(/\{\{(.*?)\}\}/g, "<mark>{{$1}}</mark>");
  });

  // ── Copy buttons ──
  root.querySelectorAll(".post").forEach((post) => {
    const button = post.querySelector(".copy");
    const pre = post.querySelector("pre.copytext");
    if (!button || !pre) return;
    button.addEventListener("click", () => {
      const copied = () => {
        button.textContent = "Copied";
        button.classList.add("done");
        setTimeout(() => {
          button.textContent = "Copy";
          button.classList.remove("done");
        }, 1600);
      };
      const selectInstead = () => {
        const range = document.createRange();
        range.selectNodeContents(pre);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        button.textContent = "Selected, press Ctrl/Cmd+C";
      };
      try {
        navigator.clipboard.writeText(pre.dataset.raw).then(copied, selectInstead);
      } catch {
        selectInstead();
      }
    });
  });

  // ── Scoreboard: one row per night, 15–31 Oct ──
  const body = root.querySelector("#kpi-body");
  if (body) {
    const columns = ["xf", "rk", "ov", "sv", "lv", "su", "cv", "pd"];
    const rows = [{ id: "start", label: "Thu 15 (start)", preset: { xf: 635, rk: 80 } }];
    for (let day = firstDay; day <= lastDay; day++) {
      const weekday = new Date(2026, 9, day).toLocaleDateString("en-GB", {
        weekday: "short",
      });
      rows.push({ id: String(day), label: `${weekday} ${day}${day === LAUNCH_DAY ? " (launch)" : ""}` });
    }
    rows.push({
      id: "target",
      label: "Target, 30–31 Oct",
      target: true,
      preset: { xf: 1200, rk: 280, pd: 3 },
    });

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      if (row.target) tr.className = "is-target";
      const name = document.createElement("td");
      name.textContent = row.label;
      tr.appendChild(name);
      columns.forEach((column) => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.inputMode = "numeric";
        input.id = `kpi-${row.id}-${column}`;
        input.setAttribute("aria-label", `${row.label}, ${column}`);
        const saved = store.get(`owl-${input.id}`);
        if (saved !== null) input.value = saved;
        else if (row.preset && row.preset[column] !== undefined) input.value = row.preset[column];
        input.addEventListener("input", () => store.set(`owl-${input.id}`, input.value));
        td.appendChild(input);
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  }

  // ── First view ──
  const hash = location.hash.slice(1);
  const dayMatch = hash.match(/^day-(\d{1,2})$/);
  if (dayMatch) goToDay(Number(dayMatch[1]));
  else show(hash || store.get("owl-tab") || "plan", { scroll: false });
})();
