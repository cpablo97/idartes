# Modelo de contenido para el CMS

Este es el modelo que usa hoy el front con contenido local y el que hay que copiar a `studio/schemas` en la fase de Sanity.
La fuente de verdad en código es `site/src/lib/types.ts`; el contenido de ejemplo es `site/src/content/seed.json`
(generado con `npm run seed` desde `site/scripts/seed/*.mjs`).

Conectar Sanity significa:

1. Crear `studio/` con estos esquemas y subir `seed.json` con `scripts/seed.mjs` (como en Estanza).
2. En `site/`: `npm i @sanity/client @sanity/image-url` y descomentar los dos bloques marcados "Fase Sanity"
   en `src/lib/content.ts` y `src/lib/image.ts`. La consulta GROQ (`QUERY`) ya está escrita.
3. Definir `PUBLIC_SANITY_PROJECT_ID` (y `PUBLIC_SANITY_DATASET`) en `netlify.toml`.

Ningún componente cambia: todos leen de `getContent()` y pintan imágenes con `Picture.astro`.

## Tipos comunes

### Imagen (`image` con campos extra)
| Campo | Tipo | Notas |
|---|---|---|
| `asset` | referencia | En el seed es `local { webp[], fallback, width, height }`. |
| `alt` | string, **obligatorio** | Vacío solo si la imagen es decorativa. |
| `hotspot` | `{ x, y }` (0–1) | Punto que se conserva al recortar (`object-position`). Es el hotspot nativo de Sanity. |

### Texto enriquecido (Portable Text simplificado)
Arreglo de bloques `block` (un párrafo cada uno) con `children[]` de tipo `span { text, marks[], href? }`.
Marcas: `strong` (negrita), `em` (itálica), `medium` (peso 500), `underline`. `href` vuelve el tramo un enlace
(en Sanity: anotación `link`).

### Color (`tone`)
Un token de marca o un hex puntual. Tokens: `negro`, `blanco`, `morado` #5b0e96, `rosa` #e56aab, `magenta` #f756ef,
`amarillo` #ffc130, `verde` #3eaf3f, `rojo` #ff6058, `cian` #30e0ff, `ocre` #b05400, `gris` #6b6b6b.
En el Studio: lista de tokens + campo de color libre.

### Posición en la retícula (`place`)
`{ col, row, cols, rows?, z? }`. El lienzo de escritorio tiene 144 columnas (1 unidad = 10 px en el diseño de 1440)
y filas cuadradas de esa misma unidad, contadas desde el borde superior de la sección. `z` ordena los solapes.
En tablet y móvil se ignora: los elementos fluyen **en el orden del arreglo**, así que ese orden es el de lectura.

## Documentos

### `settings` (singleton, `_id: "settings"`)
| Campo | Tipo | Notas |
|---|---|---|
| `siteName` | string | "Ciudad y Cuerpo" |
| `siteUrl` | url | |
| `headerTitle` | tramos | "ciudad *y* cuerpo" (la "y" con marca `em`) |
| `brandLabel` | string | "LAB." |
| `menuLabel` | string | "MENÚ" |
| `menu[]` | `{ label, href }` | Los 7 enlaces del panel magenta |
| `footer.credit` | text | Crédito ARTEFACTUM / IDARTES |
| `footer.tone` | color | Color por defecto de la franja |
| `footer.logos[]` | `{ image, url? }` | |
| `seo` | `{ title, description, ogImage }` | SEO por defecto |
| `labels` | objeto de strings | Textos de interfaz: `menu`, `openMenu`, `closeMenu`, `skip`, `play`, `pending`, `prev`, `next`, `close`, `home` |

### `page` (una por ruta)
| Campo | Tipo | Notas |
|---|---|---|
| `title` | string | |
| `slug` | slug | Vacío para Inicio |
| `header` | `display` \| `small` \| `none` | `display`: titular grande + "LAB." (Inicio). `small`: titular de 30 px sobre el hero. `none`: solo MENÚ. |
| `menuTone` | color | Color de MENÚ cuando va sobre la foto del hero |
| `footerTone` | color | Color del footer en esta página |
| `dots` | `fino` \| `amplio` | Paso de la trama de puntos del fondo |
| `seo` | `{ title?, description?, ogImage?, noindex? }` | |
| `sections[]` | arreglo de secciones | Page builder: cada `_type` tiene su componente en `src/components/sections/` |

## Secciones

Todas llevan `_type`, `_key` y `anchor?` (id para enlaces internos).

| `_type` | Componente | Dónde se usa |
|---|---|---|
| `collage` | `Collage.astro` | Todas: composición libre de fotos, textos y titulares |
| `hero` | `Hero.astro` | Cabecera fotográfica de las 6 páginas interiores |
| `cardGrid` | `CardGrid.astro` | Índice de Inicio (`free`) y fila "Explora más" (`row`) |
| `video` | `Video.astro` | Microdocumental (Inicio, ¿Cómo lo hicimos?) |
| `videoList` | `VideoList.astro` | Cinco videotutoriales (Para recicladores) |
| `map` | `Map.astro` | Mapa de Google (Para recicladores) |
| `gallery` | `Gallery.astro` | Galería en espiral (Para recicladores) |
| `bitacora` | `Bitacora.astro` | Visor de láminas (¿Cómo lo hicimos?, Videojuego) |
| `gameEmbed` | `GameEmbed.astro` | Juego de itch.io (Videojuego) |
| `controls` | `Controls.astro` | Controles del juego (Videojuego) |
| `people` | `People.astro` | Fichas del equipo (Equipo) |
| `data` | `Data.astro` | Gráfico y tabla de precios (Lo que aprendimos de la calle) |
| `timeline` | `Timeline.astro` | Línea de tiempo del proceso (¿Cómo lo hicimos?) |

