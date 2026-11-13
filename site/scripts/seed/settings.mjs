import { images, svg, t, i } from "./_lib.mjs";
const img = images("inicio");

export default {
  _type: "settings",
  _id: "settings",
  siteName: "Ciudad y Cuerpo",
  siteUrl: "https://ciudadycuerpo.com",
  headerTitle: [t("ciudad "), i("y"), t(" cuerpo")],
  brandLabel: "LAB.",
  menuLabel: "MENÚ",
  menu: [
    { label: "Home", href: "/" },
    { label: "Para recicladores", href: "/para-recicladores/" },
    { label: "Lo que aprendimos de la calle", href: "/lo-que-aprendimos-de-la-calle/" },
    { label: "¿Cómo lo hicimos?", href: "/como-lo-hicimos/" },
    { label: "Equipo", href: "/equipo/" },
    { label: "Exhibición", href: "/exhibicion/" },
    { label: "Videojuego", href: "/videojuego/" },
  ],
  footer: {
    // El nodo de Figma termina en "(IDARTES), " (frase sin cerrar); se cierra con punto como en el render.
    credit: "Proyecto resultado de ARTEFACTUM — Laboratorio Artístico de Innovación Social: El diseño y lo digital en Chapinero 2026. Instituto Distrital de las Artes (IDARTES).",
    tone: "rosa",
    logos: [{ image: svg("/assets/images/comun/artefactum.svg", 285, 143, "ARTEfactum es Idartes") }],
  },
  seo: {
    title: "Ciudad y Cuerpo — arte, diseño y tecnología con recicladores de Chapinero",
    description: "Arte, diseño y tecnología creados junto a personas recicladoras de Chapinero. Proyecto resultado de ARTEFACTUM, Laboratorio Artístico de Innovación Social (IDARTES, 2026).",
    ogImage: img("hero-cuerpo", "Ciudad y Cuerpo"),
  },
  labels: {
    menu: "Menú principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skip: "Saltar al contenido",
    play: "Reproducir video",
    pending: "Video pendiente",
    prev: "Anterior",
    next: "Siguiente",
    close: "Cerrar",
    home: "Ciudad y Cuerpo, ir al inicio",
  },
};
