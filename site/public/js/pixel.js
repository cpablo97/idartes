/* ============================================================
   Efecto píxel al aparecer: cuando una foto entra en pantalla con el scroll, se forma de arriba abajo
   por filas de cuadritos. Misma lógica del shader de referencia (retícula de ~20 px, franja de píxeles
   con opacidad al azar en el borde del barrido), pero sin WebGL: la foto real se recorta por filas con
   clip-path y un canvas encima pinta solo la franja de píxeles. Sin dependencias.
   main.js lo llama al revelar cada [data-reveal="img"]; si aquí no aplica (movimiento reducido,
   ilustraciones con transparencia, marcos girados) queda la aparición normal por CSS.
   ============================================================ */
(() => {
  "use strict";
  if (window.__pixel) return;
  window.__pixel = true;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const SELECTOR = ".ci--img:not(.ci--contain) img, .card__img img, .person__photo img";
  const CELL = 20;        // lado del píxel, en px de pantalla
  const BAND = 0.2;       // alto de la franja de píxeles (fracción del alto de la foto)
  const IN = 1300;        // ms: lo que tarda en formarse
  const running = new WeakSet();

  // Azar estable por celda (el mismo hash del shader).
  const rand = (x, y) => { const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123; return v - Math.floor(v); };
  const smooth = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

  function play(img) {
    if (running.has(img)) return false;
    const box = img.closest(".ci--img, .card__img, .person__photo") || img;
    const r0 = box.getBoundingClientRect();
    if (r0.width < 40 || r0.height < 40) return false;
    if (parseFloat(getComputedStyle(box).rotate) || 0) return false; // los marcos girados usan la aparición normal
    running.add(img);
    img.loading = "eager"; // una foto recortada del todo no cuenta como visible y la carga diferida no arrancaría
    img.style.clipPath = "inset(0 0 100% 0)";

    const color = getComputedStyle(document.documentElement).getPropertyValue("--morado").trim() || "#5b0e96";
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;left:0;top:0;pointer-events:none;z-index:40";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const cols = Math.max(4, Math.floor(r0.width / CELL));
    const cell = r0.width / cols;
    const rows = Math.max(1, Math.ceil(r0.height / cell));
    let start = 0;

    function frame(now) {
      // El reloj arranca cuando la foto ya cargó, para que no se forme en blanco.
      if (!start) { if (!img.complete || !img.naturalWidth) { requestAnimationFrame(frame); return; } start = now; }
      const t = now - start;
      const u = Math.min(1, t / IN); // 0 = sin formar, 1 = foto completa; lineal como en la referencia
      const progress = 1 + BAND - u * (1 + 2 * BAND); // línea del barrido en coordenadas uv (0 = abajo)

      const r = box.getBoundingClientRect();
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
      canvas.style.transform = `translate(${r.left}px, ${r.top}px)`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = color;

      let visibleRows = 0;
      for (let j = 0; j < rows; j++) {
        const gy = 1 - (j + 1) / rows;              // uv de la fila (borde inferior)
        if (gy >= progress) visibleRows = j + 1;    // la foto se ve por filas completas
        const d = Math.abs(gy - progress);
        if (d >= BAND) continue;
        const near = smooth(BAND, 0, d);
        for (let i = 0; i < cols; i++) {
          const rn = rand(i / cols, gy);
          const a = near + rn - 0.5 * (d <= BAND * rn ? 0 : 1);
          if (a <= 0) continue;
          ctx.globalAlpha = Math.min(1, a);
          ctx.fillRect(i * cell, j * cell, cell + 0.5, cell + 0.5);
        }
      }
      img.style.clipPath = `inset(0 0 ${(100 * (1 - Math.min(1, (visibleRows * cell) / r.height))).toFixed(3)}% 0)`;

      if (t < IN) requestAnimationFrame(frame);
      else { img.style.clipPath = ""; canvas.remove(); running.delete(img); }
    }
    requestAnimationFrame(frame);
    return true;
  }

  /** Lo llama main.js al revelar un [data-reveal="img"]. Devuelve true si el efecto se hizo cargo. */
  window.__pixelReveal = (el) => {
    const img = el.matches(SELECTOR) ? el : el.querySelector(SELECTOR);
    return img ? play(img) : false;
  };
})();
