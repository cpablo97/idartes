import { defineArrayMember, defineField, defineType } from "sanity";
import { canvasMembers } from "./items";
import { anchorField, COMP, compFieldset, dotsField, imageField, imageMember, plain, richText, toneField, youtubeIdField } from "./shared";
import { HEX } from "./tones";

// Secciones del page builder: un tipo por cada `_type` de `Section` en site/src/lib/types.ts,
// con los mismos nombres de campo. En cada una, primero el contenido y al final «Composición».

const req = (r: any) => r.required();
const count = (n: number | undefined, one: string, many: string) => `${n ?? 0} ${n === 1 ? one : many}`;
/** En las vistas previas, Sanity entrega los arreglos de objetos como un objeto con claves "0", "1"…: se normaliza a arreglo. */
const arr = (v: unknown): any[] => (Array.isArray(v) ? v : v && typeof v === "object" ? Object.values(v as Record<string, unknown>) : []);
const len = (v: unknown) => arr(v).length;

/** Banda de fondo a sangre detrás de una sección. */
const bandField = () =>
  defineField({
    name: "band",
    title: "Banda de fondo",
    type: "object",
    fieldset: COMP,
    description: "Fondo que cruza toda la ventana detrás de la sección: un color, una foto o ambos.",
    fields: [
      toneField("color", "Color"),
      imageField("image", "Foto de fondo", { decorative: true }),
    ],
  });

const rowsField = (description: string) =>
  defineField({ name: "rows", title: "Alto del lienzo (filas)", type: "number", fieldset: COMP, description, validation: (r) => r.integer().min(1) });

// ───────────────────────── collage ─────────────────────────

