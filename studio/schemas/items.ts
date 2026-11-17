import { defineArrayMember, defineField, defineType } from "sanity";
import { COMP, compFieldset, imageField, placeField, plain, richText, titleText, toneField, variantField, where } from "./shared";

// Elementos de un lienzo (`collage`, `cardGrid`, pasos de `timeline`). Corresponden a `CanvasItem` en site/src/lib/types.ts.

const levelField = (description: string) =>
  defineField({
    name: "level",
    title: "Nivel de encabezado",
    type: "number",
    fieldset: COMP,
    description,
    options: { list: [{ title: "Título principal (h1)", value: 1 }, { title: "Título de sección (h2)", value: 2 }, { title: "Subtítulo (h3)", value: 3 }] },
  });

export const imageItem = defineType({
  name: "imageItem",
  title: "Imagen",
  type: "object",
  fieldsets: [compFieldset],
  fields: [
    imageField("image", "Imagen", { required: true }),
    defineField({ name: "caption", title: "Pie de foto", type: "string", description: "Opcional. Se lee bajo la imagen." }),
    defineField({ name: "href", title: "Enlace", type: "string", description: "Opcional. Si se llena, toda la imagen es un enlace: una página del sitio (/equipo/) o una dirección completa (https://…)." }),
    placeField({ validation: (r: any) => r.required() }),
    defineField({ name: "fit", title: "Ajuste al marco", type: "string", fieldset: COMP, description: "«Cubrir» recorta la imagen para llenar el marco (lo normal; el punto focal decide qué se conserva). «Contener» la muestra entera.", options: { list: [{ title: "Cubrir (recorta)", value: "cover" }, { title: "Contener (entera)", value: "contain" }], layout: "radio", direction: "horizontal" } }),
    defineField({ name: "rotate", title: "Giro (grados)", type: "number", fieldset: COMP, description: "Grados de giro del marco; positivo = sentido del reloj. Vacío = sin giro." }),
    defineField({ name: "flip", title: "Espejo", type: "string", fieldset: COMP, description: "Voltea la imagen sobre un eje.", options: { list: [{ title: "Horizontal (x)", value: "x" }, { title: "Vertical (y)", value: "y" }], layout: "radio", direction: "horizontal" } }),
    defineField({ name: "radius", title: "Radio de esquina (px)", type: "number", fieldset: COMP, description: "Redondeo de las esquinas, en px del diseño de 1440.", validation: (r) => r.min(0) }),
    defineField({ name: "drift", title: "Deriva (parallax)", type: "number", fieldset: COMP, description: "Cuánto se desplaza la imagen al hacer scroll, en unidades de retícula (1 unidad = 10 px de diseño). 0 o vacío = quieta; lo usual es entre 1 y 4.", validation: (r) => r.min(0) }),
    variantField(),
  ],
  preview: {
    select: { alt: "image.alt", caption: "caption", media: "image", place: "place" },
    prepare: ({ alt, caption, media, place }) => ({ title: caption || alt || "Imagen", subtitle: `Imagen · ${where(place)}`, media }),
  },
});

export const textItem = defineType({
  name: "textItem",
  title: "Texto",
  type: "object",
  fieldsets: [compFieldset],
  fields: [
    richText("body", "Texto", { description: "Uno o varios párrafos. Admite negrita, itálica, seminegrita, subrayado y enlaces.", validation: (r: any) => r.required().min(1) }),
    placeField({ validation: (r: any) => r.required() }),
    toneField("tone", "Color del texto", { fieldset: COMP, description: "Vacío = morado, el color de texto del sitio." }),
    defineField({ name: "size", title: "Tamaño (px de diseño)", type: "number", fieldset: COMP, description: "Tamaño de letra en px del diseño de 1440 (16, 20, 24, 30, 36, 40, 46…). Vacío = 24.", validation: (r) => r.positive() }),
    defineField({ name: "font", title: "Tipografía", type: "string", fieldset: COMP, description: "Vacío = la de texto corrido (sans).", options: { list: [{ title: "Sans (texto corrido)", value: "sans" }, { title: "Mono (Xanh Mono)", value: "mono" }, { title: "Doto (rótulos de puntos)", value: "doto" }, { title: "Serif", value: "serif" }] } }),
    defineField({ name: "weight", title: "Peso", type: "number", fieldset: COMP, description: "Grosor de la letra: 400 normal, 500 seminegrita, 600, 700 negrita.", validation: (r) => r.integer().min(100).max(900) }),
    defineField({ name: "align", title: "Alineación", type: "string", fieldset: COMP, options: { list: [{ title: "Izquierda", value: "left" }, { title: "Derecha", value: "right" }, { title: "Centro", value: "center" }, { title: "Justificado", value: "justify" }] } }),
    defineField({ name: "nowrap", title: "Sin saltos de línea", type: "boolean", fieldset: COMP, description: "Mantiene el texto en una sola línea aunque no quepa en su ancho." }),
    levelField("Si se define, el primer párrafo se publica como encabezado de ese nivel (importa para buscadores y lectores de pantalla). Vacío = párrafo normal."),
    variantField(),
  ],
  preview: {
    select: { body: "body", place: "place", level: "level" },
    prepare: ({ body, place, level }) => ({ title: plain(body) || "Texto vacío", subtitle: `${level ? `Encabezado h${level}` : "Texto"} · ${where(place)}` }),
  },
});

