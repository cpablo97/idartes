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

// ───────────────────── Sanity → forma del sitio ─────────────────────
// El Studio guarda Portable Text estándar: los enlaces son anotaciones `link` en `markDefs` del bloque
// y los titulares (`displayTitle.text`, `settings.headerTitle`) son un bloque de un solo párrafo.
// Los componentes pintan la forma simplificada de types.ts (`href` en el tramo; titulares como `Span[]`).
// `normalize()` convierte la primera en la segunda y deja intacto lo que ya está simplificado (el seed local).

const MARKS: readonly string[] = ["strong", "em", "medium", "underline"];
/** Campos cuyo valor en types.ts es `Span[]` (en Sanity, un arreglo de bloques). */
const SPAN_FIELDS = new Set(["text", "headerTitle"]);

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

/** Tramo de Portable Text → `Span`: separa los decoradores de las claves de anotación y resuelve el enlace. */
function toSpan(c: Obj, links: Map<string, string>): Obj {
  const all = Array.isArray(c.marks) ? (c.marks as string[]) : [];
  const marks = all.filter((m) => MARKS.includes(m));
  const href = typeof c.href === "string" ? c.href : all.map((m) => links.get(m)).find(Boolean);
  const { marks: _marks, href: _href, ...rest } = c;
  return { ...rest, ...(marks.length ? { marks } : {}), ...(href ? { href } : {}) };
}

function toBlock(b: Obj): Obj {
  const links = new Map<string, string>();
  for (const d of Array.isArray(b.markDefs) ? (b.markDefs as unknown[]) : []) {
    if (isObj(d) && d._type === "link" && typeof d._key === "string" && typeof d.href === "string") links.set(d._key, d.href);
  }
  const { markDefs: _markDefs, ...rest } = b;
  return { ...rest, children: (Array.isArray(b.children) ? (b.children as unknown[]) : []).filter(isObj).map((c) => toSpan(c, links)) };
}

/** Bloques → tramos; cada párrafo después del primero empieza en línea nueva. */
const flatten = (blocks: Obj[]): Obj[] =>
  blocks.flatMap((b, i) => {
    const children = (Array.isArray(b.children) ? b.children : []) as Obj[];
    return i > 0 && children.length ? [{ ...children[0], text: `\n${children[0].text ?? ""}` }, ...children.slice(1)] : children;
  });

function walk(v: unknown, key?: string): unknown {
  if (Array.isArray(v)) {
    const out = v.filter((x) => x != null).map((x) => walk(x));
    return key && SPAN_FIELDS.has(key) && out.some((x) => isObj(x) && x._type === "block") ? flatten(out.filter(isObj)) : out;
  }
  if (!isObj(v)) return v;
  const out: Obj = {};
  // GROQ devuelve `null` en las proyecciones de campos ausentes (`poster{…}`): aquí vuelven a ser «no definido».
  for (const [k, x] of Object.entries(v)) if (x != null) out[k] = walk(x, k);
  // Una imagen de Sanity sin texto alternativo (decorativa) llega sin `alt`; los componentes esperan "".
  if ((out._type === "image" || isObj(out.asset)) && out.alt == null) out.alt = "";
  return out._type === "block" ? toBlock(out) : out;
}

/**
 * Lleva el contenido a la forma de types.ts, venga de Sanity (Portable Text estándar) o del seed (ya simplificado).
 * Es idempotente: `normalize(normalize(x))` da lo mismo que `normalize(x)`.
 */
export const normalize = <T>(data: unknown): T => walk(data) as T;
