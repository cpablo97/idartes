# Ciudad y Cuerpo

Sitio de **Ciudad y Cuerpo** (ciudadycuerpo.com), proyecto resultado de ARTEFACTUM — Laboratorio Artístico de
Innovación Social: El diseño y lo digital en Chapinero 2026 (IDARTES).

Esta fase es el prototipo navegable del front, con contenido local. La arquitectura replica la de
[Estanza](https://github.com/cpablo97/estanza) para que conectar Sanity sea solo cambiar la fuente de datos.

```
site/      Astro (output: static) → Netlify
studio/    Sanity Studio (esquemas del modelo de contenido)
scripts/   seed.mjs: sube el contenido del prototipo a Sanity
docs/      modelo de contenido para el CMS
assets/    originales pesados de las imágenes (no versionados)
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

- `site/src/lib/content.ts` → `getContent()` es la única puerta de entrada. Hoy devuelve
  `site/src/content/seed.json`; con `PUBLIC_SANITY_PROJECT_ID` consultará Sanity con la misma forma.
- `site/src/lib/types.ts` → tipos del contenido. `docs/cms-modelo.md` → el mismo modelo, listo para `studio/schemas`.
- Las páginas son `page.sections[]` y `site/src/components/Sections.astro` mapea `_type → componente`.
- Mientras no haya CMS, el seed se escribe en `site/scripts/seed/*.mjs` (con las medidas del Figma) y
  `npm run seed` regenera `seed.json`.

## CMS

El Studio de Sanity está en `studio/`; sus esquemas siguen `site/src/lib/types.ts` campo por campo
(`docs/cms-modelo.md` explica las pocas diferencias entre lo que guarda el Studio y lo que pinta el sitio).
El sitio todavía lee el seed local: conectarlo a Sanity es el paso 2 de `docs/cms-modelo.md`.

```bash
cd studio
npm install
cp .env.example .env    # y poner el ID del proyecto en SANITY_STUDIO_PROJECT_ID
npm run dev             # http://localhost:3333
npm run check           # valida los esquemas y los tipos
npm run deploy          # publica en https://ciudadycuerpo.sanity.studio
```

Sembrar el contenido del prototipo (una vez, desde la raíz del repo y con `studio/` instalado):

```bash
node scripts/seed.mjs --dry-run     # ensayo sin red: cuenta documentos e imágenes y valida el resultado
SANITY_PROJECT_ID=xxxx SANITY_TOKEN=sk... node scripts/seed.mjs
```

Sube las imágenes de `site/public` como assets y crea `settings` + las 7 páginas con `createOrReplace`:
se puede repetir, pero **reemplaza** lo que se haya editado en el Studio en esos documentos.

| Variable | Dónde | Para qué |
|---|---|---|
| `SANITY_STUDIO_PROJECT_ID` | `studio/.env` | ID del proyecto (sanity.io/manage). Sin ella el Studio usa el marcador `REPLACE_WITH_PROJECT_ID` |
| `SANITY_STUDIO_DATASET` | `studio/.env` | Dataset; por defecto `production` |
| `SANITY_PROJECT_ID` | entorno de `seed.mjs` | El mismo ID del proyecto |
| `SANITY_DATASET` | entorno de `seed.mjs` | Dataset; por defecto `production` |
| `SANITY_TOKEN` | entorno de `seed.mjs` | Token con permiso de Editor (sanity.io/manage → API → Tokens). No se versiona |
| `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` | Netlify / `site/.env` | Cuando el sitio lea de Sanity (hoy no deben definirse) |

## Imágenes

Los componentes nunca leen rutas: pasan por `Picture.astro` → `lib/image.ts`.
`npm run images` toma los originales de `assets/originales/<carpeta>/` y genera WebP (480/960/1600) + respaldo
en `site/public/assets/images/<carpeta>/`, más un manifiesto en `site/scripts/manifest/`.

## Despliegue

Netlify (`netlify.toml`, `base = "site"`, Node 24). Si existe la variable `SITE_PASSWORD`, la edge function
`gate.js` pide contraseña (usuario `ciudadycuerpo` o `SITE_USER`).