export const displayTitle = defineType({
  name: "displayTitle",
  title: "Titular grande",
  type: "object",
  fieldsets: [compFieldset],
  fields: [
    titleText("text", "Titular", { description: "Palabras grandes del collage. Selecciona un tramo y márcalo en itálica si hace falta; Mayús + Intro parte la línea." }),
    toneField("tone", "Color", { validation: (r: any) => r.required() }),
    placeField({ validation: (r: any) => r.required() }),
    defineField({ name: "italic", title: "Todo en itálica", type: "boolean", fieldset: COMP }),
    defineField({ name: "rotate", title: "Giro", type: "number", fieldset: COMP, description: "En vertical el titular se lee de lado; en móvil vuelve a horizontal.", options: { list: [{ title: "Horizontal", value: 0 }, { title: "Vertical, de arriba abajo (90°)", value: 90 }, { title: "Vertical, de abajo arriba (−90°)", value: -90 }] } }),
    defineField({ name: "size", title: "Tamaño (px de diseño)", type: "number", fieldset: COMP, description: "En px del diseño de 1440. Vacío = 119,333.", validation: (r) => r.positive() }),
    defineField({ name: "align", title: "Alineación", type: "string", fieldset: COMP, options: { list: [{ title: "Izquierda", value: "left" }, { title: "Derecha", value: "right" }, { title: "Centro", value: "center" }] } }),
    levelField("Si se define, el titular se publica como encabezado de ese nivel. Vacío = texto decorativo."),
    variantField(),
  ],
  preview: {
    select: { text: "text", place: "place", rotate: "rotate" },
    prepare: ({ text, place, rotate }) => ({ title: plain(text) || "Titular vacío", subtitle: `Titular grande${rotate ? " vertical" : ""} · ${where(place)}` }),
  },
});

export const card = defineType({
  name: "card",
  title: "Tarjeta",
  type: "object",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "label", title: "Rótulo", type: "string", description: "Nombre de la página a la que lleva la tarjeta.", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Enlace", type: "string", description: "A dónde lleva: una página del sitio (/para-recicladores/) o una dirección completa (https://…).", validation: (r) => r.required() }),
    imageField("image", "Imagen", { required: true }),
    defineField({ name: "size", title: "Tamaño", type: "string", fieldset: COMP, options: { list: [{ title: "Pequeña (s)", value: "s" }, { title: "Mediana (m)", value: "m" }, { title: "Grande (l)", value: "l" }], layout: "radio", direction: "horizontal" }, initialValue: "m", validation: (r) => r.required() }),
    placeField({ description: "Solo se usa en el índice de disposición «libre»; en la fila «Explora más» las tarjetas van una junto a otra y la posición se ignora. Retícula de 144 columnas: 1 unidad = 10 px del diseño de 1440." }),
  ],
  preview: {
    select: { title: "label", href: "href", media: "image" },
    prepare: ({ title, href, media }) => ({ title: title || "Tarjeta", subtitle: `Tarjeta → ${href || "sin enlace"}`, media }),
  },
});

export const rule = defineType({
  name: "rule",
  title: "Línea",
  type: "object",
  description: "Línea horizontal de 1 px que separa bloques.",
  fieldsets: [compFieldset],
  fields: [
    placeField({ validation: (r: any) => r.required() }),
    defineField({ name: "bleed", title: "A sangre", type: "boolean", fieldset: COMP, description: "Activado: la línea cruza toda la ventana, más allá de las 144 columnas." }),
    toneField("tone", "Color", { fieldset: COMP, description: "Vacío = morado." }),
    variantField(),
  ],
  preview: {
    select: { place: "place", bleed: "bleed" },
    prepare: ({ place, bleed }) => ({ title: bleed ? "Línea a sangre" : "Línea", subtitle: `Línea · ${where(place)}` }),
  },
});

export const notice = defineType({
  name: "notice",
  title: "Aviso",
  type: "object",
  description: "Franja de color con icono de advertencia.",
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Título del aviso", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Mensaje", type: "text", rows: 3, validation: (r) => r.required() }),
    placeField({ validation: (r: any) => r.required() }),
    toneField("tone", "Color de la franja", { fieldset: COMP }),
  ],
  preview: {
    select: { title: "title", body: "body" },
    prepare: ({ title, body }) => ({ title: title || "Aviso", subtitle: `Aviso · ${body ?? ""}` }),
  },
});

/** Los seis elementos que acepta un lienzo. */
export const canvasMembers = () => ["imageItem", "textItem", "displayTitle", "card", "rule", "notice"].map((type) => defineArrayMember({ type }));

export const itemTypes = [imageItem, textItem, displayTitle, card, rule, notice];
