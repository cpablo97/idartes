# Ciudad y Cuerpo

Sitio de **Ciudad y Cuerpo** (ciudadycuerpo.com), proyecto resultado de ARTEFACTUM — Laboratorio Artístico de
Innovación Social: El diseño y lo digital en Chapinero 2026 (IDARTES).

Esta fase es el prototipo navegable del front, con contenido local. La arquitectura replica la de
[Estanza](https://github.com/cpablo97/estanza) para que conectar Sanity sea solo cambiar la fuente de datos.

```
site/      Astro (output: static) → Netlify
docs/      modelo de contenido para el CMS
assets/    originales pesados de las imágenes (no versionados)
```
Más adelante: `studio/` (Sanity) y `scripts/seed.mjs`.

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

## Imágenes

Los componentes nunca leen rutas: pasan por `Picture.astro` → `lib/image.ts`.
`npm run images` toma los originales de `assets/originales/<carpeta>/` y genera WebP (480/960/1600) + respaldo
en `site/public/assets/images/<carpeta>/`, más un manifiesto en `site/scripts/manifest/`.

## Despliegue

Netlify (`netlify.toml`, `base = "site"`, Node 24). Si existe la variable `SITE_PASSWORD`, la edge function
`gate.js` pide contraseña (usuario `ciudadycuerpo` o `SITE_USER`).
