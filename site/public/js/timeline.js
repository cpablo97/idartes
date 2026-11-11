/* Línea de tiempo: el punto de cada paso se enciende al entrar y su tramo de línea se traza con el scroll.
   Sin dependencias. Con movimiento reducido no hace nada (todo queda dibujado). */
(() => {
  "use strict";
  if (window.__timeline) return;
  window.__timeline = true;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll("[data-timeline]").forEach((list) => {
    const steps = Array.from(list.children);
    if (!steps.length) return;
    list.dataset.live = "";
    let raf = 0;
    const update = () => {
      raf = 0;
      const mark = innerHeight * 0.62; // altura de la ventana a la que "llega" el trazo
      for (const step of steps) {
        const r = step.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
        step.style.setProperty("--p", p.toFixed(4));
        step.classList.toggle("is-on", r.top < mark);
      }
    };
    const ask = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener("scroll", ask, { passive: true });
    addEventListener("resize", ask);
    update();
  });
})();
