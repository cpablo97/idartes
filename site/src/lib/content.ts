import type { Content, Page } from "./types";
import seed from "../content/seed.json";

// Tolera valores pegados en la interfaz del hosting con comillas o espacios alrededor.
const clean = (v: unknown) => (typeof v === "string" ? v.trim().replace(/^["']|["']$/g, "") : "");
const projectId = clean(import.meta.env.PUBLIC_SANITY_PROJECT_ID) || undefined;
const dataset = clean(import.meta.env.PUBLIC_SANITY_DATASET) || "production";

/** null mientras no haya proyecto de Sanity; image.ts lo usa para decidir entre `asset` y `local`. */
export const sanityConfig = projectId ? { projectId, dataset } : null;

// ───────────────────────────── PUNTO DE CAMBIO A SANITY ─────────────────────────────
// La consulta que debe devolver exactamente la forma de seed.json (tipo `Content`).
// Fase Sanity: `npm i @sanity/client @sanity/image-url`, descomentar el bloque marcado en
// getContent() y en image.ts, y definir PUBLIC_SANITY_PROJECT_ID. Ningún componente cambia.
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
    seo{..., ogImage${image}},
    sections[]{
      ...,
      poster${image},
      items[]{..., image${image}},
      image${image},
      placeholder${image},
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
      if (!sanityConfig) return seed as unknown as Content;

      // ── Fase Sanity (descomentar; requiere @sanity/client) ──
      // const { createClient } = await import("@sanity/client");
      // const client = createClient({ ...sanityConfig, apiVersion: "2025-01-01", useCdn: false });
      // const data = await client.fetch<Content>(QUERY);
      // if (!data?.pages?.length) throw new Error("Sanity no devolvió páginas; publica primero los documentos.");
      // return data;
      throw new Error("PUBLIC_SANITY_PROJECT_ID está definido pero el cliente de Sanity aún no está conectado (ver src/lib/content.ts).");
    })();
  }
  return cache;
}

/** Página por slug ("" = Inicio). */
export async function getPage(slug: string): Promise<Page | undefined> {
  const { pages } = await getContent();
  return pages.find((p) => (p.slug?.current ?? "") === slug);
}
