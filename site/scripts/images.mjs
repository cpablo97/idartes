// Genera las variantes web de las imágenes del sitio.
//
//   npm run images            (desde site/)
//
// Entrada:  ../assets/originales/<carpeta>/<nombre>.(png|jpg|jpeg|webp)   — no versionado (pesa mucho)
// Salida:   public/assets/images/<carpeta>/<nombre>-<ancho>.webp           — srcset
//           public/assets/images/<carpeta>/<nombre>.(jpg|png)             — respaldo (png si hay transparencia)
//           scripts/manifest/<carpeta>.json                               — { "<nombre>": { webp[], fallback, width, height } }
//
//   npm run images -- inicio equipo     (solo esas carpetas)
//
// El manifiesto tiene exactamente la forma del campo `local` de una imagen del seed
// (ver src/lib/types.ts); scripts/make-seed.mjs lo usa para armar src/content/seed.json.
// Los SVG se copian tal cual. Nunca se amplía una imagen por encima de su tamaño original.
import { readdir, mkdir, copyFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, "../../assets/originales");
const OUT = path.resolve(here, "../public/assets/images");
const MANIFEST = path.resolve(here, "manifest");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const WIDTHS = [480, 960, 1600];
const MAX = WIDTHS[WIDTHS.length - 1];
const force = process.argv.includes("--force");

await mkdir(MANIFEST, { recursive: true });
let total = 0;
const folders = (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).filter((n) => !only.length || only.includes(n)).sort();
for (const folder of folders) {
  const files = (await readdir(path.join(SRC, folder))).sort();
  await mkdir(path.join(OUT, folder), { recursive: true });
  const manifest = {};
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);
    const input = path.join(SRC, folder, file);
    const url = (f) => `/assets/images/${folder}/${f}`;
    if (ext === ".svg") {
      await copyFile(input, path.join(OUT, folder, file));
      continue;
    }
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) continue;
    const image = sharp(input, { limitInputPixels: false }).rotate();
    const meta = await image.metadata();
    const stats = await image.stats();
    const alpha = meta.hasAlpha && !stats.isOpaque;
    const swap = (meta.orientation ?? 1) >= 5;
    const ow = swap ? meta.height : meta.width;
    const oh = swap ? meta.width : meta.height;
    const widths = [...new Set(WIDTHS.map((w) => Math.min(w, ow)))];
    const top = Math.min(MAX, ow);
    const fallback = `${name}.${alpha ? "png" : "jpg"}`;
    for (const w of widths) {
      const out = path.join(OUT, folder, `${name}-${w}.webp`);
      if (!force && existsSync(out) && (await stat(out)).mtimeMs > (await stat(input)).mtimeMs) continue;
      await image.clone().resize({ width: w }).webp({ quality: alpha ? 86 : 78 }).toFile(out);
    }
    const fb = path.join(OUT, folder, fallback);
    if (force || !existsSync(fb) || (await stat(fb)).mtimeMs <= (await stat(input)).mtimeMs) {
      const r = image.clone().resize({ width: Math.min(top, 1200) });
      await (alpha ? r.png({ palette: true, quality: 85 }) : r.jpeg({ quality: 78, mozjpeg: true })).toFile(fb);
    }
    manifest[name] = {
      webp: widths.map((w) => url(`${name}-${w}.webp`)),
      fallback: url(fallback),
      width: top,
      height: Math.round((oh * top) / ow),
    };
    total++;
    console.log(`${folder}/${name}  ${ow}×${oh}${alpha ? "  (alfa)" : ""}`);
  }
  await writeFile(path.join(MANIFEST, `${folder}.json`), JSON.stringify(manifest, null, 2) + "\n");
}
console.log(`\n${total} imágenes → ${path.relative(process.cwd(), MANIFEST)}/`);
