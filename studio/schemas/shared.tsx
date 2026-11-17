import type { ReactNode } from "react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { ToneInput } from "./ToneInput";
import { isTone } from "./tones";

// ───────────────────────── Composición ─────────────────────────
// Los campos que colocan o ajustan visualmente un elemento van plegados en este fieldset,
// para que quien edita vea primero el contenido (textos, imágenes, enlaces, videos).

export const COMP = "composicion";
export const compFieldset = {
  name: COMP,
  title: "Composición",
  description:
    "Ajustes de diseño. La página de escritorio se compone sobre una retícula de 144 columnas (1 unidad = 10 px en el diseño de 1440 px de ancho); las filas miden lo mismo que una columna. En tablet y móvil la retícula se ignora y los elementos fluyen en el orden de la lista.",
  options: { collapsible: true, collapsed: true },
};

const GRID = "Retícula de escritorio de 144 columnas: 1 unidad = 10 px del diseño de 1440 px.";

/** Campos de una posición en la retícula (los comparten `place` y las tramas de puntos). */
export const placeFields = () => [
  defineField({ name: "col", title: "Columna inicial", type: "number", description: `De 1 (borde izquierdo) a 144. ${GRID}`, validation: (r) => r.required().integer().min(1).max(144) }),
  defineField({ name: "row", title: "Fila inicial", type: "number", description: "Filas cuadradas del mismo tamaño que una columna, contadas desde el borde superior de la sección (1 = arriba). Puede ser negativa para subir sobre la sección anterior.", validation: (r) => r.required().integer() }),
  defineField({ name: "cols", title: "Ancho (columnas)", type: "number", description: "Cuántas columnas ocupa. 144 = todo el ancho; 72 = la mitad.", validation: (r) => r.required().integer().min(1).max(144) }),
  defineField({ name: "rows", title: "Alto (filas)", type: "number", description: "Cuántas filas ocupa. Vacío = el alto que pida el contenido.", validation: (r) => r.integer().min(1) }),
];

/** `place`: { col, row, cols, rows?, z? }. */
export const place = defineType({
  name: "place",
  title: "Posición en la retícula",
  type: "object",
  description: `${GRID} En tablet y móvil se ignora: los elementos fluyen en el orden de la lista.`,
  options: { columns: 5 },
  fields: [
    ...placeFields(),
    defineField({ name: "z", title: "Capa", type: "number", description: "Orden de apilado cuando dos elementos se solapan: el número mayor queda encima.", validation: (r) => r.integer() }),
  ],
});

export const placeField = (extra: Record<string, unknown> = {}) =>
  defineField({ name: "place", title: "Posición en la retícula", type: "place", fieldset: COMP, ...extra });

export const variantField = () =>
  defineField({
    name: "variant",
    title: "Variante (clase CSS)",
    type: "string",
    fieldset: COMP,
    description: "Nombre corto que se vuelve la clase «v-<variante>» para ajustes finos en la hoja de estilos. Solo para desarrollo; déjalo como está.",
    validation: (r) => r.regex(/^[a-z0-9-]+$/).warning("Minúsculas, números y guiones."),
  });

/** Tramas de puntos magenta: arreglo de posiciones; con `over`, casilla para pintarlas sobre las fotos. */
export const dotsField = ({ over }: { over: boolean }) =>
  defineField({
    name: "dots",
    title: "Tramas de puntos",
    type: "array",
    fieldset: COMP,
    description: "Rectángulos de trama de puntos magenta de fondo. Cada uno se coloca en la retícula de 144 columnas.",
    of: [
      defineArrayMember({
        type: "object",
        name: "dotPatch",
        title: "Trama de puntos",
        options: { columns: 4 },
        fields: [
          ...placeFields(),
          ...(over ? [defineField({ name: "over", title: "Encima de las fotos", type: "boolean", description: "Activado: la trama se pinta sobre las fotos en vez de detrás." })] : []),
        ],
        preview: {
          select: { col: "col", row: "row", cols: "cols", rows: "rows", over: "over" },
          prepare: ({ col, row, cols, rows, over: o }) => ({ title: `Trama ${cols ?? "?"}×${rows ?? "?"}`, subtitle: `Columna ${col ?? "?"}, fila ${row ?? "?"}${o ? " · encima de las fotos" : ""}` }),
        },
      }),
    ],
  });

// ───────────────────────── Color ─────────────────────────

/** `tone`: string con un token de marca ("morado") o un hex libre ("#ffe867"). */
export const tone = defineType({
  name: "tone",
  title: "Color",
  type: "string",
  components: { input: ToneInput },
  validation: (r) => r.custom((v) => (v == null || isTone(v) ? true : "Elige un color de marca o escribe un hex, p. ej. #ffe867.")),
});

export const toneField = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: "tone", ...extra });

// ───────────────────────── Imagen ─────────────────────────

type ImageOpts = { required?: boolean; decorative?: boolean; description?: string; fieldset?: string; group?: string };

const altField = (decorative: boolean) =>
  defineField({
    name: "alt",
    title: "Texto alternativo",
    type: "string",
    description: decorative
      ? "Describe la imagen para quien no la ve. Esta imagen suele ser decorativa: si lo es, déjalo vacío."
      : "Obligatorio. Describe en una frase lo que muestra la imagen, para lectores de pantalla y buscadores.",
    validation: (r) =>
      decorative
        ? r
        : r.custom((alt, ctx) => {
            // Solo se exige cuando ya hay una imagen subida.
            const parent = ctx.parent as { asset?: unknown } | undefined;
            return !parent?.asset || (typeof alt === "string" && alt.trim()) ? true : "Escribe el texto alternativo de la imagen.";
          }),
  });

