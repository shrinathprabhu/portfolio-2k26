---
title: "Why I Chose Eleventy Over Nuxt for My Own Website"
description: "I have used Nuxt professionally for years. My portfolio runs on Eleventy. Here is why the tool I know best was not the right tool."
date: 2026-05-07
postTags: ["posts", "eleventy", "nuxt", "frontend"]
category: "Frontend Architecture"
keywords:
  [
    "Eleventy",
    "Nuxt",
    "static site generator",
    "portfolio website",
    "11ty",
    "Vue",
    "SSG",
    "build tool",
  ]
image: "/images/eleventy-over-nuxt.jpg"
---

I have used Vue and Nuxt professionally for over 6 years. I have built dashboards, Chrome Extensions, SDK documentation sites, and landing pages with Nuxt. If someone asks me what framework to use for a content-heavy website, my default answer is Nuxt 3.

My own portfolio website does not use Nuxt. It uses Eleventy, a static site generator that outputs plain HTML with zero client-side JavaScript. Here is why.

## What my website actually needs

My portfolio has 6 pages: home, work (case studies), blog, resume, contact, and uses (dev tools). The blog posts are written in markdown. The pages are mostly static content with no interactive components, no client-side data fetching, no dynamic routing, and no state management.

The most complex interaction on the entire site is the mobile navigation toggle, a single `classList.toggle('open')` call. That is 1 line of JavaScript. Nuxt's client-side runtime is approximately 50KB gzipped. I would be shipping 50KB of framework code to support 1 line of functionality.

## What Nuxt brings that I do not need

Nuxt is built for applications. It ships a Vue runtime that hydrates the page after the initial HTML loads, enabling reactive components, client-side routing (navigating between pages without full page reloads), and dynamic data binding. These features are essential for a dashboard, a SaaS app, or any interface with interactive state.

For a portfolio that displays static text and images, every one of these features is overhead. The hydration step (where Vue attaches event listeners to the server-rendered HTML) adds time-to-interactive without adding functionality. The client-side router intercepts link clicks and handles them in JavaScript when a standard `<a href>` tag does the same thing faster. The reactive system watches for state changes in a page where state never changes.

## What Eleventy gives me instead

Eleventy takes my markdown files and Nunjucks templates and produces plain HTML. No JavaScript bundle. No hydration. No framework runtime. The output is exactly what the browser needs and nothing more.

My homepage loads in under 1 second on any connection. There is no layout shift because the page is not hydrating. There is no flash of unstyled content because there is no client-side rendering step. The Lighthouse score is almost 100 across all metrics, not because I spent time optimizing, but because there is nothing to optimize away.

Eleventy also solves the specific problem that prompted the migration: reusable templates. My previous site was raw HTML with the header and footer copy-pasted across 6 files. Changing a navigation link meant editing 6 files. Eleventy's `{% raw %}{% include %}{% endraw %}` partials solve this without requiring a framework.

Blog posts are written in markdown with frontmatter (title, date, description, tags), and Eleventy converts them to HTML pages inside clean URL folders (`/blog/my-post/index.html`). The blog listing page auto-generates from the post collection, sorted by date. Adding a new post means creating a markdown file and pushing to Git. No CMS, no database, no build configuration changes.

## When to use Nuxt instead

This is not an argument against Nuxt. If my portfolio had interactive data visualizations, a filterable project gallery, client-side search, or any dynamic behavior beyond static display, I would use Nuxt without hesitation. Nuxt is the right tool for applications. Eleventy is the right tool for documents.

The mistake is using an application framework to serve documents, or using a document generator to build applications. Know which one you are building, and pick accordingly.

## The meta-lesson

The best technology decision is often the one that removes technology. My portfolio went from a framework with a runtime, a build pipeline, and a hydration step to a tool that takes text files and produces HTML. It got simpler, faster, and easier to maintain. Sometimes the senior engineering move is choosing the boring, small tool over the powerful, complex one.

---

_Written by [Shrinath Prabhu](https://shrinath.me), Senior Staff Frontend Engineer. This site is built with Eleventy and costs $0 to host._
