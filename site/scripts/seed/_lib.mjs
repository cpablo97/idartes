// Ayudas para escribir el seed a mano con las medidas del Figma (frame de 1440 px).
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

/** img = images("inicio") → img("hero-cuerpo", "texto alternativo", hotspot?) */
export function images(folder) {
  const manifest = JSON.parse(readFileSync(path.join(here, "../manifest", `${folder}.json`), "utf8"));
  return (name, alt, hotspot) => {
    if (!manifest[name]) throw new Error(`Imagen no encontrada en el manifiesto: ${folder}/${name} (¿falta correr npm run images?)`);
    if (typeof alt !== "string") throw new Error(`Falta el alt de ${folder}/${name}`);
    return { local: manifest[name], alt, ...(hotspot ? { hotspot } : {}) };
  };
}
/** SVG u otro archivo que no pasa por sharp. */
export const svg = (url, width, height, alt) => ({ local: { webp: [], fallback: url, width, height }, alt });

/** Recorte interior de Figma (left/top/width/height en % del marco) → punto focal para object-fit: cover. */
export function crop(left, top, width = 100, height = 100) {
  const x = width > 100.5 ? -left / (width - 100) : 0.5;
  const y = height > 100.5 ? -top / (height - 100) : 0.5;
  const c = (n) => Math.round(Math.min(1, Math.max(0, n)) * 100) / 100;
  return { x: c(x), y: c(y) };
}

// ----- texto -----
export const t = (text, ...marks) => ({ _type: "span", text, ...(marks.length ? { marks } : {}) });
export const b = (text) => t(text, "strong");
export const i = (text) => t(text, "em");
export const m = (text) => t(text, "medium");
export const a = (text, href, ...marks) => ({ ...t(text, ...marks), href });
/** Un párrafo: acepta cadenas o tramos. */
export const p = (...children) => ({ _type: "block", style: "normal", children: children.map((c) => (typeof c === "string" ? t(c) : c)) });
/** Varios párrafos: cada argumento es una cadena, un tramo o un arreglo de tramos. */
export const body = (...paras) => paras.map((x) => (Array.isArray(x) ? p(...x) : x?._type === "block" ? x : p(x)));

// ----- retícula -----
const u = (px) => Math.round(px / 10);
/**
 * Lienzo cuya esquina superior está en `y0` (y del frame de Figma, con los 80 px del navegador incluidos).
 * c.at(x, y, w, h, z?) convierte px del frame en una posición de retícula; c.rows(yFinal) da el alto.
 */
export function canvas(y0) {
  return {
    at: (x, y, w, h, z) => {
      const col = Math.min(144, Math.max(1, u(x) + 1)); // la retícula no admite columnas fuera del lienzo: lo que sangra usa `bleed`
      return { col, row: Math.max(1, u(y - y0) + 1), cols: Math.min(145 - col, Math.max(1, u(w))), ...(h ? { rows: Math.max(1, u(h)) } : {}), ...(z != null ? { z } : {}) };
    },
    /** Trama de puntos: puede empezar por encima del lienzo (fila negativa). */
    dots: (x, y, w, h, over) => ({ col: u(x) + 1, row: u(y - y0) + 1, cols: u(w), rows: u(h), ...(over ? { over: true } : {}) }),
    rows: (yEnd) => u(yEnd - y0),
  };
}

// ----- elementos -----
export const image = (image, place, extra = {}) => ({ _type: "imageItem", image, place, ...extra });
export const text = (bodyBlocks, place, extra = {}) => ({ _type: "textItem", body: bodyBlocks, place, ...extra });
export const title = (spans, tone, place, extra = {}) => ({ _type: "displayTitle", text: typeof spans === "string" ? [t(spans)] : spans, tone, place, ...extra });
export const card = (label, href, image, size, place) => ({ _type: "card", label, href, image, size, ...(place ? { place } : {}) });
export const rule = (place, extra = {}) => ({ _type: "rule", place, ...extra });

/** Fila "Explora más": tarjetas [etiqueta, href, imagen]. */
export const explora = (cards, titleText = "Explora más") => ({ _type: "cardGrid", layout: "row", title: titleText, items: cards.map(([label, href, img]) => card(label, href, img, "s")) });
