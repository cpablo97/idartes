/* Visor de la bitácora: flechas, teclado y contador sobre una tira con scroll-snap. Sin dependencias. */
(() => {
  "use strict";
  if (window.__bitacora) return;
  window.__bitacora = true;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-bitacora]").forEach((root) => {
    const track = root.querySelector(".bitacora__track");
    const pages = Array.from(track.children);
    const prev = root.querySelector(".bitacora__nav--prev");
    const next = root.querySelector(".bitacora__nav--next");
    const count = root.querySelector(".bitacora__count");
    const current = root.querySelector("[data-current]");
    const book = root.dataset.bitacora === "book";
    if (pages.length < 2) return;
    [prev, next, count].forEach((el) => (el.hidden = false));

    // Cuántas láminas se ven a la vez (2 en el libro de escritorio).
    const per = () => Math.max(1, Math.round(track.clientWidth / pages[0].getBoundingClientRect().width));
    const steps = () => Math.ceil(pages.length / per());
    const index = () => Math.round(track.scrollLeft / track.clientWidth);

    const update = () => {
      const i = Math.min(index(), steps() - 1);
      const n = per();
      const first = i * n + 1;
      const last = Math.min(pages.length, first + n - 1);
      current.textContent = n > 1 && last > first ? `${first}–${last}` : String(first);
      prev.disabled = i <= 0;
      next.disabled = i >= steps() - 1;
    };
    const go = (dir) => {
      const i = Math.max(0, Math.min(steps() - 1, index() + dir));
      if (book && !reduced) {
        // Pasar página: salto seco + giro de la hoja entrante.
        track.scrollTo({ left: i * track.clientWidth, behavior: "instant" });
        root.dataset.turn = dir > 0 ? "next" : "prev";
        root.classList.remove("is-turning");
        void root.offsetWidth;
        root.classList.add("is-turning");
      } else {
        track.scrollTo({ left: i * track.clientWidth, behavior: reduced ? "instant" : "smooth" });
      }
    };
    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "Home") { e.preventDefault(); go(-999); }
      else if (e.key === "End") { e.preventDefault(); go(999); }
    });
    let raf = 0;
    track.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
    addEventListener("resize", update);
    update();
  });
})();