### `collage`
| Campo | Tipo | Notas |
|---|---|---|
| `rows` | number | Alto del lienzo en unidades de retícula |
| `items[]` | elementos de lienzo | Ver abajo |
| `dots[]` | `place` + `over?` | Tramas de puntos magenta; `over` las pinta encima de las fotos |
| `band` | `{ color?, image? }` | Fondo a sangre detrás de la sección |

**Elementos de lienzo** (todos con `place` y `variant?`, un nombre corto que se vuelve la clase `v-<variant>` para ajustes finos):

| `_type` | Campos |
|---|---|
| `imageItem` | `image`, `fit?` (`cover`/`contain`), `rotate?` (grados), `flip?` (`x`/`y`), `radius?` (px), `drift?` (parallax), `href?`, `caption?` |
| `textItem` | `body` (texto enriquecido), `tone?`, `size?` (px de diseño; 24 por defecto), `font?` (`sans`/`mono`/`doto`/`serif`), `weight?`, `align?`, `nowrap?`, `level?` (1–3: el primer párrafo sale como encabezado) |
| `displayTitle` | `text` (tramos; `em` = itálica, `\n` = salto), `tone`, `italic?`, `rotate?` (0/90/-90), `size?` (119.333 por defecto), `align?`, `level?` |
| `card` | `label`, `href`, `image`, `size` (`s`/`m`/`l`) |
| `rule` | `bleed?` (cruza toda la ventana), `tone?` |
| `notice` | `title`, `body`, `tone?` |

### `hero`
`image`, `blur?`, `eyebrow?` (rótulo Doto), `title?` + `titleFont?`, `phrase?` (Xanh Mono 46), `tone?`,
`footnote?` + `footnoteTone?` + `footnotePlace?` (`over`/`below`), `youtubeId?` + `videoTitle?`
(con ID, la foto es el póster del video: Exhibición).

### `cardGrid`
`layout` (`free`/`row`), `title?`, `rows?`, `items[]` (`card` y `displayTitle`), `dots[]?`.
En `row` se ignora `place` y las tarjetas van en fila de cuatro.

### `video`
`youtubeId` (lo que va después de `v=`), `title`, `intro?`, `caption?`, `poster?`, `rule?`.
Fachada liviana: el iframe de `youtube-nocookie.com` solo se carga al hacer clic. Un ID que empieza por `TODO`
se pinta como hueco pendiente.

### `videoList`
`videos[]`: `{ label, youtubeId, title, description?, poster? }`.

### `map`
`title`, `body?`, `legend[]` (`{ label, color }`), `embedUrl` (Google My Maps, `…/maps/d/embed?mid=…`),
`pending?`, `pendingLabel?`, `placeholder?` (captura que se muestra mientras esté pendiente), `note?` (fuentes).

### `gallery`
`title?`, `heading?`, `body?`, `images[]` (`{ image, caption? }`; entre 8 y 12 fotos).

### `bitacora`
`title?`, `intro?`, `mode` (`slider` = una lámina que se desliza; `book` = libro de dos páginas), `pages[]` (`{ image }`).

### `gameEmbed`
`title`, `embedUrl` (`https://itch.io/embed-upload/<id>`), `pageUrl` (página pública en itch.io), `poster?`,
`pending?`, `playLabel?`, `linkLabel?`.

### `controls`
`title`, `gamepad { title, groups[] { title, panel (imagen), width, labels[] { text, x } }, photo? }`,
`keyboard { title, groups[] { title, joiner?, clusters[] { layout (cross/row), indent?, keys[] { key, label?, icon?, size? } } }, photos[]? }`.

### `people`
`title`, `titleTone?`, `titleAlign?`, `tone?` (fondo de las fichas), `roleTone?`,
`people[]`: `{ name, role?, bio?, photo, zoom?, flip?, tone?, links[]? }`.

### `data`
`title?`, `body?`, `link?` (`{ label, url }`),
`chart?`: `{ title, description?, width, height, series[] { label, value?, unit?, tone, ringTone?, ring { x, y, d }, dot { x, y }, gap? } }`,
`table?`: `{ title, subtitle?, tone?, head[], rows[] { cells[] }, note? }`.

### `timeline`
`title?` (encabezado solo para lectores de pantalla), `band?`, `dots[]?` y `steps[]`: `{ title, rows, items[] }`.
Cada paso es un pequeño lienzo (los mismos elementos de `collage`); la fila 1 es la del punto y su título.

## Contenido marcado como pendiente en el seed

Buscar `TODO` en `site/scripts/seed/*.mjs`:

- IDs de YouTube: microdocumentales (Inicio, ¿Cómo lo hicimos?, Exhibición) y los cinco videotutoriales.
- URL del mapa de Google My Maps, y los textos "[fuentes: …]" y "[fecha]" de su nota.
- URL del embed de itch.io de Chapicartón.
- Láminas reales de la bitácora (hoy hay láminas de relleno) y fotos definitivas de la galería.
- URL del Excel "Chapinero 2025 en los medios".