export const collage = defineType({
  name: "collage",
  title: "Collage",
  type: "object",
  description: "Composición libre de fotos, textos, titulares y tarjetas.",
  fieldsets: [compFieldset],
  fields: [
    defineField({
      name: "items",
      title: "Elementos",
      type: "array",
      description: "Fotos, textos, titulares, tarjetas, líneas y avisos. El orden de la lista es el orden de lectura en tablet y móvil; en escritorio cada elemento va donde diga su posición.",
      of: canvasMembers(),
    }),
    { ...rowsField("Alto total del collage en filas de la retícula (una fila = 10 px del diseño de 1440; 60 filas = 600 px). Debe alcanzar para el elemento que llegue más abajo."), validation: (r: any) => r.required().integer().min(1), initialValue: 40 },
    dotsField({ over: true }),
    bandField(),
    anchorField(),
  ],
  preview: {
    select: { items: "items", anchor: "anchor", media: "items.0.image" },
    prepare: ({ items, anchor }) => {
      const list = arr(items) as any[];
      const first = list.find((i) => i?._type === "displayTitle" || i?._type === "textItem");
      return { title: plain(first?.text ?? first?.body, 60) || (anchor ? `#${anchor}` : "Collage"), subtitle: `Collage · ${count(list.length, "elemento", "elementos")}${anchor ? ` · #${anchor}` : ""}` };
    },
  },
});

// ───────────────────────── hero ─────────────────────────

export const hero = defineType({
  name: "hero",
  title: "Cabecera fotográfica",
  type: "object",
  description: "Foto a todo el ancho con la que abren las páginas interiores. Con un ID de YouTube, además es un video.",
  fieldsets: [compFieldset],
  fields: [
    imageField("image", "Foto", { required: true, description: "Foto de fondo de la cabecera. Marca el punto focal para decidir qué se conserva al recortar." }),
    defineField({ name: "eyebrow", title: "Rótulo", type: "string", description: "Texto corto en letra de puntos, centrado sobre la foto (p. ej. «PA EL CAMINO», «CHAPICARTÓN»)." }),
    defineField({ name: "title", title: "Título de página", type: "string", description: "Título pequeño centrado sobre la foto." }),
    defineField({ name: "phrase", title: "Frase", type: "text", rows: 2, description: "Frase centrada en letra grande." }),
    defineField({ name: "footnote", title: "Nota al pie", type: "text", rows: 2, description: "Texto pequeño en el borde inferior de la foto (crédito, aclaración)." }),
    youtubeIdField({ description: "Opcional. Si se llena, la foto se vuelve el póster de un video: lo que va después de «v=» en la dirección de YouTube. Mientras empiece por «TODO», el sitio muestra «video pendiente»." }),
    defineField({ name: "videoTitle", title: "Título del video", type: "string", description: "Nombre del video para lectores de pantalla. Solo hace falta si hay ID de YouTube." }),
    defineField({ name: "blur", title: "Foto desenfocada", type: "boolean", fieldset: COMP, description: "Desenfoca la foto para que el texto se lea mejor." }),
    defineField({ name: "titleFont", title: "Tipografía del título", type: "string", fieldset: COMP, options: { list: [{ title: "Mono (Xanh Mono)", value: "mono" }, { title: "Doto (puntos)", value: "doto" }, { title: "Sans", value: "sans" }] } }),
    toneField("tone", "Color de los textos", { fieldset: COMP, description: "Color del rótulo, el título y la frase sobre la foto." }),
    toneField("footnoteTone", "Color de la nota al pie", { fieldset: COMP }),
    defineField({ name: "footnotePlace", title: "Lugar de la nota al pie", type: "string", fieldset: COMP, options: { list: [{ title: "Sobre la foto", value: "over" }, { title: "Debajo de la foto", value: "below" }], layout: "radio", direction: "horizontal" } }),
    anchorField(),
  ],
  preview: {
    select: { eyebrow: "eyebrow", title: "title", phrase: "phrase", youtubeId: "youtubeId", media: "image" },
    prepare: ({ eyebrow, title, phrase, youtubeId, media }) => ({ title: eyebrow || title || phrase || "Cabecera", subtitle: youtubeId ? "Cabecera fotográfica con video" : "Cabecera fotográfica", media }),
  },
});

// ───────────────────────── cardGrid ─────────────────────────

export const cardGrid = defineType({
  name: "cardGrid",
  title: "Tarjetas",
  type: "object",
  description: "Índice de tarjetas que llevan a otras páginas: el de Inicio o la fila «Explora más».",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Título", type: "string", description: "Opcional. Encabezado sobre la fila (p. ej. «Explora más»)." }),
    defineField({
      name: "items",
      title: "Tarjetas",
      type: "array",
      description: "Una tarjeta por página de destino. En la disposición libre también caben titulares grandes entre las tarjetas.",
      of: [defineArrayMember({ type: "card" }), defineArrayMember({ type: "displayTitle" })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "layout",
      title: "Disposición",
      type: "string",
      fieldset: COMP,
      description: "«Fila»: las tarjetas van una junto a otra, de a cuatro (Explora más). «Libre»: cada tarjeta se coloca en la retícula de 144 columnas con su posición (índice de Inicio).",
      options: { list: [{ title: "Fila", value: "row" }, { title: "Libre (retícula)", value: "free" }], layout: "radio", direction: "horizontal" },
      initialValue: "row",
      validation: req,
    }),
    rowsField("Solo en disposición libre: alto total en filas de la retícula (una fila = 10 px del diseño de 1440)."),
    dotsField({ over: true }),
    anchorField(),
  ],
  preview: {
    select: { title: "title", items: "items", layout: "layout", media: "items.0.image" },
    prepare: ({ title, items, layout, media }) => ({ title: title || (layout === "free" ? "Índice de tarjetas" : "Fila de tarjetas"), subtitle: `Tarjetas · ${count(len(items), "elemento", "elementos")}`, media }),
  },
});

// ───────────────────────── video ─────────────────────────

export const video = defineType({
  name: "video",
  title: "Video",
  type: "object",
  description: "Un video de YouTube con su texto de presentación. El reproductor solo se carga al hacer clic.",
  fieldsets: [compFieldset],
  fields: [
    youtubeIdField({ validation: req }),
    defineField({ name: "title", title: "Título del video", type: "string", description: "Nombre del video; lo anuncian los lectores de pantalla y el botón de reproducir.", validation: req }),
    richText("intro", "Texto de presentación", { description: "Opcional. Se lee antes del video." }),
    richText("caption", "Pie del video", { description: "Opcional. Se lee debajo del video." }),
    imageField("poster", "Póster", { description: "Imagen que se ve antes de reproducir." }),
    defineField({ name: "rule", title: "Línea separadora", type: "boolean", fieldset: COMP, description: "Dibuja una línea morada sobre la sección." }),
    anchorField(),
  ],
  preview: {
    select: { title: "title", youtubeId: "youtubeId", media: "poster" },
    prepare: ({ title, youtubeId, media }) => ({ title: title || "Video", subtitle: `Video · ${!youtubeId || String(youtubeId).startsWith("TODO") ? "pendiente" : youtubeId}`, media }),
  },
});

// ───────────────────────── videoList ─────────────────────────

export const videoList = defineType({
  name: "videoList",
  title: "Lista de videos",
  type: "object",
  description: "Varios videos de YouTube en lista (los videotutoriales).",
  fieldsets: [compFieldset],
  fields: [
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "videoEntry",
          title: "Video",
          fields: [
            defineField({ name: "label", title: "Rótulo", type: "string", description: "Texto corto que identifica el video en la lista (p. ej. «Video 1»).", validation: req }),
            defineField({ name: "title", title: "Título", type: "string", validation: req }),
            defineField({ name: "description", title: "Descripción", type: "text", rows: 3 }),
            youtubeIdField({ validation: req }),
            imageField("poster", "Póster", { description: "Imagen que se ve antes de reproducir." }),
          ],
          preview: {
            select: { title: "title", label: "label", media: "poster" },
            prepare: ({ title, label, media }) => ({ title: title || "Video", subtitle: label, media }),
          },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    anchorField(),
  ],
  preview: {
    select: { videos: "videos" },
    prepare: ({ videos }) => ({ title: "Lista de videos", subtitle: count(len(videos), "video", "videos") }),
  },
});

// ───────────────────────── map ─────────────────────────

const DAYS = [
  { title: "Domingo", value: 0 },
  { title: "Lunes", value: 1 },
  { title: "Martes", value: 2 },
  { title: "Miércoles", value: 3 },
  { title: "Jueves", value: 4 },
  { title: "Viernes", value: 5 },
  { title: "Sábado", value: 6 },
];
const HOUR = /^(([01]\d|2[0-3]):[0-5]\d|24:00)$/;
const hourField = (name: string, title: string, extra = "") =>
  defineField({ name, title, type: "string", description: `En 24 horas, HH:MM (p. ej. 08:00 o 15:30). Hora de Bogotá.${extra}`, validation: (r) => r.required().regex(HOUR, { name: "hora" }).error("Formato HH:MM en 24 horas, p. ej. 15:30.") });
const latField = (title = "Latitud") => defineField({ name: "lat", title, type: "number", description: "Grados decimales; en Bogotá ronda 4,6 (p. ej. 4.6486).", validation: (r) => r.required().min(-90).max(90) });
const lngField = (title = "Longitud") => defineField({ name: "lng", title, type: "number", description: "Grados decimales; en Bogotá ronda −74 (p. ej. -74.0628).", validation: (r) => r.required().min(-180).max(180) });

/** Lugar del mapa (`MapPlace`). */
export const mapPlace = defineType({
  name: "mapPlace",
  title: "Lugar del mapa",
  type: "object",
  fieldsets: [{ name: "ubicacion", title: "Ubicación en el mapa", description: "Coordenadas del marcador. En Google Maps: clic derecho sobre el lugar → el primer renglón del menú son latitud y longitud.", options: { columns: 2 } }],
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: req }),
    defineField({ name: "category", title: "Categoría", type: "string", description: "La «clave» de una de las categorías de la leyenda de este mapa (p. ej. comedor, bano, acopio). Define el color del marcador.", validation: req }),
    defineField({ name: "kind", title: "Tipo de lugar", type: "string", description: "Se lee bajo el nombre (p. ej. «Comedor comunitario»)." }),
    defineField({ name: "address", title: "Dirección", type: "string", validation: req }),
    defineField({ name: "service", title: "Servicio", type: "text", rows: 2, description: "Qué ofrece el lugar." }),
    defineField({ name: "schedule", title: "Horario (como se lee)", type: "string", description: "Tal cual debe aparecer en la tarjeta (p. ej. «Sábados · 12:00–3:00 p. m.»)." }),
    defineField({
      name: "hours",
      title: "Horario (para el aviso Abierto/Cerrado)",
      type: "array",
      description: "Opcional. Una franja por cada grupo de días con el mismo horario. Con esto el sitio calcula si el lugar está abierto ahora.",
      of: [
        defineArrayMember({
          type: "object",
          name: "openingHours",
          title: "Franja horaria",
          fields: [
            defineField({ name: "days", title: "Días", type: "array", of: [defineArrayMember({ type: "number" })], options: { list: DAYS, layout: "grid" }, validation: (r) => r.required().min(1) }),
            hourField("open", "Abre"),
            hourField("close", "Cierra", " Para un lugar abierto todo el día: abre 00:00 y cierra 24:00."),
          ],
          preview: {
            select: { days: "days", open: "open", close: "close" },
            prepare: ({ days, open, close }) => ({ title: `${open ?? "?"}–${close ?? "?"}`, subtitle: arr(days).map((d: number) => DAYS[d]?.title).filter(Boolean).join(", ") }),
          },
        }),
      ],
    }),
    imageField("photo", "Foto del lugar"),
    defineField({ name: "demo", title: "Lugar de ejemplo", type: "boolean", description: "Marca los lugares inventados de relleno: su tarjeta dice «Ejemplo». Desactívalo en los lugares reales." }),
    { ...latField(), fieldset: "ubicacion" },
    { ...lngField(), fieldset: "ubicacion" },
  ],
  preview: {
    select: { title: "name", kind: "kind", address: "address", demo: "demo", media: "photo" },
    prepare: ({ title, kind, address, demo, media }) => ({ title: title || "Lugar", subtitle: [demo && "EJEMPLO", kind, address].filter(Boolean).join(" · "), media }),
  },
});

