---
title: "Syncing Captions to Audio in the Browser With No Library"
description: "How I built the voice introduction on my homepage: word-level captions driven by audio.currentTime, a precomputed waveform, a native range input for seeking, and nothing downloaded until the visitor presses play."
date: 2026-11-16
postTags: ["posts", "javascript", "accessibility", "performance"]
category: "Frontend Craft"
keywords:
  [
    "audio captions",
    "synchronized captions",
    "HTMLAudioElement",
    "currentTime",
    "requestAnimationFrame",
    "waveform",
    "accessible audio player",
    "word highlighting",
  ]
# image: "/images/audio-captions-sync.png"
featured: true
---

My homepage has a 43 second voice introduction. Press play and a waveform fills in while captions appear phrase by phrase, each word darkening as it is spoken. It is about 170 lines of JavaScript with no dependencies, and it adds nothing to the page until someone asks for it.

To sync captions to audio you need three things: a timestamp for each word, the audio element's `currentTime`, and a loop that compares them. Everything else is detail. Here is the detail.

## 1. Get word timestamps once, offline

The browser does not transcribe anything. I ran the recording through [whisper.cpp](https://github.com/ggml-org/whisper.cpp) on my laptop one time, with word-level output, and committed the result as a small JSON file:

```json
{
  "duration": 42.68,
  "peaks": [0.64, 1.0, 0.43, 0.57],
  "cues": [
    [["Hi,", 0.12], ["I'm", 0.32], ["Shrinath", 0.64], ["Prabhu,", 1.14]],
    [["I've", 6.44], ["been", 6.66], ["building", 6.76], ["zero", 8.12, 1]]
  ]
}
```

Each cue is a caption phrase. Each word is `[text, startSeconds]`, with an optional third value to mark words I want emphasised. The whole file is under 2 KB.

Two cleanups were needed. Speech models mishear names, so I corrected mine by hand. And the word timings were not always increasing, so a script forces each word to start at least 80 ms after the previous one. I chose the phrase breaks myself, at natural pauses, instead of letting a tool wrap at a character count.

## 2. Precompute the waveform

The waveform is not live audio analysis. The same script splits the recording into 72 buckets, takes the RMS loudness of each, normalises to the loudest, and stores the values as `peaks`. In the browser each value becomes the height of one bar.

A Web Audio `AnalyserNode` would need an audio context, extra code, and the user's CPU, to draw something that is identical on every playback. Precomputing it costs 72 numbers.

## 3. Download nothing until play

The trigger is a real link to the MP3:

```html
<a href="/audio/intro.mp3" id="voice-toggle" data-cues="/audio/intro.json">
  Hear my intro · 0:43
</a>
```

Without JavaScript it is a link that opens the audio file. With JavaScript, the script takes over the click. Until that click, the page has made no request for the audio or the captions. The 340 KB recording never touches the load time of a visitor who does not want it.

There is one ordering rule that matters, and it is easy to get wrong:

```js
function start() {
  audio = new Audio(trigger.href);
  audio.play().catch(showError); // inside the click itself
  fetch(trigger.dataset.cues).then(/* build bars and captions */);
}
```

`play()` has to be called synchronously inside the click handler. If you `await` the captions first and then call `play()`, Safari no longer considers it a user-initiated action and rejects it. So audio starts immediately and the captions load in parallel. If the caption request fails, the audio still plays.

## 4. Drive the UI from currentTime

The `timeupdate` event fires only a few times per second, which is fine for a progress label and visibly late for word highlighting. While the audio is playing I use `requestAnimationFrame`, and stop the loop on pause:

```js
function render() {
  const t = audio.currentTime;

  let index = 0;
  while (index + 1 < cues.length && cueStarts[index + 1] <= t) index++;

  if (index !== activeCue) {
    activeCue = index;
    captionEl.textContent = "";
    words = cues[index].map(([text, at, emphasis]) => {
      const word = document.createElement("span");
      word.textContent = text;
      if (emphasis) word.className = "em";
      captionEl.appendChild(word);
      return { word, at };
    });
  }

  for (const { word, at } of words) word.classList.toggle("is-said", at <= t);
}
```

The audio element is the single source of truth. There is no separate timer to drift, and seeking needs no special case: the next frame reads the new `currentTime` and draws the right phrase.

The DOM is only rebuilt when the phrase changes. Per frame, the work is toggling a class on a handful of spans. The waveform is the same idea: it only touches the DOM when the number of played bars changes.

All text goes in through `textContent`, never `innerHTML`.

## 5. Seeking with a real range input

I did not write drag handling. A native `<input type="range">` is stretched over the waveform with `opacity: 0`:

```html
<div class="voice__wave">
  <div class="voice__bars" aria-hidden="true"></div>
  <input class="voice__seek" type="range" min="0" max="43" step="0.1"
         aria-label="Seek within the introduction" />
</div>
```

That one element gives me mouse, touch, and keyboard seeking, plus the correct slider role for assistive technology. The bars are decoration on top of a control the browser already implements properly.

## 6. Accessibility decisions

- **The live captions are `aria-hidden`.** A screen reader announcing each phrase would talk over the recording.
- **The full transcript is on the page**, in a `<details>` element under the player. It is available without pressing play, which is what an audio-only recording needs.
- **Reduced motion is respected.** The colour transitions collapse to instant changes when the visitor prefers reduced motion.
- **The hero text does not depend on the audio.** The recording is a second way to get the introduction, not the only one.

## 7. End on an action

The recording ends with "let's talk". When the `ended` event fires, the caption area becomes a link to the contact page and the contact card further down gets a brief highlight. The player hands the visitor to the next step instead of just stopping.

## What I would not do

I would not autoplay, animate captions letter by letter, or draw a live spectrum. Each one costs attention or CPU and tells the listener nothing. The interaction earns its place by being optional, fast, and finished.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. You can try the player on the [homepage](https://shrinath.me/)._
