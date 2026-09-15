const CANONICAL_HOST = "shrinath.me";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ── www → apex, permanent (308 preserves method + body) ──
    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 308);
    }

    return env.ASSETS.fetch(request);
  },
};