export const map = defineType({
  name: "map",
  title: "Mapa",
  type: "object",
  description: "Mapa de lugares con marcadores por categoría, filtro en la leyenda y tarjeta de cada lugar.",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: req }),
    richText("body", "Texto de presentación"),
    defineField({
      name: "legend",
      title: "Leyenda (categorías)",
      type: "array",
      description: "Cada categoría pinta sus marcadores de un color y sirve de filtro.",
      of: [
        defineArrayMember({
          type: "object",
          name: "legendEntry",
          title: "Categoría",
          fields: [
            defineField({ name: "label", title: "Nombre", type: "string", description: "Como se lee en la leyenda (p. ej. «Comedores»).", validation: req }),
            defineField({ name: "key", title: "Clave", type: "string", description: "Identificador corto, en minúsculas y sin tildes (p. ej. «comedor»). Es lo que se escribe en la «Categoría» de cada lugar; si la cambias, cámbiala también allí.", validation: (r) => r.required().regex(/^[a-z0-9-]+$/, { name: "clave" }).error("Minúsculas, números y guiones.") }),
            defineField({ name: "color", title: "Color del marcador", type: "string", description: "Color en hex, p. ej. #0048d8.", validation: (r) => r.required().regex(HEX, { name: "hex" }).error("Escribe un color hex, p. ej. #0048d8.") }),
          ],
          preview: { select: { title: "label", key: "key", color: "color" }, prepare: ({ title, key, color }) => ({ title: title || "Categoría", subtitle: `${key ?? ""} · ${color ?? ""}` }) },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "places",
      title: "Lugares",
      type: "array",
      of: [defineArrayMember({ type: "mapPlace" })],
      validation: (r) =>
        r.custom((places, ctx) => {
          const keys = new Set((((ctx.parent as any)?.legend ?? []) as any[]).map((l) => l?.key));
          const bad = ((places ?? []) as any[]).filter((p) => p?.category && !keys.has(p.category));
          return bad.length ? { message: `Categoría que no está en la leyenda: ${bad.map((p) => `${p.name ?? "lugar"} (${p.category})`).join(", ")}.`, paths: bad.map((p) => [{ _key: p._key }, "category"]) } : true;
        }),
    }),
    defineField({ name: "demoLabel", title: "Aviso de lugares de ejemplo", type: "string", description: "Texto que se muestra sobre el mapa mientras haya lugares de relleno (p. ej. «Lugares de ejemplo»). Bórralo cuando todos sean reales." }),
    richText("note", "Nota", { description: "Fuentes y fecha de actualización de los lugares." }),
    imageField("placeholder", "Imagen de respaldo", { decorative: true, description: "Se ve mientras el mapa carga o si el navegador no tiene JavaScript: una captura del mapa." }),
    defineField({ name: "center", title: "Centro inicial", type: "object", fieldset: COMP, description: "Punto en el que arranca centrado el mapa.", options: { columns: 2 }, fields: [latField(), lngField()], validation: req }),
    defineField({ name: "zoom", title: "Acercamiento inicial", type: "number", fieldset: COMP, description: "Nivel de zoom al abrir: 15 muestra todo Chapinero; cada número más acerca al doble.", initialValue: 15, validation: (r) => r.required().min(1).max(20) }),
    defineField({ name: "baseMap", title: "Mapa base", type: "string", fieldset: COMP, description: "Archivo con las calles y parques dibujados (lo genera desarrollo). Vacío = /assets/mapa/chapinero.json." }),
    anchorField(),
  ],
  preview: {
    select: { title: "title", places: "places", media: "placeholder" },
    prepare: ({ title, places, media }) => ({ title: title || "Mapa", subtitle: `Mapa · ${count(len(places), "lugar", "lugares")}`, media }),
  },
});

