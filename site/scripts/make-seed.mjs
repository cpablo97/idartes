// Arma src/content/seed.json a partir de scripts/seed/*.mjs (mientras no haya Sanity, esa es la fuente editable).
//   npm run seed
// El JSON resultante tiene la forma exacta de la respuesta GROQ futura (tipo Content en src/lib/types.ts)
// y es lo que scripts/seed.mjs subirá a Sanity en la siguiente fase.
import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const ORDER = ["inicio", "para-recicladores", "lo-que-aprendimos-de-la-calle", "como-lo-hicimos", "equipo", "exhibicion", "videojuego"];
const load = async (name) => (await import(pathToFileURL(path.join(here, "seed", `${name}.mjs`)).href)).default;

// Sanity exige `_key` en cada objeto dentro de un arreglo: se asignan de forma estable por posición.
function keys(node, prefix = "k") {
  if (Array.isArray(node)) {
    node.forEach((el, n) => {
      if (el && typeof el === "object" && !Array.isArray(el)) {
        if (!el._key) el._key = `${prefix}${n}`;
        keys(el, el._key);
      }
    });
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) if (v && typeof v === "object") keys(v, `${prefix}${k[0]}`);
  }
  return node;
}

const settings = keys(await load("settings"), "s");
const pages = [];
for (const name of ORDER) {
  if (!existsSync(path.join(here, "seed", `${name}.mjs`))) { console.warn(`(falta scripts/seed/${name}.mjs)`); continue; }
  pages.push(keys(await load(name), name.slice(0, 2)));
}

const out = path.resolve(here, "../src/content/seed.json");
const json = JSON.stringify({ settings, pages }, null, 2) + "\n";
if (/figma\.com/.test(json)) throw new Error("El seed contiene una URL de figma.com");
await writeFile(out, json);
console.log(`${pages.length} páginas → ${path.relative(process.cwd(), out)} (${(json.length / 1024).toFixed(0)} kB)`);
