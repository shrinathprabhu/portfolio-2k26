/**
 * Voice introduction player.
 *
 * Nothing is downloaded until the visitor asks for it: the MP3 and the
 * caption/waveform JSON are both fetched on the first click. Captions are
 * driven by audio.currentTime inside requestAnimationFrame while playing.
 * Without JavaScript the trigger stays a plain link to the MP3.
 */
(() => {
  const trigger = document.getElementById('voice-toggle');
  const panel = document.getElementById('voice');
  if (!trigger || !panel) return;

  const playBtn = panel.querySelector('.voice__play');
  const barsEl = panel.querySelector('.voice__bars');
  const seek = panel.querySelector('.voice__seek');
  const timeEl = panel.querySelector('.voice__time');
  const speed = panel.querySelector('.voice__speed');
  const rates = [1, 1.25, 1.5, 2];
  const captionEl = panel.querySelector('.voice__caption');
  const label = trigger.querySelector('.voice-btn__label');
  const cta = document.getElementById('contact-cta');
  const transcript = document.querySelector('.voice-transcript');
  const idleLabel = label.textContent;

  let audio = null;
  let cues = [];
  let cueStarts = [];
  let bars = [];
  let words = [];
  let activeCue = -1;
  let litBars = -1;
  let duration = 43;
  let frame = 0;

  const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  // The trigger is a link for no-JS visitors; with JS it behaves as a button.
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });
  trigger.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
  playBtn.addEventListener('click', toggle);
  speed.addEventListener('click', () => {
    const next = rates[(rates.indexOf(audio.playbackRate) + 1) % rates.length];
    audio.playbackRate = next;
    speed.textContent = `${next}×`;
    speed.setAttribute('aria-label', `Playback speed ${next}×. Change playback speed.`);
  });

  function toggle() {
    if (!audio) return start();
    if (audio.paused) {
      if (audio.ended) audio.currentTime = 0;
      audio.play().catch(showError);
    } else {
      audio.pause();
    }
  }

  function start() {
    audio = new Audio(trigger.href);
    // play() must run inside the click itself, or Safari rejects it
    audio.play().catch(showError);

    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');

    audio.addEventListener('play', () => setState(true));
    audio.addEventListener('playing', () => transcript.classList.add('is-available'), { once: true });
    audio.addEventListener('pause', () => setState(false));
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('seeked', render);
    audio.addEventListener('error', showError);
    audio.addEventListener('loadedmetadata', () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    });

    seek.addEventListener('keydown', (event) => {
      const direction = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[event.key];
      if (!direction) return;
      event.preventDefault();
      seek.value = Math.min(duration, Math.max(0, audio.currentTime + direction * 5));
      seek.dispatchEvent(new Event('input'));
    });
    seek.addEventListener('input', () => {
      audio.currentTime = Number(seek.value);
      panel.classList.remove('is-ended');
      render();
    });

    fetch(trigger.dataset.cues)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        cues = data.cues;
        cueStarts = cues.map((cue) => cue[0][1]);
        if (!Number.isFinite(audio.duration)) setDuration(data.duration);
        bars = data.peaks.map((peak) => {
          const bar = document.createElement('span');
          bar.style.height = `${Math.round(peak * 100)}%`;
          barsEl.appendChild(bar);
          return bar;
        });
        render();
      })
      .catch(() => {
        // Audio still plays; the transcript below covers the captions.
      });
  }

  function setDuration(value) {
    duration = value;
    seek.max = value.toFixed(1);
  }

  function setState(playing) {
    panel.classList.toggle('is-playing', playing);
    trigger.classList.toggle('is-playing', playing);
    if (playing) panel.classList.remove('is-ended');
    label.textContent = playing ? 'Pause intro' : idleLabel;
    playBtn.setAttribute('aria-label', playing ? 'Pause introduction' : 'Play introduction');
    cancelAnimationFrame(frame);
    if (playing) loop();
    else render();
  }

  function loop() {
    render();
    frame = requestAnimationFrame(loop);
  }

  function render() {
    const t = audio.currentTime;

    seek.value = t;
    const total = clock(Math.round(duration));
    const elapsed = clock(t);
    const time = `${elapsed} / ${total}`;
    if (timeEl.textContent !== time || !seek.hasAttribute('aria-valuetext')) {
      seek.setAttribute('aria-valuetext', `${elapsed} of ${total}`);
      timeEl.textContent = time;
    }

    // Waveform: touch the DOM only when the played bar count changes
    const lit = Math.round((t / duration) * bars.length);
    if (lit !== litBars) {
      bars.forEach((bar, i) => bar.classList.toggle('is-on', i < lit));
      litBars = lit;
    }

    if (!cues.length || panel.classList.contains('is-ended')) return;

    // Captions: last cue whose first word has started
    let index = 0;
    while (index + 1 < cues.length && cueStarts[index + 1] <= t) index++;
    if (index !== activeCue) {
      activeCue = index;
      captionEl.textContent = '';
      words = cues[index].map(([text, at, emphasis]) => {
        const word = document.createElement('span');
        word.textContent = text;
        if (emphasis) word.className = 'em';
        captionEl.appendChild(word);
        return { word, at };
      });
    }
    for (const { word, at } of words) word.classList.toggle('is-said', at <= t);
  }

  function onEnded() {
    panel.classList.add('is-ended');
    playBtn.setAttribute('aria-label', 'Replay introduction');
    activeCue = -1;
    const total = clock(Math.round(duration));
    timeEl.textContent = `${total} / ${total}`;
    // Hand over from the introduction to the contact action
    captionEl.textContent = '';
    const link = document.createElement('a');
    link.href = '/contact/';
    link.textContent = "Let's talk →";
    captionEl.appendChild(link);
    captionEl.removeAttribute('aria-hidden');
    if (cta) {
      cta.classList.add('is-nudged');
      setTimeout(() => cta.classList.remove('is-nudged'), 4000);
    }
  }

  function showError() {
    if (audio && !audio.error && !audio.paused) return;
    timeEl.textContent = 'Audio unavailable';
  }
})();
