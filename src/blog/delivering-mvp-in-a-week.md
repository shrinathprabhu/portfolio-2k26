---
title: "Delivering an MVP in a Week: A Multilingual Farmer Learning Platform"
description: "How I built a production mobile-first webapp supporting 5 Indian languages with auto-switching video in under a week, and what I learned about scoping, speed, and the difference between fast and reckless."
date: 2026-05-01
postTags: ["posts", "career", "frontend", "startup"]
category: "Shipping"
keywords:
  [
    "MVP",
    "rapid prototyping",
    "multilingual",
    "i18n",
    "Indian languages",
    "React",
    "Nest.js",
    "Firestore",
    "Video.js",
    "startup engineering",
  ]
image: "/images/agrostar-mvp.png"
---

As soon as I joined the company as a tempory resource, I received the requirements. A week later, the VP was using the app. He offered me a full-time retainer role based on what he saw.

This is the story of building a production mobile-first learning platform for [Agrostar](https://agrostar.in) ([Agrostar Gold](https://gold.agrostar.in)), an Indian agtech company, in a week. The app allowed farmers to log in, attend live or recorded sessions on modern farming techniques, and access content in 5 Indian languages with auto-switching audio and subtitles.

## The constraints

The designs were already ready. The user database already existed (the sales team handled farmer registration, I just needed to sync from their database). The scope was genuinely narrow: sign in, browse sessions, watch videos, like, and comment. No search, no recommendations, no social features, no offline mode.

The tight scope was not laziness, it was the reason the project succeeded. Every feature that was not in that list was a feature I did not build. No search meant no search indexing. No recommendations meant no ML pipeline. No offline mode meant no service worker caching strategy. Each missing feature saved half a day to a full day of work.

## The stack decisions

Every stack decision optimized for one variable: how fast can I ship something I already know?

React for the frontend, I knew it, the designs mapped cleanly to components, and mobile-first responsive layouts are straightforward in React.

Nest.js with Express and TypeScript for the backend, I had used this exact combination before at [Hashbinary](https://hashbinary.com). No learning curve, no surprises.

Firestore for the database, the farmer data was synced from Agrostar's marketing sheets to Firestore daily. Firestore's real-time listeners meant the app automatically reflected new data without polling. The schema was pre-decided by the lead engineer, I just consumed it.

Video.js for pre-recorded sessions, battle-tested, well-documented, and handles multi-track audio and subtitle switching natively.

There was no architectural novelty in this stack. That was the point.

## The multilingual challenge

The app supported 5 Indian languages beyond English and Hindi, each with its own script. Every label, button, and piece of UI text needed to render correctly in each script, which meant testing not just translation accuracy but layout integrity.

The video content was the harder problem. Each recorded session had multiple audio tracks and subtitle files. When a user switched their language preference, the app needed to switch the video's audio track and subtitle track simultaneously without restarting playback. Video.js handles this through its TextTrack and AudioTrack APIs, but wiring it to a global language preference that persists across sessions (stored in Firestore, so it syncs if the user logs in on a different device) required careful state management.

Most videos were available in only one or two languages. The UI needed to filter these correctly, showing only videos available in the user's selected language, while still allowing discovery of content in other languages.

## What I learned about speed

Building fast and building recklessly are different things. The week long timeline worked because of four deliberate decisions, not because I cut corners.

First, I used tools I already knew. Zero learning curve meant zero wasted time on documentation and tutorials. This is the opposite of the typical developer instinct ("this is a great opportunity to try that new framework"). New tools are for projects with flexible timelines.

Second, I built the demoable surface first. The VP was going to evaluate the app by using it, not by reading the code. So I built the screens and flows in the order he would experience them: login → browse sessions → play a video → switch language. The backend edge cases (error states, rate limiting, data validation) came after the demo path was solid.

Third, I killed the scope aggressively. When the conversation drifted toward "what if we also added..." I asked "does a farmer need this to watch a video in Marathi on Friday?" If the answer was no, it went to the backlog.

Fourth, the designs were ready before I started. This is the single biggest accelerator for frontend development. When a developer has to design and build simultaneously, the build takes 3-5x longer because every component involves a design decision, a stakeholder review, and a revision cycle. Pre-approved designs meant I was translating Figma to code, not inventing interfaces.

## The outcome

The VP saw the app on Friday, used it for sometime, and offered me a full-time retainer role. That validation was meaningful, a senior executive at a well-funded agtech company saw few days of my work and decided he wanted me permanently.

The app was the fastest I have ever shipped anything to production. It was not the most architecturally interesting thing I have built, and it was not the most technically challenging. But it was the project that taught me the most about what actually matters when you are shipping: scope discipline, tool familiarity, and the ability to say no to everything that does not serve the immediate goal.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. More at [shrinath.me/work](https://shrinath.me/work/)._
