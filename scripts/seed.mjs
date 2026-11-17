/**
 * Siembra única: sube el contenido del prototipo (site/src/content/seed.json) a Sanity
 * como `settings` + un documento `page` por ruta, subiendo antes cada imagen como asset.
 *
 *   SANITY_PROJECT_ID=xxxx SANITY_TOKEN=sk... node scripts/seed.mjs
 *   node scripts/seed.mjs --dry-run            # sin red: solo cuenta y valida
 *   node scripts/seed.mjs --dry-run --out docs.json   # además guarda los documentos que subiría
 *
 * Se corre desde la raíz del repo, con `studio/` instalado (usa su @sanity/client).
 * El token necesita permiso de Editor (sanity.io/manage → API → Tokens).
 * Usa `createOrReplace` con `_id` estables: se puede volver a correr, pero REEMPLAZA lo que
 * se haya editado en el Studio en esos documentos.
 *
 * Diferencias entre el seed (la forma que pinta el sitio) y lo que se guarda en Sanity (la forma del Studio):
 *   · imagen `local {webp, fallback…}`  → `{_type: "image", asset: {_ref}, alt, hotspot}`
 *   · tramo con `href`                  → marca de anotación `link` en `markDefs` (Portable Text estándar)
 *   · titulares `Span[]` (`displayTitle.text`, `settings.headerTitle`) → un bloque de Portable Text
 *   · `slug.current: ""` (Inicio)       → sin campo `slug`
 *   · objetos de arreglo sin `_type`    → el nombre de su tipo en studio/schemas
 * El sitio deshace las tres primeras con `normalize()` (site/src/lib/text.ts) y la cuarta en la consulta GROQ.
 */
