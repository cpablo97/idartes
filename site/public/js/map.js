/* ============================================================
   Mapa de lugares: Leaflet (autoalojado en /js/vendor) + mapa base de OpenStreetMap o el que indique la sección.
   Leaflet se carga solo cuando la sección se acerca a la pantalla.
   Marcadores por categoría, filtro desde la leyenda, tarjeta del lugar elegido,
   chip Abierto/Cerrado según la hora de Bogotá, teclado (Enter en un marcador, Esc cierra).
   ============================================================ */
(() => {
  "use strict";
  if (window.__mapa) return;
  window.__mapa = true;
  // Mapa base por defecto: OpenStreetMap (sin clave). La sección puede traer otro en `tilesUrl` (p. ej. CARTO con su clave).
  const OSM = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  const link = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
  const attribution = (url) => "&copy; " + link("https://www.openstreetmap.org/copyright", "OpenStreetMap") + (/cartocdn/.test(url) ? " &copy; " + link("https://carto.com/attributions", "CARTO") : "");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let leaflet = null;
  const loadLeaflet = () => leaflet || (leaflet = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet"; css.href = "/js/vendor/leaflet.css";
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = "/js/vendor/leaflet.js";
    js.onload = () => resolve(window.L);
    js.onerror = reject;
    document.head.appendChild(js);
  }));

  // ¿Está abierto ahora? Con la hora de Bogotá, sea cual sea la del visitante.
  function isOpen(hours) {
    if (!hours || !hours.length) return null;
    const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Bogota", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    const now = +get("hour") * 60 + +get("minute");
    const mins = (s) => { const [h, m] = s.split(":"); return +h * 60 + +m; };
    return hours.some((h) => h.days.includes(day) && now >= mins(h.open) && now < mins(h.close));
  }

  function init(root, L) {
    const data = JSON.parse(root.querySelector(".map__data").textContent);
    const canvas = root.querySelector(".map__canvas");
    const frame = root.querySelector(".map__frame");
    const cards = Array.from(root.querySelectorAll(".place"));
    const filters = Array.from(root.querySelectorAll(".map__filter"));
    const hidden = new Set();
    let active = null;

    const map = L.map(canvas, { center: [data.center.lat, data.center.lng], zoom: data.zoom, scrollWheelZoom: false, zoomControl: false, zoomAnimation: !reduced, fadeAnimation: !reduced, markerZoomAnimation: !reduced });
    L.control.zoom({ position: "bottomright", zoomInTitle: "Acercar", zoomOutTitle: "Alejar" }).addTo(map);
    const tiles = data.tilesUrl || OSM;
    L.tileLayer(tiles, { attribution: attribution(tiles), maxZoom: 19, minZoom: 12, subdomains: "abcd" }).addTo(map);
    map.attributionControl.setPrefix(false);
    // La rueda del ratón desplaza la página; solo hace zoom después de tocar el mapa.
    map.on("click", () => map.scrollWheelZoom.enable());
    canvas.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());
    root.classList.add("is-ready");

    const markers = new Map();
    for (const p of data.places) {
      const icon = L.divIcon({ className: "map__marker", iconSize: [26, 26], iconAnchor: [13, 13], html: `<img class="map__pin" src="/assets/icons/mapa/pin.svg" width="110" height="110" alt=""><span class="map__point" style="background:${p.color}"></span>` });
      const m = L.marker([p.lat, p.lng], { icon, title: p.name, alt: p.name, keyboard: true, riseOnHover: true });
      m.on("click", () => select(p.id, true));
      m.addTo(map);
      // Leaflet vuelve a crear el icono al quitar y poner el marcador, así que el teclado se engancha en cada "add".
      const keys = () => m.getElement()?.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(p.id, true); } });
      m.on("add", keys); keys();
      markers.set(p.id, m);
    }

    function select(id, focus) {
      active = id;
      for (const c of cards) c.hidden = c.dataset.place !== id;
      markers.forEach((m, k) => m.getElement()?.classList.toggle("is-active", k === id));
      root.classList.toggle("has-card", !!id);
      if (!id) return;
      const p = data.places.find((x) => x.id === id);
      const card = cards.find((c) => c.dataset.place === id);
      const state = card.querySelector("[data-state]");
      const open = isOpen(p.hours);
      state.hidden = open === null;
      if (open !== null) { state.textContent = open ? "Abierto" : "Cerrado"; state.classList.toggle("is-closed", !open); }
      // Deja el marcador a la vista: a la derecha de la tarjeta en escritorio, arriba de ella en móvil.
      const wide = frame.clientWidth >= 1000;
      const target = map.project([p.lat, p.lng], map.getZoom()).subtract(wide ? [card.offsetWidth / 2 + 40, 0] : [0, -frame.clientHeight / 4]);
      map.panTo(map.unproject(target, map.getZoom()), { animate: !reduced });
      if (focus) card.querySelector(".place__name").focus({ preventScroll: true });
    }
    function close(returnFocus) {
      const id = active;
      select(null);
      active = null;
      if (returnFocus && id) markers.get(id)?.getElement()?.focus({ preventScroll: true });
    }
    cards.forEach((c) => c.querySelector(".place__close").addEventListener("click", () => close(true)));
    root.addEventListener("keydown", (e) => { if (e.key === "Escape" && active) { e.stopPropagation(); close(true); } });

    filters.forEach((b) => b.addEventListener("click", () => {
      const on = b.getAttribute("aria-pressed") !== "true";
      b.setAttribute("aria-pressed", String(on));
      const cat = b.dataset.cat;
      if (on) hidden.delete(cat); else hidden.add(cat);
      for (const p of data.places) {
        const m = markers.get(p.id);
        if (hidden.has(p.category)) { m.remove(); if (active === p.id) close(false); } else m.addTo(map);
      }
      root.querySelectorAll(".map__group").forEach((g) => (g.hidden = hidden.has(g.dataset.cat)));
    }));

    root.querySelectorAll("[data-goto]").forEach((b) => b.addEventListener("click", () => {
      frame.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
      select(b.dataset.goto, true);
    }));
    addEventListener("resize", () => map.invalidateSize());
  }

  document.querySelectorAll("[data-map]").forEach((root) => {
    const start = () => loadLeaflet().then((L) => init(root, L)).catch(() => root.classList.add("is-failed"));
    if (!("IntersectionObserver" in window)) return start();
    const io = new IntersectionObserver((en) => { if (en.some((e) => e.isIntersecting)) { io.disconnect(); start(); } }, { rootMargin: "800px 0px" });
    io.observe(root);
  });
})();
