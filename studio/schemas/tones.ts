// Tokens de color de marca: las custom properties de site/public/css/styles.css.
// El valor guardado es el nombre del token; el hex solo sirve para pintar la muestra en el Studio.
export const TONES = [
  { title: "Negro", value: "negro", hex: "#000000" },
  { title: "Blanco", value: "blanco", hex: "#ffffff" },
  { title: "Morado", value: "morado", hex: "#5b0e96" },
  { title: "Rosa", value: "rosa", hex: "#e56aab" },
  { title: "Magenta", value: "magenta", hex: "#f756ef" },
  { title: "Amarillo", value: "amarillo", hex: "#ffc130" },
  { title: "Verde", value: "verde", hex: "#3eaf3f" },
  { title: "Rojo", value: "rojo", hex: "#ff6058" },
  { title: "Cian", value: "cian", hex: "#30e0ff" },
  { title: "Ocre", value: "ocre", hex: "#b05400" },
  { title: "Gris", value: "gris", hex: "#6b6b6b" },
];

export const HEX = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
export const isTone = (v: unknown) => typeof v === "string" && (TONES.some((t) => t.value === v) || HEX.test(v));
/** Token → hex (para las vistas previas del Studio). */
export const toneHex = (v: string | undefined) => (v ? (TONES.find((t) => t.value === v)?.hex ?? v) : undefined);