import { createHash } from "node:crypto";
import { createReadStream, existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const outFile = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;

const clean = (v) => (v ?? "").trim().replace(/^["']|["']$/g, "");
const projectId = clean(process.env.SANITY_PROJECT_ID);
const dataset = clean(process.env.SANITY_DATASET) || "production";
const token = clean(process.env.SANITY_TOKEN);

if (outFile === undefined || (outFile && outFile.startsWith("--"))) fail("--out necesita la ruta de un archivo.");
if (!dryRun && (!projectId || !token)) fail("Faltan SANITY_PROJECT_ID y SANITY_TOKEN (o usa --dry-run para ensayar sin red).");

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

const seed = JSON.parse(await readFile(path.join(root, "site/src/content/seed.json"), "utf8"));
const isObj = (v) => typeof v === "object" && v !== null && !Array.isArray(v);

// ───────────────────────── Imágenes ─────────────────────────

const PUBLIC = path.join(root, "site/public");
const isLocal = (v) => isObj(v) && isObj(v.local);

/** El archivo de mayor resolución que hay de una imagen: la variante WebP más ancha o, si no hay, el respaldo (SVG incluidos). */
function sourceOf(local) {
  const width = (u) => Number(u.match(/-(\d+)\.webp$/)?.[1] ?? 0);
  const widest = [...(local.webp ?? [])].sort((a, b) => width(b) - width(a))[0];
  return widest ?? local.fallback;
}

/** ruta pública ("/assets/images/…") → _id del asset. Una subida por archivo aunque la imagen se use varias veces. */
const assets = new Map();
let imageUses = 0;

function collect(v) {
  if (Array.isArray(v)) return v.forEach(collect);
  if (!isObj(v)) return;
  if (isLocal(v)) {
    imageUses++;
    assets.set(sourceOf(v.local), null);
  }
  Object.values(v).forEach(collect);
}

// ───────────────────────── Transformación ─────────────────────────

/** `_type` de los objetos de arreglo que en el seed no lo llevan (nombres de studio/schemas). Clave: "padre.campo" o "campo". */
const MEMBER_TYPES = {
  dots: "dotPatch",
  videos: "videoEntry",
  legend: "legendEntry",
  places: "mapPlace",
  hours: "openingHours",
  images: "galleryImage",
  pages: "bitacoraPage",
  people: "person",
  links: "personLink",
  "gamepad.groups": "gamepadGroup",
  "keyboard.groups": "keyGroup",
  labels: "panelLabel",
  clusters: "keyCluster",
  keys: "controlKey",
  series: "dataSeries",
  "table.rows": "tableRow",
  steps: "timelineStep",
  menu: "menuLink",
  logos: "footerLogo",
};
/** Campos que en el seed son `Span[]` y en el Studio un bloque de Portable Text. */
const SPAN_FIELDS = new Set(["text", "headerTitle"]);

const shortHash = (s) => createHash("sha1").update(s).digest("hex").slice(0, 10);

function toImage(img) {
  const _ref = assets.get(sourceOf(img.local));
  if (!_ref) throw new Error(`Imagen sin asset: ${img.local.fallback}`);
  const { local: _local, alt, hotspot, ...rest } = img; // `rest` conserva `_key` (imágenes dentro de un arreglo)
  return {
    ...rest,
    _type: "image",
    asset: { _type: "reference", _ref },
    ...(alt ? { alt } : {}),
    ...(hotspot ? { hotspot: { _type: "sanity.imageHotspot", x: hotspot.x, y: hotspot.y, width: 1, height: 1 } } : {}),
  };
}

/** Bloque del seed (tramos con `href`) → bloque de Portable Text estándar (anotación `link` en `markDefs`). */
function toBlock(block, fallbackKey) {
  const _key = block._key ?? fallbackKey;
  const markDefs = [];
  const children = (block.children ?? []).map((span, i) => {
    const { href, marks = [], ...rest } = span;
    const out = { ...rest, _type: "span", _key: span._key ?? `${_key}s${i}`, marks: [...marks] };
    if (href) {
      let def = markDefs.find((d) => d.href === href);
      if (!def) markDefs.push((def = { _type: "link", _key: `l${shortHash(`${_key}:${href}`)}`, href }));
      out.marks.push(def._key);
    }
    return out;
  });
  return { ...block, _type: "block", _key, style: block.style ?? "normal", markDefs, children };
}

function convert(v, key, parentKey, ownerKey) {
  if (Array.isArray(v)) {
    if (SPAN_FIELDS.has(key) && v.every((s) => isObj(s) && s._type === "span")) {
      return [toBlock({ children: v }, `${ownerKey ?? key}b`)];
    }
    const memberType = MEMBER_TYPES[`${parentKey}.${key}`] ?? MEMBER_TYPES[key];
    return v.map((item, i) => {
      if (!isObj(item)) return item;
      const _key = item._key ?? `${key}${i}`;
      if (item._type === "block") return toBlock(item, _key);
      const out = convert(item, undefined, key, _key);
      if (!out._type) {
        if (!memberType) throw new Error(`No sé qué _type darle a los elementos de «${parentKey ? `${parentKey}.` : ""}${key}». Agrégalo a MEMBER_TYPES.`);
        return { _type: memberType, _key, ...out };
      }
      return { ...out, _key };
    });
  }
  if (!isObj(v)) return v;
  if (isLocal(v)) return toImage(v);
  const out = {};
  for (const [k, x] of Object.entries(v)) out[k] = convert(x, k, key, v._key ?? ownerKey);
  if (key === "place") return { _type: "place", ...out };
  return out;
}

function toPage(page) {
  const { slug, ...rest } = convert(page);
  return { ...rest, ...(slug?.current ? { slug: { _type: "slug", current: slug.current } } : {}) };
}

// ───────────────────────── Validación ─────────────────────────

/** Lo que no puede quedar en un documento listo para Sanity. */
function problems(doc) {
  const found = [];
  (function walk(v, where) {
    if (Array.isArray(v)) {
      const keys = new Set();
      v.forEach((item, i) => {
        const here = `${where}[${isObj(item) ? (item._key ?? i) : i}]`;
        if (isObj(item)) {
          if (!item._key) found.push(`${here}: objeto de arreglo sin _key`);
          else if (keys.has(item._key)) found.push(`${here}: _key repetido`);
          if (!item._type) found.push(`${here}: objeto de arreglo sin _type`);
          keys.add(item._key);
        }
        walk(item, here);
      });
      return;
    }
    if (!isObj(v)) return;
    if ("local" in v) found.push(`${where}: queda una imagen «local»`);
    if (v._type === "span" && "href" in v) found.push(`${where}: queda un «href» en un tramo`);
    if (v._type === "image" && !/^image-[0-9a-f]+-\d+x\d+-[a-z0-9]+$/.test(v.asset?._ref ?? "")) found.push(`${where}: referencia de asset inválida (${v.asset?._ref})`);
    if (v._type === "block") {
      const defs = new Set((v.markDefs ?? []).map((d) => d._key));
      for (const c of v.children ?? []) for (const m of c.marks ?? []) if (!["strong", "em", "medium", "underline"].includes(m) && !defs.has(m)) found.push(`${where}: marca «${m}» sin definición`);
    }
    for (const [k, x] of Object.entries(v)) walk(x, where ? `${where}.${k}` : k);
  })(doc, doc._id);
  return found;
}

// ───────────────────────── Ejecución ─────────────────────────

collect(seed);
for (const file of assets.keys()) if (!existsSync(path.join(PUBLIC, file))) fail(`No existe site/public${file}`);

let client = null;
if (dryRun) {
  // Sin red: el _id que Sanity le daría a cada asset es `image-<sha1 del archivo>-<ancho>x<alto>-<extensión>`.
  // Aquí el sha1 es real y las medidas son 0x0 (no se leen): basta para validar la forma.
  for (const file of assets.keys()) {
    const sha1 = createHash("sha1").update(await readFile(path.join(PUBLIC, file))).digest("hex");
    assets.set(file, `image-${sha1}-0x0-${path.extname(file).slice(1)}`);
  }
} else {
  // @sanity/client se resuelve desde studio/ (este script no tiene node_modules propios).
  const { createClient } = createRequire(path.join(root, "studio/package.json"))("@sanity/client");
  client = createClient({ projectId, dataset, token, apiVersion: "2025-01-01", useCdn: false });
  let n = 0;
  for (const file of assets.keys()) {
    process.stdout.write(`[${++n}/${assets.size}] subiendo ${file}… `);
    const asset = await client.assets.upload("image", createReadStream(path.join(PUBLIC, file)), {
      filename: path.basename(file),
      ...(file.endsWith(".svg") ? { contentType: "image/svg+xml" } : {}),
    });
    console.log(asset._id);
    assets.set(file, asset._id);
  }
}

const docs = [{ ...convert(seed.settings), _id: "settings", _type: "settings" }, ...seed.pages.map(toPage)];

const ids = docs.map((d) => d._id);
if (ids.some((id) => !id) || new Set(ids).size !== ids.length) fail(`Los documentos necesitan _id únicos: ${ids.join(", ")}`);
const errors = docs.flatMap(problems);
if (errors.length) {
  console.error(errors.slice(0, 30).join("\n"));
  fail(`${errors.length} problema(s) en los documentos; no se subió nada.`);
}

if (outFile) await writeFile(path.resolve(outFile), JSON.stringify(docs, null, 2));

const pages = docs.filter((d) => d._type === "page");
const summary = [
  `Documentos: ${docs.length} (1 settings + ${pages.length} páginas)`,
  ...pages.map((p) => `  · ${p._id}  /${p.slug?.current ?? ""}  ${p.sections.length} secciones`),
  `Imágenes: ${assets.size} archivos para ${imageUses} usos (${[...assets.keys()].filter((f) => f.endsWith(".svg")).length} SVG)`,
  `Validación: ningún «local», ningún «href» en tramos, todos los objetos de arreglo con _key y _type`,
];

if (dryRun) {
  console.log(`Ensayo (--dry-run): no se llamó a la red. Esto es lo que se subiría${projectId ? ` a ${projectId}/${dataset}` : ""}:`);
  console.log(summary.join("\n"));
  if (outFile) console.log(`Documentos escritos en ${path.resolve(outFile)}`);
} else {
  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`✓ ${doc._id}`);
  }
  console.log(`Sembrado en ${projectId}/${dataset}:`);
  console.log(summary.join("\n"));
}