const imageDef = (decorative: boolean) => ({
  type: "image" as const,
  options: { hotspot: true },
  fields: [altField(decorative)],
});

/**
 * Imagen del modelo (`Img` en types.ts): `image` nativo de Sanity con `hotspot` y el campo `alt`.
 * Se define en línea (no como tipo con nombre) para que el `_type` guardado sea "image".
 */
export const imageField = (name: string, title: string, { required, decorative = false, ...extra }: ImageOpts = {}) =>
  defineField({
    name,
    title,
    ...imageDef(decorative),
    ...extra,
    ...(required ? { validation: (r: any) => r.required() } : {}),
  });

export const imageMember = ({ decorative = false }: { decorative?: boolean } = {}) =>
  defineArrayMember({ ...imageDef(decorative), title: "Imagen", preview: { select: { title: "alt", media: "asset" }, prepare: ({ title, media }: any) => ({ title: title || "Imagen (sin texto alternativo)", media }) } });

// ───────────────────────── Texto enriquecido ─────────────────────────
// Portable Text estándar. Los enlaces son la anotación `link` (viven en `markDefs` del bloque);
// `normalize()` en site/src/lib/text.ts los convierte al `href` por tramo que pintan los componentes.

const Medium = ({ children }: { children?: ReactNode }) => <span style={{ fontWeight: 500 }}>{children}</span>;
const MediumIcon = () => <span style={{ fontWeight: 500 }}>M</span>;

const LINK = /^(\/|#|https?:\/\/|mailto:|tel:)\S*$/;

const bodyBlock = () =>
  defineArrayMember({
    type: "block",
    styles: [{ title: "Párrafo", value: "normal" }],
    lists: [],
    marks: {
      decorators: [
        { title: "Negrita", value: "strong" },
        { title: "Itálica", value: "em" },
        { title: "Seminegrita (peso 500)", value: "medium", icon: MediumIcon, component: Medium },
        { title: "Subrayado", value: "underline" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "Enlace",
          fields: [
            defineField({
              name: "href",
              title: "Dirección",
              type: "string",
              description: "Página externa (https://…), página del sitio (/equipo/), ancla de esta página (#bitacora), correo (mailto:…) o teléfono (tel:…).",
              validation: (r) => r.required().regex(LINK, { name: "enlace" }).error("Debe empezar por https://, /, #, mailto: o tel: y no llevar espacios."),
            }),
          ],
        },
      ],
    },
  });

/** Texto enriquecido (`Block[]`): solo párrafos, con negrita, itálica, seminegrita, subrayado y enlaces. */
export const richText = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({ name, title, type: "array", of: [bodyBlock()], ...extra });

/**
 * Titular de una línea (`Span[]` en types.ts): un solo párrafo cuyo único formato es la itálica.
 * El Studio lo guarda como un bloque de Portable Text; `normalize()` lo aplana a sus tramos.
 */
export const titleText = (name: string, title: string, extra: Record<string, unknown> = {}) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "block",
        styles: [{ title: "Titular", value: "normal" }],
        lists: [],
        marks: { decorators: [{ title: "Itálica", value: "em" }], annotations: [] },
      }),
    ],
    validation: (r) => r.required().max(1).error("El titular es un solo párrafo. Para partir la línea usa Mayús + Intro."),
    ...extra,
  });

// ───────────────────────── Vistas previas ─────────────────────────

type AnyBlock = { _type?: string; children?: { text?: string }[]; text?: string };

/** Texto plano de un campo de texto enriquecido o de titular, para las vistas previas. */
export const plain = (blocks: unknown, max = 90): string => {
  const text = (Array.isArray(blocks) ? (blocks as AnyBlock[]) : [])
    .map((b) => (b?.children ? b.children.map((c) => c?.text ?? "").join("") : (b?.text ?? "")))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
};

export const where = (p?: { col?: number; row?: number; cols?: number }) => (p?.col != null ? `col. ${p.col}, fila ${p.row ?? "?"}, ${p.cols ?? "?"} de ancho` : "sin posición");

/** Campos compartidos por todas las secciones. */
export const anchorField = () =>
  defineField({
    name: "anchor",
    title: "Ancla",
    type: "string",
    fieldset: COMP,
    description: "Identificador de la sección para enlazarla desde otro lugar: con «bitacora», el enlace es «#bitacora». Minúsculas, sin espacios ni tildes.",
    validation: (r) => r.regex(/^[a-z][a-z0-9-]*$/).error("Minúsculas, números y guiones; debe empezar por una letra."),
  });

export const youtubeIdField = (extra: Record<string, unknown> = {}) =>
  defineField({
    name: "youtubeId",
    title: "ID del video de YouTube",
    type: "string",
    description: "Lo que va después de «v=» en la dirección del video: en youtube.com/watch?v=dQw4w9WgXcQ es «dQw4w9WgXcQ». Mientras empiece por «TODO», el sitio muestra un hueco de «video pendiente».",
    ...extra,
  });
