/* ============================================================
   Ciudad y Cuerpo — menú, fachada de YouTube y apariciones al hacer scroll.
   Sin dependencias.
   ============================================================ */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menú: aria-expanded, foco atrapado, Esc y clic fuera ---------- */
  const btn = $(".menu-btn");
  const menu = $("#menu");
  if (btn && menu) {
    const focusables = () => $$("a[href], button", menu);
    const setOpen = (open, returnFocus = true) => {
      if (open === !menu.hidden) return;
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? btn.dataset.labelClose : btn.dataset.labelOpen);
      if (open) (($("[aria-current]", menu)) || focusables()[1] || focusables()[0])?.focus();
      else if (returnFocus) btn.focus();
    };
    btn.addEventListener("click", () => setOpen(menu.hidden));
    $(".menu__close", menu)?.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (e) => {
      if (menu.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
      if (e.key !== "Tab") return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (!menu.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    document.addEventListener("pointerdown", (e) => {
      if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) setOpen(false, false);
    });
  }

  /* ---------- MENÚ con fondo blanco cuando ya no está sobre la cabecera ---------- */
  const onScroll = () => root.classList.toggle("is-scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- YouTube: el iframe solo se carga al hacer clic ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest?.(".yt__btn");
    const box = b?.closest(".yt[data-yt]");
    if (!box) return;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(box.dataset.yt)}?autoplay=1&rel=0&playsinline=1`;
    iframe.title = box.dataset.title || "Video";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    box.replaceChildren(iframe);
    box.classList.add("is-playing");
    iframe.focus();
  });

  /* ---------- Apariciones ---------- */
  const targets = $$("[data-reveal]");
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in", "is-done"));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        en.target.classList.add("is-in");
        setTimeout(() => en.target.classList.add("is-done"), 1500);
        io.unobserve(en.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach((el) => io.observe(el));
  }
})();
