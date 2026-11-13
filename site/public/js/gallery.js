/* Galería en espiral: túnel de tarjetas curvadas que avanza girando con arrastre, flechas y teclado.
   El 3D solo se activa con JS, sin `prefers-reduced-motion` y con soporte de unidades de contenedor;
   si no, la galería se queda como la rejilla normal del CSS. Sin dependencias. */
(() => {
  "use strict";
  if (window.__gallery) return;
  window.__gallery = true;
  const mq = matchMedia("(prefers-reduced-motion: reduce)");
  const ok = window.CSS && CSS.supports("width", "1cqw") && CSS.supports("rotate", "calc(atan(1) * 1)") && "PointerEvent" in window;
  if (!ok) return;

  document.querySelectorAll("[data-gallery]").forEach((root) => {
    const stage = root.querySelector(".gallery__stage");
    const cards = Array.from(root.querySelectorAll(".gallery__card"));
    const prev = root.querySelector(".gallery__nav--prev");
    const next = root.querySelector(".gallery__nav--next");
    const count = root.querySelector(".gallery__count");
    const current = root.querySelector("[data-current]");
    const n = cards.length;
    if (n < 4) return;

    const NEAR = 1.5; // tramo de las tarjetas que ya pasaron junto a la cámara, antes de reaparecer al fondo
    const FAR = Math.min(n - NEAR - 1.2, 5.5); // a partir de aquí se desvanecen hacia el centro
    let t = 0; // posición continua: la tarjeta `t` es la que está en primer plano
    let target = 0;
    let raf = 0;
    let on = false;
    let entered = false;

    const mod = (a, m) => ((a % m) + m) % m;
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const render = () => {
      for (let j = 0; j < n; j++) {
        const u = mod(j - t + NEAR, n) - NEAR; // −NEAR … n−NEAR
        const o = Math.min(clamp01((u + NEAR) / 0.4), clamp01((FAR + 1.2 - u) / 1.2));
        const s = cards[j].style;
        s.setProperty("--u", u.toFixed(4));
        s.setProperty("--o", o.toFixed(3));
        s.visibility = o <= 0 ? "hidden" : "";
      }
      current.textContent = String(mod(Math.round(target), n) + 1);
    };
    const tick = () => {
      const d = target - t;
      if (Math.abs(d) < 0.002) { t = target; raf = 0; render(); return; }
      t += d * 0.12;
      render();
      raf = requestAnimationFrame(tick);
    };
    const go = (to) => { target = to; if (!raf) raf = requestAnimationFrame(tick); };
    const step = (dir) => go(Math.round(target) + dir);

    prev.addEventListener("click", () => step(-1));
    next.addEventListener("click", () => step(1));
    stage.addEventListener("keydown", (e) => {
      if (!on || e.target !== stage) return;
      const base = Math.round(target) - mod(Math.round(target), n);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); step(-1); }
      else if (e.key === "Home") { e.preventDefault(); go(base); }
      else if (e.key === "End") { e.preventDefault(); go(base + n - 1); }
    });

    // Arrastre horizontal: un ancho de pantalla ≈ cuatro tarjetas. El scroll vertical sigue libre (touch-action: pan-y).
    let drag = null;
    stage.addEventListener("pointerdown", (e) => {
      if (!on || e.button > 0 || e.target.closest("button")) return;
      drag = { id: e.pointerId, x: e.clientX, t0: target, moved: false };
    });
    stage.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) < 6) return;
      if (!drag.moved) { drag.moved = true; stage.setPointerCapture(drag.id); stage.classList.add("is-dragging"); }
      go(drag.t0 - (dx / stage.clientWidth) * 4);
    });
    const end = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.moved) go(Math.round(target));
      stage.classList.remove("is-dragging");
      drag = null;
    };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);

    // Primera entrada en pantalla: las tarjetas llegan desde el fondo del túnel.
    const io = "IntersectionObserver" in window && new IntersectionObserver((entries) => {
      if (!on || entered || !entries.some((en) => en.isIntersecting)) return;
      entered = true;
      io.disconnect();
      go(0);
    }, { threshold: 0.25 });

    const enable = (yes) => {
      on = yes;
      root.classList.toggle("is-3d", yes);
      [prev, next, count].forEach((el) => (el.hidden = !yes));
      if (yes) {
        stage.tabIndex = 0;
        if (!entered && io) { t = -2.5; target = 0; io.observe(stage); } else entered = true;
        render();
      } else {
        stage.removeAttribute("tabindex");
        cancelAnimationFrame(raf); raf = 0;
        cards.forEach((c) => { c.style.removeProperty("--u"); c.style.removeProperty("--o"); c.style.visibility = ""; });
      }
    };
    enable(!mq.matches);
    mq.addEventListener?.("change", () => enable(!mq.matches));
  });
})();
