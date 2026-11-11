import type { Block, Place, Span, Tone } from "./types";

export const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Tramos → HTML seguro con <strong>/<em>/<a>; "\n" se vuelve <br>. */
export function spans(children: Span[] | undefined): string {
  return (children ?? [])
    .map((c) => {
      let html = escape(c.text || "").replace(/\n/g, "<br>");
      const m = c.marks ?? [];
      if (m.includes("em")) html = `<em>${html}</em>`;
      if (m.includes("medium")) html = `<span class="medium">${html}</span>`;
      if (m.includes("strong")) html = `<strong>${html}</strong>`;
      if (m.includes("underline")) html = `<u>${html}</u>`;
      if (c.href) {
        const ext = /^https?:/.test(c.href);
        html = `<a href="${escape(c.href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${html}</a>`;
      }
      return html;
    })
    .join("");
}

/** Cuerpo en Portable Text simplificado → párrafos de HTML seguro. */
export function paragraphs(body: Block[] | undefined): string[] {
  return (body ?? []).filter((b) => b?._type === "block").map((b) => spans(b.children)).filter(Boolean);
}

/** Texto plano de unos tramos (para aria-label, <title>…). */
export const plain = (children: Span[] | undefined) => (children ?? []).map((c) => c.text).join("").replace(/\s+/g, " ").trim();

/** Token de color → var(--token); un hex pasa tal cual. */
export const color = (t: Tone | string | undefined): string | undefined => (t ? (t.startsWith("#") || t.startsWith("rgb") ? t : `var(--${t})`) : undefined);

/** Posición de retícula → custom properties que consume `.at` en styles.css. */
export function placeStyle(p: Place | undefined): string {
  if (!p) return "";
  return [`--c:${p.col}`, `--r:${p.row}`, `--w:${p.cols}`, p.rows ? `--h:${p.rows}` : "", p.z != null ? `--z:${p.z}` : ""].filter(Boolean).join(";");
}

/** Une declaraciones CSS ignorando las vacías. */
export const css = (...parts: (string | false | undefined | null)[]) => parts.filter(Boolean).join(";") || undefined;

/** px del diseño de 1440 → rem (1rem = 10 px de diseño en escritorio). */
export const rem = (px: number) => `${Math.round(px * 100) / 1000}rem`;
