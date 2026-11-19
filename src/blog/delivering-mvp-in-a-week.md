---
title: "The VP Used It on Friday: Scope Is the Only Speed Hack"
description: "A production learning app for farmers, in several Indian languages, built in one week. None of the speed came from typing faster. It came from four decisions about scope, made before and during the build."
date: 2026-05-01
postTags: ["posts", "shipping", "product", "decision-making"]
category: "Shipping"
keywords:
  [
    "MVP in a week",
    "scoping an MVP",
    "how to ship fast",
    "scope discipline",
    "multilingual web app",
    "startup engineering",
  ]
image: "/images/blog/delivering-mvp-in-a-week.png"
imageFallback: "/images/agrostar-mvp.png"
---

I joined [AgroStar](https://agrostar.in), an Indian agtech company, as a temporary resource. The requirements arrived on day one. On Friday the VP was using the app, and he offered to keep me on.

The app was a mobile-first learning platform, AgroStar Gold. Farmers sign in, watch live or recorded sessions on farming techniques, and get the content in their own language, with audio and subtitles switching to match.

It is the fastest I have ever shipped anything to production, and none of the speed came from working harder. It came from scope.

## Most of the week was saved before it started

Two things were already true when I arrived, and I had nothing to do with either.

The designs were finished and approved. When an engineer designs and builds at the same time, every component carries a design decision, a review and a revision. With approved designs, I was translating, not inventing.

The users already existed. The sales team handled farmer registration, so there was no sign-up flow, no verification and no onboarding to build. The app only had to sync the farmer records the sales team already kept.

If you want something built in a week, this is where to spend your effort: settle the design and the data before the engineer starts the clock.

## The list of things I did not build

The scope was sign in, browse sessions, watch a video, like, comment.

Not in it: search, recommendations, social features, offline mode. Each of those is a system, not a feature. Search means indexing. Recommendations mean a model and the data to feed it. Offline means a caching strategy and a sync problem. Every absence saved between half a day and a day.

When the conversation drifted toward "what if we also added", I asked one question: does a farmer need this to watch a video in their language on Friday? If the answer was no, it went on a list for later. It helps that the question is about the farmer and not about my workload.

## Nothing new in the stack

React, Nest.js and Firestore, all of which I had used before, and Video.js for playback because it handles multiple audio and subtitle tracks natively.

Nothing about the architecture was novel, and I meant it that way. A one-week project is the wrong place to try the framework you have been curious about. New tools are for timelines with slack in them.

## The demo path first

The VP was going to judge the app by using it, not by reading the code. So I built in the order he would experience it: sign in, browse, play, switch language.

Error states, validation and rate limiting came after that path was solid. They did get built. This was about sequence. If the week had gone badly, I wanted to be short an edge case, not short the product.

## The one hard part

Language was the only real engineering problem.

The app supported several Indian languages, each with its own script.

Every label had to render correctly in each script, which is a layout problem as much as a translation problem: a short English button label can be twice as long in another language. And each recorded session had several audio tracks and subtitle files. When a farmer changed language, the video had to switch both without restarting, and the preference had to follow them to another device.

Most videos existed in only one or two languages, so the catalog also had to filter by what was actually available without hiding everything else.

This is the part I would not have cut, and the part that took the most care. Scope discipline does not mean every feature gets less time. It means one thing gets most of it.

## What I took from it

The outcome was simple. The VP opened the app on Friday, used it for a while, and offered to keep me on.

The project was neither architecturally interesting nor technically difficult. It still taught me more about shipping than harder projects did, because it removed every excuse. With designs done, data ready and a familiar stack, the only variable left was what I agreed to build.

Years later, with coding agents that can produce a week of code in an afternoon, that variable is the only one left for everyone. I come back to it in [how to ship in 2027](/blog/how-to-ship-products-in-2027/).