// ───────────────────────── gallery ─────────────────────────

export const gallery = defineType({
  name: "gallery",
  title: "Galería",
  type: "object",
  description: "Galería de fotos en espiral.",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Rótulo", type: "string", description: "Rótulo corto de la sección." }),
    defineField({ name: "heading", title: "Encabezado", type: "string" }),
    richText("body", "Texto"),
    defineField({
      name: "images",
      title: "Fotos",
      type: "array",
      description: "Entre 8 y 12 fotos es lo que mejor se ve en la espiral.",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryImage",
          title: "Foto",
          fields: [imageField("image", "Foto", { required: true }), defineField({ name: "caption", title: "Pie de foto", type: "string" })],
          preview: { select: { caption: "caption", alt: "image.alt", media: "image" }, prepare: ({ caption, alt, media }) => ({ title: caption || alt || "Foto", media }) },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    anchorField(),
  ],
  preview: {
    select: { title: "title", heading: "heading", images: "images", media: "images.0.image" },
    prepare: ({ title, heading, images, media }) => ({ title: heading || title || "Galería", subtitle: `Galería · ${count(len(images), "foto", "fotos")}`, media }),
  },
});

// ───────────────────────── bitacora ─────────────────────────

export const bitacora = defineType({
  name: "bitacora",
  title: "Bitácora",
  type: "object",
  description: "Visor de las láminas de la bitácora.",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    richText("intro", "Texto de presentación"),
    defineField({
      name: "pages",
      title: "Láminas",
      type: "array",
      description: "En orden de lectura. En modo libro, cada par de láminas forma una doble página.",
      options: { layout: "grid" },
      of: [
        defineArrayMember({
          type: "object",
          name: "bitacoraPage",
          title: "Lámina",
          fields: [imageField("image", "Lámina", { required: true })],
          preview: { select: { alt: "image.alt", media: "image" }, prepare: ({ alt, media }) => ({ title: alt || "Lámina", media }) },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "mode",
      title: "Modo del visor",
      type: "string",
      fieldset: COMP,
      description: "«Deslizar»: una lámina a la vez. «Libro»: se pasa de a dos páginas.",
      options: { list: [{ title: "Deslizar", value: "slider" }, { title: "Libro", value: "book" }], layout: "radio", direction: "horizontal" },
      initialValue: "slider",
      validation: req,
    }),
    anchorField(),
  ],
  preview: {
    select: { title: "title", pages: "pages", mode: "mode", media: "pages.0.image" },
    prepare: ({ title, pages, mode, media }) => ({ title: title || "Bitácora", subtitle: `Bitácora (${mode === "book" ? "libro" : "deslizar"}) · ${count(len(pages), "lámina", "láminas")}`, media }),
  },
});

// ───────────────────────── gameEmbed ─────────────────────────

export const gameEmbed = defineType({
  name: "gameEmbed",
  title: "Videojuego (itch.io)",
  type: "object",
  description: "El videojuego incrustado desde itch.io: se carga al pulsar «Jugar».",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Nombre del juego", type: "string", description: "Arma el botón («Jugar Chapicartón») y el título del marco del juego.", validation: req }),
    defineField({ name: "pageUrl", title: "Página del juego en itch.io", type: "url", description: "Dirección pública del juego; siempre queda como enlace visible.", validation: req }),
    defineField({ name: "embedUrl", title: "Dirección para incrustar", type: "string", description: "La dirección «https://itch.io/embed-upload/<número>» del juego. En itch.io: Distribute → Embed game.", validation: (r) => r.required().regex(/^https:\/\/\S+$/, { name: "url" }).error("Debe ser una dirección https:// completa.") }),
    defineField({ name: "pending", title: "Juego pendiente", type: "boolean", description: "Activado: todavía no hay juego para incrustar; el sitio muestra un hueco de «pendiente» con el enlace a itch.io. Desactívalo cuando la dirección para incrustar sea la definitiva." }),
    imageField("poster", "Imagen de portada", { description: "Se ve mientras no se ha pulsado «Jugar»." }),
    defineField({ name: "playLabel", title: "Texto del botón", type: "string", description: "Vacío = «Jugar <nombre del juego>»." }),
    defineField({ name: "linkLabel", title: "Texto del enlace a itch.io", type: "string", description: "Vacío = «Abrir en itch.io»." }),
    anchorField(),
  ],
  preview: {
    select: { title: "title", pending: "pending", media: "poster" },
    prepare: ({ title, pending, media }) => ({ title: title || "Videojuego", subtitle: `Videojuego de itch.io${pending ? " · pendiente" : ""}`, media }),
  },
});

// ───────────────────────── people ─────────────────────────

export const person = defineType({
  name: "person",
  title: "Persona",
  type: "object",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string", validation: req }),
    defineField({ name: "role", title: "Disciplinas", type: "string", description: "Separadas por « · » (p. ej. «Diseño · Ilustración»)." }),
    richText("bio", "Semblanza"),
    imageField("photo", "Foto", { required: true, description: "Marca el punto focal sobre la cara: es el punto que queda fijo al recortar y al acercar." }),
    defineField({
      name: "links",
      title: "Enlaces",
      type: "array",
      description: "Redes o sitio web de la persona.",
      of: [
        defineArrayMember({
          type: "object",
          name: "personLink",
          title: "Enlace",
          fields: [
            defineField({ name: "label", title: "Texto", type: "string", description: "p. ej. Instagram", validation: req }),
            defineField({ name: "url", title: "Dirección", type: "url", validation: (r) => r.required().uri({ scheme: ["http", "https", "mailto"] }) }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
    defineField({ name: "zoom", title: "Acercamiento de la foto", type: "number", fieldset: COMP, description: "1 = la foto llena el marco; 2 = al doble. El punto focal de la foto queda fijo.", validation: (r) => r.min(1).max(6) }),
    defineField({ name: "flip", title: "Foto en espejo", type: "boolean", fieldset: COMP, description: "Voltea la foto horizontalmente." }),
    toneField("tone", "Color de la ficha", { fieldset: COMP, description: "Solo si esta ficha debe tener un color distinto al del grupo." }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const people = defineType({
  name: "people",
  title: "Personas",
  type: "object",
  description: "Grupo de fichas de persona (página Equipo): un titular y una ficha por persona.",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Titular del grupo", type: "string", description: "p. ej. «Cocreadores», «Laboratorista».", validation: req }),
    defineField({ name: "people", title: "Personas", type: "array", of: [defineArrayMember({ type: "person" })], validation: (r) => r.required().min(1) }),
    toneField("titleTone", "Color del titular", { fieldset: COMP }),
    defineField({ name: "titleAlign", title: "Alineación del titular", type: "string", fieldset: COMP, options: { list: [{ title: "Izquierda", value: "left" }, { title: "Derecha", value: "right" }], layout: "radio", direction: "horizontal" } }),
    toneField("tone", "Color de las fichas", { fieldset: COMP, description: "Fondo de las fichas del grupo." }),
    toneField("roleTone", "Color de las disciplinas", { fieldset: COMP, description: "Color de la línea de disciplinas: claro sobre lila, morado sobre los colores vivos." }),
    anchorField(),
  ],
  preview: {
    select: { title: "title", people: "people", media: "people.0.photo" },
    prepare: ({ title, people: list, media }) => ({ title: title || "Personas", subtitle: `Personas · ${count(len(list), "ficha", "fichas")}`, media }),
  },
});

// ───────────────────────── controls ─────────────────────────

const controlKey = defineArrayMember({
  type: "object",
  name: "controlKey",
  title: "Tecla",
  fields: [
    defineField({ name: "key", title: "Tecla", type: "string", description: "Lo que se lee en la tecla (W, Espacio, Esc…). Si la tecla lleva una flecha, escribe aquí su nombre («Flecha arriba») para los lectores de pantalla.", validation: req }),
    defineField({ name: "label", title: "Acción", type: "string", description: "Qué hace la tecla; se lee debajo." }),
    defineField({ name: "icon", title: "Flecha", type: "string", description: "Dibuja una flecha en vez del texto de la tecla.", options: { list: [{ title: "Arriba", value: "up" }, { title: "Abajo", value: "down" }, { title: "Izquierda", value: "left" }, { title: "Derecha", value: "right" }] } }),
    defineField({ name: "size", title: "Tamaño", type: "string", description: "Vacío = tecla cuadrada.", options: { list: [{ title: "Barra espaciadora", value: "space" }, { title: "Ancha", value: "wide" }] } }),
  ],
  preview: { select: { title: "key", subtitle: "label" } },
});

export const controls = defineType({
  name: "controls",
  title: "Controles del juego",
  type: "object",
  description: "Cómo se juega con mando y con teclado.",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: req }),
    defineField({
      name: "gamepad",
      title: "Mando",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Título", type: "string", validation: req }),
        defineField({
          name: "groups",
          title: "Paneles del mando",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "gamepadGroup",
              title: "Panel",
              fieldsets: [compFieldset],
              fields: [
                defineField({ name: "title", title: "Título", type: "string", description: "p. ej. «Movimiento», «Acciones».", validation: req }),
                imageField("panel", "Dibujo del panel", { required: true, description: "Dibujo de los botones (SVG con su fondo lila). El texto alternativo describe los botones que muestra." }),
                defineField({
                  name: "labels",
                  title: "Etiquetas",
                  type: "array",
                  description: "Textos bajo el panel, uno por botón.",
                  of: [
                    defineArrayMember({
                      type: "object",
                      name: "panelLabel",
                      title: "Etiqueta",
                      fields: [
                        defineField({ name: "text", title: "Texto", type: "text", rows: 2, description: "Un salto de línea parte la etiqueta en dos renglones.", validation: req }),
                        defineField({ name: "x", title: "Posición horizontal (px de diseño)", type: "number", description: "Centro de la etiqueta, en px del diseño de 1440 contados desde el borde izquierdo del panel.", validation: req }),
                      ],
                      preview: { select: { title: "text", x: "x" }, prepare: ({ title, x }) => ({ title, subtitle: `x = ${x ?? "?"}` }) },
                    }),
                  ],
                }),
                defineField({ name: "width", title: "Ancho del panel (px de diseño)", type: "number", fieldset: COMP, description: "Ancho del dibujo en px del diseño de 1440 (el alto siempre es 234). 10 px = 1 columna de la retícula de 144.", validation: (r) => r.required().positive() }),
              ],
              preview: { select: { title: "title", media: "panel" }, prepare: ({ title, media }) => ({ title: title || "Panel", subtitle: "Panel del mando", media }) },
            }),
          ],
        }),
        imageField("photo", "Foto del mando", { description: "Foto decorativa junto a los paneles." }),
      ],
      validation: req,
    }),
    defineField({
      name: "keyboard",
      title: "Teclado",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Título", type: "string", validation: req }),
        defineField({
          name: "groups",
          title: "Grupos de teclas",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "keyGroup",
              title: "Grupo de teclas",
              fields: [
                defineField({ name: "title", title: "Título", type: "string", description: "p. ej. «Movimiento».", validation: req }),
                defineField({ name: "joiner", title: "Texto de unión", type: "string", description: "Texto entre un conjunto de teclas y el siguiente (p. ej. «O»)." }),
                defineField({
                  name: "clusters",
                  title: "Conjuntos de teclas",
                  type: "array",
                  of: [
                    defineArrayMember({
                      type: "object",
                      name: "keyCluster",
                      title: "Conjunto de teclas",
                      fieldsets: [compFieldset],
                      fields: [
                        defineField({ name: "keys", title: "Teclas", type: "array", of: [controlKey], validation: (r) => r.required().min(1) }),
                        defineField({ name: "layout", title: "Disposición", type: "string", fieldset: COMP, description: "«Cruz»: T invertida, como W / A S D o las flechas (la primera tecla va arriba). «Fila»: teclas en línea con su acción debajo.", options: { list: [{ title: "Cruz", value: "cross" }, { title: "Fila", value: "row" }], layout: "radio", direction: "horizontal" }, initialValue: "row", validation: req }),
                        defineField({ name: "indent", title: "Fila desplazada", type: "boolean", fieldset: COMP, description: "Desplaza la fila hacia la derecha, como en un teclado real." }),
                      ],
                      preview: {
                        select: { keys: "keys", layout: "layout" },
                        prepare: ({ keys, layout }) => ({ title: arr(keys).map((k: any) => k?.key).filter(Boolean).join(" · ") || "Teclas", subtitle: layout === "cross" ? "En cruz" : "En fila" }),
                      },
                    }),
                  ],
                }),
              ],
              preview: { select: { title: "title", clusters: "clusters" }, prepare: ({ title, clusters }) => ({ title: title || "Grupo de teclas", subtitle: count(len(clusters), "conjunto", "conjuntos") }) },
            }),
          ],
        }),
        defineField({ name: "photos", title: "Fotos decorativas", type: "array", description: "En este orden: teclado, mouse.", of: [imageMember({ decorative: true })], validation: (r) => r.max(2) }),
      ],
      validation: req,
    }),
    anchorField(),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Controles", subtitle: "Controles del juego" }) },
});

// ───────────────────────── data ─────────────────────────

const xy = (name: string, title: string, description: string, withD = false) =>
  defineField({
    name,
    title,
    type: "object",
    fieldset: COMP,
    description,
    options: { columns: withD ? 3 : 2 },
    fields: [
      defineField({ name: "x", title: "x", type: "number", validation: req }),
      defineField({ name: "y", title: "y", type: "number", validation: req }),
      ...(withD ? [defineField({ name: "d", title: "Diámetro", type: "number", validation: (r) => r.required().positive() })] : []),
    ],
    validation: req,
  });

export const data = defineType({
  name: "data",
  title: "Datos",
  type: "object",
  description: "Texto con enlace a la fuente, gráfico de círculos y/o tabla. Todos los bloques son opcionales.",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Rótulo", type: "string", description: "Rótulo de la sección, en letra de puntos." }),
    richText("body", "Texto"),
    defineField({
      name: "link",
      title: "Enlace a los datos",
      type: "object",
      description: "Se muestra al final del último párrafo del texto.",
      fields: [
        defineField({ name: "label", title: "Texto del enlace", type: "string", validation: req }),
        defineField({ name: "url", title: "Dirección", type: "string", description: "Dirección completa (https://…) del archivo o la página con los datos.", validation: req }),
      ],
    }),
    defineField({
      name: "chart",
      title: "Gráfico de círculos",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fieldsets: [compFieldset],
      fields: [
        defineField({ name: "title", title: "Título del gráfico", type: "string", description: "No se ve: lo anuncian los lectores de pantalla.", validation: req }),
        defineField({ name: "description", title: "Descripción", type: "text", rows: 3, description: "Qué muestra el gráfico, para quien no lo ve." }),
        defineField({
          name: "series",
          title: "Círculos",
          type: "array",
          description: "Del círculo mayor al menor.",
          of: [
            defineArrayMember({
              type: "object",
              name: "dataSeries",
              title: "Círculo",
              fieldsets: [compFieldset],
              fields: [
                defineField({ name: "label", title: "Rótulo", type: "string", validation: req }),
                defineField({ name: "value", title: "Cifra", type: "number", description: "La cifra que representa el círculo; se lee en la leyenda (el dibujo no es proporcional)." }),
                defineField({ name: "unit", title: "Unidad", type: "string", description: "p. ej. «noticias», «%»." }),
                toneField("tone", "Color", { description: "Color del punto y del rótulo de la leyenda.", validation: req }),
                toneField("ringTone", "Color del contorno", { fieldset: COMP, description: "Vacío = el mismo color del punto." }),
                xy("ring", "Círculo", "Esquina superior izquierda (x, y) y diámetro del círculo, en px de diseño dentro del lienzo del gráfico.", true),
                xy("dot", "Punto de la leyenda", "Centro del punto de la leyenda, en px de diseño; va sobre la circunferencia."),
                defineField({ name: "gap", title: "Separación del rótulo (px)", type: "number", fieldset: COMP, description: "Distancia entre el punto y su rótulo, en px de diseño. Vacío = 16." }),
              ],
              preview: { select: { title: "label", value: "value", unit: "unit" }, prepare: ({ title, value, unit }) => ({ title: title || "Círculo", subtitle: [value, unit].filter((v) => v != null && v !== "").join(" ") }) },
            }),
          ],
          validation: (r) => r.required().min(1),
        }),
        defineField({ name: "width", title: "Ancho del lienzo (px de diseño)", type: "number", fieldset: COMP, description: "En px del diseño de 1440 (1440 = todo el ancho = las 144 columnas de la retícula).", validation: (r) => r.required().positive() }),
        defineField({ name: "height", title: "Alto del lienzo (px de diseño)", type: "number", fieldset: COMP, validation: (r) => r.required().positive() }),
      ],
    }),
    defineField({
      name: "table",
      title: "Tabla",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fieldsets: [compFieldset],
      fields: [
        defineField({ name: "title", title: "Título de la tabla", type: "string", validation: req }),
        defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
        defineField({ name: "head", title: "Encabezados de columna", type: "array", of: [defineArrayMember({ type: "string" })], description: "Uno por columna, de izquierda a derecha.", validation: (r) => r.required().min(1) }),
        defineField({
          name: "rows",
          title: "Filas",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "tableRow",
              title: "Fila",
              fields: [defineField({ name: "cells", title: "Celdas", type: "array", of: [defineArrayMember({ type: "string" })], description: "Una por columna. La primera celda es el encabezado de la fila.", validation: (r) => r.required().min(1) })],
              preview: { select: { cells: "cells" }, prepare: ({ cells }) => ({ title: arr(cells).join(" · ") || "Fila vacía" }) },
            }),
          ],
          validation: (r) =>
            r.required().min(1).custom((rows, ctx) => {
              const cols = len((ctx.parent as any)?.head);
              const bad = ((rows ?? []) as any[]).filter((row) => cols && len(row?.cells) !== cols);
              return bad.length ? { message: `Cada fila debe tener ${cols} celdas, como los encabezados.`, paths: bad.map((row) => [{ _key: row._key }]) } : true;
            }),
        }),
        richText("note", "Nota al pie", { description: "Fuente o aclaración bajo la tabla." }),
        toneField("tone", "Color de fondo", { fieldset: COMP, description: "Fondo de la tarjeta de la tabla." }),
      ],
    }),
    anchorField(),
  ],
  preview: {
    select: { title: "title", chart: "chart.title", table: "table.title" },
    prepare: ({ title, chart, table }) => ({ title: title || table || chart || "Datos", subtitle: `Datos · ${[chart && "gráfico", table && "tabla"].filter(Boolean).join(" y ") || "texto"}` }),
  },
});

