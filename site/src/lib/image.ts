import imageUrlBuilder from "@sanity/image-url";
import type { Img } from "./types";
import { sanityConfig } from "./content";

export type Sources = { srcset: string; fallback: string; width: number; height: number };

/** srcset WebP + respaldo para una imagen `local` del seed o para un `asset` de Sanity.
 *  Los componentes nunca leen rutas de imagen: siempre pasan por aquí vía Picture.astro. */
export function sources(img: Img | undefined, widths: number[] = [480, 960, 1600]): Sources | null {
  if (!img) return null;
  if (img.asset && sanityConfig) {
    const dims = img.asset.metadata?.dimensions;
    const max = widths[widths.length - 1];
    const width = dims?.width ?? max;
    const height = dims?.height ?? max;
    // Los SVG no se transforman: se sirven tal cual.
    if (/\.svg(\?|$)/.test(img.asset.url)) return { srcset: "", fallback: img.asset.url, width, height };
    // Solo se usa el asset: el recorte lo hace el CSS (object-fit + object-position con el hotspot), igual que con el seed local.
    const b = imageUrlBuilder(sanityConfig).image({ asset: { url: img.asset.url } });
    // Nunca se pide más ancho que el original; auto=format deja que el CDN elija el formato y conserva la transparencia.
    const ws = [...new Set(widths.map((w) => Math.min(w, width)))];
    return {
      srcset: ws.map((w) => `${b.width(w).format("webp").quality(80).url()} ${w}w`).join(", "),
      fallback: b.width(Math.min(1200, width)).auto("format").quality(80).url(),
      width,
      height,
    };
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
