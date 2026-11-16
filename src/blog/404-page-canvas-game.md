---
title: "I Put a Runner Game on My 404 Page in About 300 Lines of Canvas"
description: "A walkthrough of the tiny endless runner on this site's 404 page: fixed-step physics, a forgiving hitbox, crisp rendering on high-DPI screens, and why it uses no framework and no assets."
date: 2026-08-19
postTags: ["posts", "javascript", "canvas", "frontend"]
category: "Frontend Craft"
keywords:
  [
    "404 page",
    "canvas game",
    "JavaScript game loop",
    "requestAnimationFrame",
    "devicePixelRatio",
    "collision detection",
    "vanilla JavaScript",
  ]
# image: "/images/404-canvas-game.png"
---

A 404 page is the one page nobody chose to visit. Mine says "Shipped too fast, forgot to deploy this page" and then offers a small endless runner: a blocky figure, obstacles coming from the right, Space or a tap to jump. You can try it at [any URL that does not exist](/this-page-does-not-exist).

The whole game is one file of roughly 320 lines with no dependencies and no image assets. Here are the parts that were more interesting than I expected.

## Crisp pixels on high-DPI screens

A canvas has two sizes: the size of its drawing buffer and the size it is displayed at. If both are 480 by 160 on a display with a device pixel ratio of 2, the browser stretches the buffer and everything looks soft.

The fix is to make the buffer larger and scale the drawing context back down, so the game logic can keep thinking in 480 by 160:

```js
const dpr = window.devicePixelRatio || 1;
const W = 480, H = 160;
canvas.width = W * dpr;
canvas.height = H * dpr;
ctx.scale(dpr, dpr);
```

CSS controls the displayed size. Every coordinate in the rest of the file is in logical units.

## Three states and one function

The game is a state machine with three states: `idle`, `playing`, and `dead`. There is exactly one input, and it means something different in each state, so every input source calls the same `jump()` function:

```js
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();
    jump();
  }
});
canvas.addEventListener("click", jump);
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  jump();
}, { passive: false });
```

`jump()` starts the game from `idle`, resets everything from `dead`, and applies an upward velocity if the player is on the ground. Keyboard, mouse, and touch stay identical because none of them contain any logic.

Two small things here. `e.preventDefault()` on Space stops the page from scrolling. The touch listener is registered with `passive: false`, because a passive listener is not allowed to call `preventDefault()`, and without it a tap can also trigger a delayed click and a double jump.

## Physics in four lines

There is no physics engine. Gravity is a constant added to vertical velocity every frame, and the ground is a clamp:

```js
player.vy += 0.5;
player.y += player.vy;
if (player.y >= GROUND_Y) {
  player.y = GROUND_Y;
  player.vy = 0;
  player.grounded = true;
}
```

A jump sets `vy` to `-8.5`. Those two numbers, 0.5 and 8.5, are the entire feel of the game. I tuned them by playing, not by calculating.

## Difficulty that ramps without levels

Score is derived from elapsed frames, and both speed and spawn rate are derived from score:

```js
score = Math.floor(frame / 6);
speed = 3.5 + score * 0.008;
nextSpawn = 55 + Math.random() * 45 - Math.min(score * 0.15, 20);
```

The `Math.min(..., 20)` cap matters. Without it the gap between obstacles keeps shrinking until a jump is physically impossible, and losing to an unwinnable layout feels like a bug rather than a challenge.

## A hitbox that lies in the player's favour

Collision is a plain rectangle overlap test, with one adjustment:

```js
const m = 3; // forgiveness margin
if (
  player.x + player.w - m > o.x &&
  player.x + m < o.x + o.w &&
  player.y > o.y + m
) {
  state = "dead";
}
```

The hitbox is three pixels smaller than the sprite on each side. Players do not notice when a near miss is counted as a miss. They absolutely notice when they die without visibly touching anything. Being generous here is the cheapest way to make a game feel fair.

## Events instead of coupling

When a run starts or ends, the game dispatches `game:start` and `game:over` custom events on `document`, with the score in `detail`. The game does not know or care who is listening. That keeps it a self-contained file that anything else on the page can react to without editing it.

## Respecting the theme

The canvas cannot read CSS custom properties while drawing, so the script checks `prefers-color-scheme` once and picks a palette that matches the rest of the site in light or dark mode.

## What it cost

One script, loaded with `defer`, on one page that is excluded from search indexing. It adds nothing to any other page. The honest limitation is that the loop advances one step per animation frame, so the game runs faster on a 120 Hz display than on a 60 Hz one. A fixed timestep with an accumulator would fix that, and it is the first thing I would change.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. More at [shrinath.me/work](https://shrinath.me/work/)._