// ───────────────────────── timeline ─────────────────────────

export const timeline = defineType({
  name: "timeline",
  title: "Línea de tiempo",
  type: "object",
  description: "Pasos de un proceso unidos por una línea vertical. Cada paso es un pequeño collage.",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Encabezado", type: "string", description: "No se ve en la página: lo anuncian los lectores de pantalla." }),
    defineField({
      name: "steps",
      title: "Pasos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "timelineStep",
          title: "Paso",
          fieldsets: [compFieldset],
          fields: [
            defineField({ name: "title", title: "Título del paso", type: "string", description: "Se lee junto al punto de la línea.", validation: req }),
            defineField({ name: "items", title: "Elementos", type: "array", description: "Fotos y textos del paso. En su retícula, la fila 1 es la del punto y el título.", of: canvasMembers() }),
            { ...rowsField("Alto del paso en filas de la retícula (una fila = 10 px del diseño de 1440): la distancia de su punto al punto del paso siguiente."), title: "Alto del paso (filas)", validation: (r: any) => r.required().integer().min(1), initialValue: 40 },
          ],
          preview: { select: { title: "title", items: "items", media: "items.0.image" }, prepare: ({ title, items, media }) => ({ title: title || "Paso", subtitle: count(len(items), "elemento", "elementos"), media }) },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    bandField(),
    dotsField({ over: false }),
    anchorField(),
  ],
  preview: {
    select: { title: "title", steps: "steps" },
    prepare: ({ title, steps }) => ({ title: title || "Línea de tiempo", subtitle: `Línea de tiempo · ${count(len(steps), "paso", "pasos")}` }),
  },
});

export const sectionTypes = [collage, hero, cardGrid, video, videoList, mapPlace, map, gallery, bitacora, gameEmbed, person, people, controls, data, timeline];

/** Los `_type` que acepta `page.sections[]`, en el orden del menú «Agregar sección». */
export const sectionNames = ["hero", "collage", "cardGrid", "video", "videoList", "map", "gallery", "bitacora", "gameEmbed", "controls", "people", "data", "timeline"];
