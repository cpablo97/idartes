#!/usr/bin/env python3
"""Arma el mapa base propio de Chapinero a partir de datos de OpenStreetMap.

Uso (los .osm se bajan una vez de https://api.openstreetmap.org/api/0.6/map?bbox=izq,abajo,der,arriba,
partiendo la zona en trozos pequeños porque la API limita el número de nodos):

    python3 -I scripts/mapa-base.py trozo1.osm trozo2.osm ... > public/assets/mapa/chapinero.json

Salida: calles en tres niveles (principales, medias, menores), parques y rótulos de las vías principales,
con las coordenadas como enteros (grados × 1e5) codificados en deltas para que el archivo pese poco.
Datos © colaboradores de OpenStreetMap (ODbL): el mapa muestra esa atribución.
"""
import sys, json, math
import xml.etree.ElementTree as ET

BBOX = (-74.110, 4.617, -74.030, 4.676)  # izq, abajo, der, arriba
MAJOR = {"motorway", "trunk", "primary", "secondary", "motorway_link", "trunk_link", "primary_link", "secondary_link"}
MID = {"tertiary", "tertiary_link"}
MINOR = {"residential", "unclassified", "living_street", "pedestrian"}
E = 1e5

nodes, ways = {}, {}
for path in sys.argv[1:]:
    for _, el in ET.iterparse(path):
        if el.tag == "node":
            nodes[el.get("id")] = (float(el.get("lat")), float(el.get("lon")))
            el.clear()
        elif el.tag == "way":
            tags = {t.get("k"): t.get("v") for t in el.findall("tag")}
            if "highway" in tags or tags.get("leisure") == "park":
                ways[el.get("id")] = (tags, [n.get("ref") for n in el.findall("nd")])
            el.clear()

def inside(p, pad=0.002):
    return BBOX[1] - pad <= p[0] <= BBOX[3] + pad and BBOX[0] - pad <= p[1] <= BBOX[2] + pad

def simplify(pts, tol):
    """Douglas-Peucker."""
    if len(pts) < 3: return pts
    (ay, ax), (by, bx) = pts[0], pts[-1]
    dx, dy = bx - ax, by - ay
    n = math.hypot(dx, dy) or 1e-12
    best, idx = 0, 0
    for i in range(1, len(pts) - 1):
        d = abs((pts[i][1] - ax) * dy - (pts[i][0] - ay) * dx) / n
        if d > best: best, idx = d, i
    if best <= tol: return [pts[0], pts[-1]]
    return simplify(pts[: idx + 1], tol)[:-1] + simplify(pts[idx:], tol)

def pieces(refs):
    """Parte la vía en tramos que caen dentro de la zona."""
    out, cur = [], []
    for r in refs:
        p = nodes.get(r)
        if p and inside(p): cur.append(p)
        else:
            if len(cur) > 1: out.append(cur)
            cur = []
    if len(cur) > 1: out.append(cur)
    return out

def length(pts):
    return sum(math.hypot((b[0] - a[0]) * 111000, (b[1] - a[1]) * 111000 * math.cos(math.radians(4.65))) for a, b in zip(pts, pts[1:]))

def encode(pts):
    flat, py, px = [], 0, 0
    for lat, lng in pts:
        y, x = round(lat * E), round(lng * E)
        flat += [y - py, x - px]
        py, px = y, x
    return flat

layers = {"major": [], "mid": [], "minor": [], "parks": []}
named = {}
for tags, refs in ways.values():
    hw = tags.get("highway")
    if tags.get("leisure") == "park":
        pts = [nodes[r] for r in refs if r in nodes]
        if len(pts) > 3 and refs[0] == refs[-1] and any(inside(p, 0) for p in pts) and length(pts) > 120:
            # Un anillo empieza y termina en el mismo punto: se simplifica por mitades para que no colapse.
            half = len(pts) // 2
            layers["parks"].append(encode(simplify(pts[: half + 1], 3e-5)[:-1] + simplify(pts[half:], 3e-5)))
        continue
    kind = "major" if hw in MAJOR else "mid" if hw in MID else "minor" if hw in MINOR else None
    if not kind or tags.get("tunnel") == "yes": continue
    for part in pieces(refs):
        part = simplify(part, 2e-5 if kind != "minor" else 4e-5)
        if kind == "minor" and length(part) < 25: continue
        layers[kind].append(encode(part))
        if kind == "major" and tags.get("name") and "link" not in hw:
            named.setdefault(tags["name"], []).append(part)

# Rótulos: las vías principales más largas, cada una en el punto medio de su tramo más largo.
labels = []
for name, parts in sorted(named.items(), key=lambda kv: -sum(length(p) for p in kv[1])):
    if len(labels) >= 9: break
    longest = max(parts, key=length)
    mid = longest[len(longest) // 2]
    if not inside(mid, -0.004): continue
    if any(math.hypot(mid[0] - l["lat"], mid[1] - l["lng"]) < 0.004 for l in labels): continue
    a, b = longest[max(0, len(longest) // 2 - 1)], longest[min(len(longest) - 1, len(longest) // 2 + 1)]
    ang = math.degrees(math.atan2(-(b[0] - a[0]), (b[1] - a[1]) * math.cos(math.radians(4.65))))
    if ang > 90: ang -= 180
    if ang < -90: ang += 180
    labels.append({"text": name, "lat": round(mid[0], 5), "lng": round(mid[1], 5), "angle": round(ang)})

json.dump({"bbox": BBOX, "scale": E, **layers, "labels": labels, "attribution": "© colaboradores de OpenStreetMap"}, sys.stdout, separators=(",", ":"), ensure_ascii=False)
print({k: len(v) for k, v in layers.items()}, [l["text"] for l in labels], file=sys.stderr)
