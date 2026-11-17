import type { Content, Page } from "./types";
import seed from "../content/seed.json";
import { normalize } from "./text";

// Tolera valores pegados en la interfaz del hosting con comillas o espacios alrededor.
const clean = (v: unknown) => (typeof v === "string" ? v.trim().replace(/^["']|["']$/g, "") : "");
const projectId = clean(import.meta.env.PUBLIC_SANITY_PROJECT_ID) || undefined;
const dataset = clean(import.meta.env.PUBLIC_SANITY_DATASET) || "production";

/** null mientras no haya proyecto de Sanity; image.ts lo usa para decidir entre `asset` y `local`. */
export const sanityConfig = projectId ? { projectId, dataset } : null;

// ───────────────────────────── PUNTO DE CAMBIO A SANITY ─────────────────────────────
// La consulta que debe devolver la forma de seed.json (tipo `Content`), con dos diferencias que
// `normalize()` (lib/text.ts) resuelve: el texto enriquecido llega como Portable Text estándar
// (enlaces en `markDefs`, titulares como un bloque) y los campos ausentes proyectados llegan como `null`.
// Con PUBLIC_SANITY_PROJECT_ID definido, getContent() consulta Sanity con esta QUERY; sin él, lee el seed local.
// Ningún componente cambia entre un origen y otro.
// La página de Inicio no tiene `slug` en Sanity (el tipo `slug` no admite un valor vacío): la consulta lo devuelve como "".
const asset = `asset->{url, metadata{dimensions}}`;
const image = `{..., ${asset}}`;
export const QUERY = `{
  "settings": *[_id == "settings"][0]{
    ...,
    footer{..., logos[]{..., image${image}}},
    seo{..., ogImage${image}}
  },
  "pages": *[_type == "page"]{
    ...,
    "slug": {"current": coalesce(slug.current, "")},
    seo{..., ogImage${image}},
    sections[]{
      ...,
      poster${image},
      items[]{..., image${image}},
      image${image},
      placeholder${image},
      places[]{..., photo${image}},
      band{..., image${image}},
      people[]{..., photo${image}},
      steps[]{..., items[]{..., image${image}}},
      gamepad{..., photo${image}, groups[]{..., panel${image}}},
      keyboard{..., photos[]${image}},
      images[]{..., image${image}},
      pages[]{..., image${image}},
      videos[]{..., poster${image}}
    }
  }
}`;

let cache: Promise<Content> | null = null;

/** Todo el contenido del sitio. Hoy: el seed local. Con PUBLIC_SANITY_PROJECT_ID: Sanity (misma forma).
 *  Se resuelve una vez por build; en `astro dev` se vuelve a leer en cada carga. */
export function getContent(): Promise<Content> {
  if (!cache || import.meta.env.DEV) {
    cache = (async () => {
      if (!sanityConfig) return normalize<Content>(seed);

      // Con PUBLIC_SANITY_PROJECT_ID el contenido sale de Sanity (misma forma que el seed, tras normalize()).
      const { createClient } = await import("@sanity/client");
      const client = createClient({ ...sanityConfig, apiVersion: "2025-01-01", useCdn: false });
      const data = normalize<Content>(await client.fetch(QUERY));
      if (!data?.settings || !data?.pages?.length) throw new Error("Sanity no devolvió ajustes o páginas; publica primero los documentos.");
      return data;
    })();
  }
  return cache;
}

/** Página por slug ("" = Inicio). */
export async function getPage(slug: string): Promise<Page | undefined> {
  const { pages } = await getContent();
  return pages.find((p) => (p.slug?.current ?? "") === slug);
}
