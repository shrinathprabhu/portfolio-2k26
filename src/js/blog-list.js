/**
 * Blog List Enhancements
 * 1. LQIP reveal — tiny base64 placeholder is shown instantly via CSS
 *    ::before. When the real image loads, it fades in on top and the
 *    placeholder fades out. Zero build-time processing at runtime.
 * 2. Progressive card reveal — only the first batch of cards are
 *    visible; remaining cards are revealed via a "Load More" button.
 */
(function () {
  "use strict";

  // ── Configuration ──
  var BATCH_SIZE = 6;

  // ── LQIP image reveal ──
  function initImageReveal() {
    var images = document.querySelectorAll(".blog-card__image img.is-loading");

    images.forEach(function (img) {
      var container = img.closest(".blog-card__image");

      function reveal() {
        img.classList.remove("is-loading");
        img.classList.add("is-loaded");
        if (container) {
          container.classList.add("placeholder-loaded");
        }
      }

      // Image already cached / complete
      if (img.complete && img.naturalWidth > 0) {
        reveal();
        return;
      }

      img.addEventListener("load", reveal, { once: true });

      // Fallback: remove placeholder even if image errors
      img.addEventListener("error", reveal, { once: true });
    });
  }

  // ── Progressive card reveal ──
  function initProgressiveReveal() {
    var loadMoreWrap = document.getElementById("blog-load-more");
    var loadMoreBtn = document.getElementById("blog-load-more-btn");
    var loadMoreCount = document.getElementById("blog-load-more-count");

    if (!loadMoreBtn || !loadMoreWrap) return;

    var hiddenCards = document.querySelectorAll(".blog-card--hidden");
    var remaining = hiddenCards.length;

    if (remaining === 0) {
      loadMoreWrap.style.display = "none";
      return;
    }

    updateCount(remaining);

    loadMoreBtn.addEventListener("click", function () {
      var currentHidden = document.querySelectorAll(".blog-card--hidden");
      var toReveal = Math.min(BATCH_SIZE, currentHidden.length);

      for (var i = 0; i < toReveal; i++) {
        var card = currentHidden[i];
        card.classList.remove("blog-card--hidden");
        card.classList.add("blog-card--reveal");

        // Stagger the animation
        card.style.animationDelay = i * 0.06 + "s";

        // Trigger LQIP reveal for newly visible images
        var img = card.querySelector(".blog-card__image img");
        if (img) {
          var container = img.closest(".blog-card__image");

          if (img.complete && img.naturalWidth > 0) {
            img.classList.remove("is-loading");
            img.classList.add("is-loaded");
            if (container) container.classList.add("placeholder-loaded");
          }
          // else: existing load/error listeners handle it
        }
      }

      remaining = document.querySelectorAll(".blog-card--hidden").length;

      if (remaining === 0) {
        loadMoreWrap.style.display = "none";
      } else {
        updateCount(remaining);
      }
    });

    function updateCount(n) {
      loadMoreCount.textContent = n + " more";
    }
  }

  // ── Initialize ──
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initImageReveal();
      initProgressiveReveal();
    });
  } else {
    initImageReveal();
    initProgressiveReveal();
  }
})();
