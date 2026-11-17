const CANONICAL_HOST = "shrinath.me";

// Old paths → current paths, permanent
const REDIRECTS = {
  // Retired posts go to the blog index instead of a 404
  "/blog/outline-analytics-reason": "/blog/",
  "/blog/owleye-analytics-reason": "/blog/",
  "/blog/choosing-eleventy-over-nuxt": "/blog/how-i-choose-a-tech-stack/",
  "/blog/vite-seo-without-nextjs": "/blog/aeo-geo-ai-discoverability/",
  "/blog/vue-3-composition-api-basics-and-patterns": "/blog/",
  "/blog/privacy-first-chrome-extension-with-vpn": "/blog/",
  "/blog/zero-knowledge-encrypted-storage": "/blog/",
  "/blog/leading-team-in-2026":
    "/blog/ai-will-replace-coders-not-software-engineers/",
  "/launch-plan": "/",
  "/resume/SHRINATH_PRABHU_UPDATED_RESUME_2026.pdf":
    "/resume/SHRINATH_PRABHU_RESUME.pdf",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ── www → apex, permanent (308 preserves method + body) ──
    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 308);
    }

    // ── /security.txt → /.well-known/security.txt (RFC 9116) ──
    if (url.pathname === "/security.txt") {
      url.pathname = "/.well-known/security.txt";
      return Response.redirect(url.toString(), 308);
    }

    // ── Renamed pages ──
    const redirect = REDIRECTS[url.pathname.replace(/\/$/, "")];
    if (redirect) {
      url.pathname = redirect;
      return Response.redirect(url.toString(), 308);
    }

    return env.ASSETS.fetch(request);
  },
};
