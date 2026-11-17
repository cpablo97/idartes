import { defineArrayMember, defineField, defineType, getPublishedId } from "sanity";
import { sectionNames } from "./sections";
import { COMP, compFieldset, imageField, titleText, toneField } from "./shared";

const req = (r: any) => r.required();
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const HEADERS: Record<string, string> = { display: "Titular grande (Inicio)", small: "Titular pequeño sobre la foto", none: "Solo MENÚ" };

/** Página: una por ruta. Corresponde a `Page` en site/src/lib/types.ts. */
export const page = defineType({
  name: "page",
  title: "Página",
  type: "document",
  groups: [
    { name: "contenido", title: "Contenido", default: true },
    { name: "seo", title: "Buscadores y redes" },
  ],
  fieldsets: [compFieldset],
  fields: [
    defineField({ name: "title", title: "Título", type: "string", group: "contenido", description: "Nombre de la página; es el título de la pestaña si no se define otro en «Buscadores y redes».", validation: req }),
    defineField({
      name: "slug",
      title: "Dirección (slug)",
      type: "slug",
      group: "contenido",
      description: "Lo que va después del dominio: con «equipo», la página es ciudadycuerpo.com/equipo/. Déjalo VACÍO solo en la página de Inicio (ciudadycuerpo.com/). Cambiarlo rompe los enlaces que ya apunten a la página.",
      options: { source: "title", maxLength: 80 },
      // El slug vacío es válido (Inicio), pero solo para una página. El tipo `slug` no acepta
      // `{current: ""}`: «vacío» significa que el campo no existe, y la consulta GROQ del sitio
      // lo devuelve como `{current: ""}`.
      validation: (r) =>
        r.custom(async (slug, ctx) => {
          const current = slug?.current?.trim();
          if (current) return SLUG.test(current) ? true : "Solo minúsculas, números y guiones, sin tildes, espacios ni barras (p. ej. «como-lo-hicimos»).";
          const self = ctx.document?._id ? getPublishedId(ctx.document._id) : "";
          const ids: string[] = await ctx.getClient({ apiVersion: "2025-01-01" }).fetch(`*[_type == "page" && !defined(slug.current)]._id`);
          return ids.some((id) => getPublishedId(id) !== self)
            ? "Ya hay una página de Inicio (la única con la dirección vacía). Escribe una dirección para esta página."
            : true;
        }).error(),
    }),
    defineField({
      name: "sections",
      title: "Secciones (arrastra para reordenar)",
      type: "array",
      group: "contenido",
      description: "La página se arma apilando secciones, de arriba abajo en este orden.",
      of: sectionNames.map((type) => defineArrayMember({ type })),
      validation: (r) =>
        r.custom((sections) => {
          const anchors = ((sections ?? []) as { anchor?: string }[]).map((s) => s?.anchor).filter(Boolean);
          const repeated = anchors.filter((a, i) => anchors.indexOf(a) !== i);
          return repeated.length ? `Dos secciones comparten el ancla «${repeated[0]}»: cada ancla debe ser única en la página.` : true;
        }),
    }),
    defineField({
      name: "seo",
      title: "Buscadores y redes",
      type: "object",
      group: "seo",
      description: "Todo es opcional: lo que quede vacío se toma de Ajustes.",
      fields: [
        defineField({ name: "title", title: "Título", type: "string", description: "Título de la pestaña y del resultado en buscadores (unos 55 caracteres)." }),
        defineField({ name: "description", title: "Descripción", type: "text", rows: 3, description: "Resumen de la página para buscadores y redes (unos 150 caracteres)." }),
        imageField("ogImage", "Imagen para redes", { decorative: true, description: "Se muestra al compartir el enlace. 1200 × 630 px." }),
        defineField({ name: "noindex", title: "Ocultar de los buscadores", type: "boolean", description: "Activado: se pide a Google y demás que no indexen esta página." }),
      ],
    }),
    defineField({
      name: "header",
      title: "Encabezado",
      type: "string",
      group: "contenido",
      fieldset: COMP,
      description: "«Titular grande»: el titular «ciudad y cuerpo» a todo el ancho con «LAB.» (Inicio). «Titular pequeño»: el titular de 30 px sobre la foto de cabecera (páginas interiores). «Solo MENÚ»: sin titular.",
      options: { list: Object.entries(HEADERS).map(([value, title]) => ({ title, value })), layout: "radio" },
      initialValue: "small",
      validation: req,
    }),
    toneField("menuTone", "Color de MENÚ", { group: "contenido", fieldset: COMP, description: "Color de la palabra MENÚ y su cuadrito cuando van sobre la foto de cabecera. Vacío = morado." }),
    toneField("footerTone", "Color del pie de página", { group: "contenido", fieldset: COMP, description: "Color de la franja del pie en esta página. Vacío = el de Ajustes." }),
    defineField({
      name: "dots",
      title: "Trama de puntos del fondo",
      type: "string",
      group: "contenido",
      fieldset: COMP,
      description: "Paso de la trama de puntos que cubre el fondo de la página.",
      options: { list: [{ title: "Fina (Inicio)", value: "fino" }, { title: "Amplia (interiores)", value: "amplio" }], layout: "radio", direction: "horizontal" },
    }),
  ],
  orderings: [
    { title: "Dirección", name: "slug", by: [{ field: "slug.current", direction: "asc" }] },
    { title: "Título", name: "title", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", slug: "slug.current", header: "header" },
    prepare: ({ title, slug }) => ({ title: title || "Página sin título", subtitle: slug ? `/${slug}/` : "/ (Inicio)" }),
  },
});

const label = (name: string, title: string, description?: string) => defineField({ name, title, type: "string", description, validation: req });

/** Ajustes del sitio: documento único (`_id: "settings"`). Corresponde a `Settings` en types.ts. */
export const settings = defineType({
  name: "settings",
  title: "Ajustes",
  type: "document",
  groups: [
    { name: "sitio", title: "Sitio", default: true },
    { name: "menu", title: "Menú" },
    { name: "pie", title: "Pie de página" },
    { name: "seo", title: "Buscadores y redes" },
    { name: "textos", title: "Textos de interfaz" },
  ],
  fields: [
    defineField({ name: "siteName", title: "Nombre del sitio", type: "string", group: "sitio", description: "p. ej. «Ciudad y Cuerpo». Acompaña el título de cada página en la pestaña.", validation: req }),
    defineField({ name: "siteUrl", title: "Dominio", type: "url", group: "sitio", description: "Dirección pública del sitio, sin barra final: https://ciudadycuerpo.com", validation: req }),
    titleText("headerTitle", "Titular del encabezado", { group: "sitio", description: "El titular «ciudad y cuerpo» del encabezado. Selecciona un tramo y márcalo en itálica (la «y»)." }),
    defineField({ name: "brandLabel", title: "Rótulo de marca", type: "string", group: "sitio", description: "El rótulo junto al titular: «LAB.».", validation: req }),

    defineField({ name: "menuLabel", title: "Texto del botón del menú", type: "string", group: "menu", description: "«MENÚ».", validation: req }),
    defineField({
      name: "menu",
      title: "Enlaces del menú",
      type: "array",
      group: "menu",
      description: "Los enlaces del panel magenta, en este orden.",
      of: [
        defineArrayMember({
          type: "object",
          name: "menuLink",
          title: "Enlace",
          fields: [
            defineField({ name: "label", title: "Texto", type: "string", validation: req }),
            defineField({ name: "href", title: "Dirección", type: "string", description: "Página del sitio, con barras: «/equipo/» («/» es Inicio). O una dirección completa (https://…).", validation: (r) => r.required().regex(/^(\/|https?:\/\/)\S*$/, { name: "enlace" }).error("Debe empezar por / o por https://.") }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),

    defineField({
      name: "footer",
      title: "Pie de página",
      type: "object",
      group: "pie",
      fields: [
        defineField({ name: "credit", title: "Crédito", type: "text", rows: 4, description: "Texto de crédito (ARTEFACTUM / IDARTES).", validation: req }),
        defineField({
          name: "logos",
          title: "Logos",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "footerLogo",
              title: "Logo",
              fields: [
                imageField("image", "Logo", { required: true, description: "Preferiblemente SVG. El texto alternativo es el nombre de la entidad." }),
                defineField({ name: "url", title: "Enlace", type: "url", description: "Opcional: sitio de la entidad." }),
              ],
              preview: { select: { title: "image.alt", subtitle: "url", media: "image" } },
            }),
          ],
        }),
        toneField("tone", "Color de la franja", { description: "Color por defecto del pie; cada página puede cambiarlo.", validation: req }),
      ],
      validation: req,
    }),

    defineField({
      name: "seo",
      title: "Buscadores y redes (valores por defecto)",
      type: "object",
      group: "seo",
      description: "Se usan en las páginas que no definan los suyos.",
      fields: [
        defineField({ name: "title", title: "Título", type: "string", description: "Unos 55 caracteres.", validation: req }),
        defineField({ name: "description", title: "Descripción", type: "text", rows: 3, description: "Unos 150 caracteres.", validation: req }),
        imageField("ogImage", "Imagen para redes", { decorative: true, description: "Se muestra al compartir un enlace del sitio. 1200 × 630 px." }),
      ],
      validation: req,
    }),

    defineField({
      name: "labels",
      title: "Textos de interfaz",
      type: "object",
      group: "textos",
      description: "Textos de botones y avisos; varios solo los escuchan quienes usan lector de pantalla.",
      fields: [
        label("menu", "Menú principal", "Nombre accesible de la navegación."),
        label("openMenu", "Abrir menú"),
        label("closeMenu", "Cerrar menú"),
        label("skip", "Saltar al contenido"),
        label("play", "Reproducir video"),
        label("pending", "Contenido pendiente", "Se muestra en los huecos de video o juego que aún no tienen contenido."),
        label("prev", "Anterior"),
        label("next", "Siguiente"),
        label("close", "Cerrar"),
        label("home", "Ir al inicio"),
      ],
      validation: req,
    }),
  ],
  preview: { prepare: () => ({ title: "Ajustes" }) },
});

export const documentTypes = [page, settings];
