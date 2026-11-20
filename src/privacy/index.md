---
layout: guide.njk
title: "Privacy — Shrinath Prabhu’s portfolio and blog"
heading: "Privacy"
description: "How this portfolio handles browser preferences, website analytics, hosting, and contact links."
---

This notice covers shrinath.me, the personal portfolio and blog of Shrinath Prabhu. Questions about this site or this notice can be sent to [hello@shrinath.me](mailto:hello@shrinath.me).

## Browsing the site

The public pages, blog, and read-only REST API are available without an account or API key. The Worker uses the connecting IP address to enforce a shared request limit on the API. The voice introduction and its transcript data are hosted with the site; the audio is requested when you choose to play it.

## Preferences stored in your browser

The Appearance control stores your theme choice under `portfolio-theme` and your animation choice under `portfolio-motion` in localStorage. These values let the site remember your settings on future visits. They are read by the site’s browser code and are not sent by that code to a preference service.

Until you choose an override, theme and animation settings follow your device preferences. You can change them in Appearance, use “Use device setting” for animations, or clear this site’s browser storage to reset both settings. If browser storage is unavailable, a choice applies only to the current page. These preference values are not cookies.

## Hosting and analytics

Cloudflare delivers this website. Delivering and protecting a web request involves technical information such as the requested URL, network address, and browser request headers. Cloudflare processes that information under its own [privacy policy](https://www.cloudflare.com/privacypolicy/).

The site also loads Cloudflare Web Analytics to understand page views and page performance. Cloudflare describes this service as privacy-first and says it does not track individual visitors across its customers’ websites. Its [data collection documentation](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/) describes the performance beacon and the metrics it collects. This notice does not promise that hosting infrastructure keeps no access records.

## Email, scheduling, and external links

Email links open your email application. If you contact me, your email address and the information you choose to send are used to respond to the inquiry. Scheduling links open Cal.com; social profiles, project links, and other external sites are operated by their respective providers. Their own terms and privacy notices apply when you use them.

Avoid including passwords, private keys, or other secrets in a message. For security reports, the preferred contact is listed in [security.txt](/.well-known/security.txt).
