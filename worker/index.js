const CANONICAL_HOST = "shrinath.me";

// Old paths → current paths, permanent
const REDIRECTS = {
  // Outline Analytics was renamed OwlEye
  "/blog/outline-analytics-reason": "/blog/owleye-analytics-reason/",
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
