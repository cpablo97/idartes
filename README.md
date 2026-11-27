# Ciudad y Cuerpo

Sitio de **Ciudad y Cuerpo** (ciudadycuerpo.com), proyecto resultado de ARTEFACTUM — Laboratorio Artístico de
Innovación Social: El diseño y lo digital en Chapinero 2026 (IDARTES).

El sitio es estático (Astro) y **todo el contenido —textos e imágenes— vive en Sanity**: el repositorio solo
guarda código, tipografías, iconos y el mapa base. Cada publicación en el Studio reconstruye el sitio en Netlify.

```
site/      Astro (output: static) → Netlify
studio/    Sanity Studio (esquemas del modelo de contenido)
docs/      modelo de contenido para el CMS
```

## Desarrollo

```bash
cd site
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
npm run check    # astro check
```

## Contenido

- `site/src/lib/content.ts` → `getContent()` es la única puerta de entrada: consulta Sanity (`QUERY`) en cada build.
  Necesita `PUBLIC_SANITY_PROJECT_ID` (y `PUBLIC_SANITY_DATASET`): están en `netlify.toml`; en local, copiar
  `site/.env.example` a `site/.env`. Sin ellas el build se detiene.
- `site/src/lib/types.ts` → tipos del contenido. `docs/cms-modelo.md` → el mismo modelo, campo por campo.
- Las páginas son `page.sections[]` y `site/src/components/Sections.astro` mapea `_type → componente`.
- Los textos de interfaz (botones, etiquetas del mapa, página 404) están en el documento «Ajustes».
- No hay copia local del contenido. Para respaldar o migrar: `npx sanity dataset export production` desde `studio/`.

## CMS

El Studio de Sanity está en `studio/` y publicado en https://ciudadycuerpo.sanity.studio; sus esquemas siguen
`site/src/lib/types.ts` campo por campo (`docs/cms-modelo.md` explica las pocas diferencias entre lo que guarda
el Studio y lo que pinta el sitio).

```bash
cd studio
npm install
cp .env.example .env    # y poner el ID del proyecto en SANITY_STUDIO_PROJECT_ID
npm run dev             # http://localhost:3333
npm run check           # valida los esquemas y los tipos
npm run deploy          # publica en https://ciudadycuerpo.sanity.studio
```

Un webhook de Sanity (documentos `page` y `settings`) llama a un Build hook de Netlify en cada publicación.

| Variable | Dónde | Para qué |
|---|---|---|
| `SANITY_STUDIO_PROJECT_ID` | `studio/.env` | ID del proyecto (sanity.io/manage) |
| `SANITY_STUDIO_DATASET` | `studio/.env` | Dataset; por defecto `production` |
| `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` | `netlify.toml` / `site/.env` | De dónde lee el sitio. Son identificadores públicos |

## Imágenes

Los componentes nunca leen rutas: pasan por `Picture.astro` → `lib/image.ts`, que arma las variantes WebP con el
CDN de Sanity. El recorte se hace con CSS a partir del punto focal marcado en el Studio.

## Despliegue

Netlify (`netlify.toml`, `base = "site"`, Node 24). Si existe la variable `SITE_PASSWORD`, la edge function
`gate.js` pide contraseña (usuario `ciudadycuerpo` o `SITE_USER`).
