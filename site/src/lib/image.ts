import type { Img } from "./types";
import { sanityConfig } from "./content";

export type Sources = { srcset: string; fallback: string; width: number; height: number };

/** srcset WebP + respaldo para una imagen `local` del seed o, en la fase Sanity, para un `asset`.
 *  Los componentes nunca leen rutas de imagen: siempre pasan por aquí vía Picture.astro. */
export function sources(img: Img | undefined, widths: number[] = [480, 960, 1600]): Sources | null {
  if (!img) return null;
  if (img.asset && sanityConfig) {
    // ── Fase Sanity (requiere @sanity/image-url) ──
    // const b = imageUrlBuilder(sanityConfig).image(img).auto("format");
    // const dims = img.asset.metadata?.dimensions;
    // const max = widths[widths.length - 1];
    // return {
    //   srcset: widths.map((w) => `${b.width(w).format("webp").quality(82).url()} ${w}w`).join(", "),
    //   fallback: b.width(max).format("jpg").quality(80).url(),
    //   width: dims?.width ?? max,
    //   height: dims?.height ?? max,
    // };
    const dims = img.asset.metadata?.dimensions;
    return { srcset: "", fallback: img.asset.url, width: dims?.width ?? widths[widths.length - 1], height: dims?.height ?? widths[widths.length - 1] };
  }
  if (img.local) {
    // El ancho de cada variante va en el nombre del archivo: foto-960.webp → 960w.
    const srcset = img.local.webp
      .map((u, i) => `${u} ${u.match(/-(\d+)\.webp$/)?.[1] ?? widths[i] ?? img.local!.width}w`)
      .join(", ");
    return { srcset, fallback: img.local.fallback, width: img.local.width, height: img.local.height };
  }
  return null;
}

/** object-position a partir del punto focal. */
export const focus = (img: Img | undefined): string | undefined =>
  img?.hotspot ? `${Math.round(img.hotspot.x * 100)}% ${Math.round(img.hotspot.y * 100)}%` : undefined;
