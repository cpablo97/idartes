/* Fachada del videojuego: el iframe de itch.io solo se carga al pulsar "Jugar". Sin dependencias. */
(() => {
  "use strict";
  if (window.__gameEmbed) return;
  window.__gameEmbed = true;
  document.addEventListener("click", (e) => {
    const btn = e.target.closest?.(".game__btn");
    const frame = btn?.closest("[data-game]");
    if (!frame) return;
    let url;
    try { url = new URL(frame.dataset.game); } catch { return; }
    // Solo se aceptan embeds de itch.io.
    if (url.protocol !== "https:" || !/(^|\.)itch\.(io|zone)$/.test(url.hostname)) return;
    const iframe = document.createElement("iframe");
    iframe.src = url.href;
    iframe.title = frame.dataset.title || "Videojuego";
    iframe.allow = "autoplay; fullscreen; gamepad";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    frame.replaceChildren(iframe);
    const section = frame.closest(".game");
    section.classList.add("is-playing");
    const bar = section.querySelector(".game__bar");
    if (bar) bar.hidden = false;
    iframe.focus();
  });
})();
