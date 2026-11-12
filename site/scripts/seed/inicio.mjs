// Inicio — frame 1:1289 (1440 × 7397). Las y son las del frame de Figma.
import { images, crop, t, b, i, body, canvas, image, text, title, card } from "./_lib.mjs";
const img = images("inicio");

const hero = canvas(200);
const cards = canvas(2760);

export default {
  _type: "page",
  _id: "page-inicio",
  title: "Inicio",
  slug: { current: "" },
  header: "display",
  dots: "fino",
  footerTone: "rosa",
  sections: [
    {
      _type: "collage",
      anchor: "inicio",
      rows: hero.rows(1577),
      items: [
        text(body("Arte, diseño y tecnología creados junto a personas recicladoras de Chapinero."), hero.at(104, 213, 430, 50), { size: 16 }),
        image(img("hero-cuadro", "Montaje de una proyección durante el laboratorio"), hero.at(299, 290, 183, 183, 2), { drift: 2 }),
        image(img("hero-taller", "Participantes del laboratorio reunidos alrededor de una mesa con maquetas de cartón"), hero.at(484, 488, 353, 265, 3), { drift: 4 }),
        image(img("hero-cuerpo", "Figura en duotono naranja y morado suspendida de una carreta de reciclaje", crop(-9.46, 0, 109.46, 100)), hero.at(782, 271, 545, 922, 1), { drift: 1 }),
        text(body("¿Cómo pasa la ciudad por el cuerpo de quienes la cargan, la arrastran y la recorren reciclando?"), hero.at(60, 825, 500, 110, 4), { tone: "ocre", level: 2 }),
        image(img("ilustracion-carreta", "Dibujo a línea de un reciclador halando su carreta cargada"), hero.at(46, 896, 538, 451), { fit: "contain", drift: 3 }),
        text(
          body(
            "A través de encuentros, conversaciones, ejercicios y experimentaciones colectivas, nos acercamos a Chapinero para observar sus dinámicas, reconocer sus historias y construir nuevas maneras de relacionarnos con el territorio.",
            [b("Un proceso de exploración que se convirtió en herramientas, experiencias y propuestas para la ciudad.")],
          ),
          hero.at(782, 1223, 545, 330),
        ),
        { _type: "rule", place: hero.at(0, 1577, 1440, 10), bleed: true },
      ],
    },
    {
      _type: "video",
      anchor: "microdocumental",
      // TODO: reemplazar por el ID real del microdocumental en YouTube (lo que va después de "v=").
      youtubeId: "TODO_MICRODOCUMENTAL_ARIEL",
      title: "Microdocumental: los recorridos de Ariel, recicladora de oficio",
      intro: body("Acompañamos a Ariel, recicladora de oficio, en algunos de sus recorridos por la ciudad."),
      caption: body("Este microdocumental nos acerca a su trabajo cotidiano y a las experiencias de quienes recuperan materiales y hacen parte de la vida de Chapinero."),
    },
    {
      _type: "cardGrid",
      layout: "free",
      anchor: "indice",
      rows: cards.rows(6960),
      dots: [cards.dots(280, 2610, 950, 2264)],
      items: [
        card("Para recicladores", "/para-recicladores/", img("card-recicladores", "Recicladora sonriente empujando su carreta cargada frente a un camión rojo"), "l", cards.at(60, 2962, 643, 700)),
        title([t("ciudad "), i("y"), t(" cuerpo")], "amarillo", cards.at(751, 2974, 142, 895, 5), { rotate: 90 }),
        card("Lo que aprendimos de la calle", "/lo-que-aprendimos-de-la-calle/", img("card-calle", "Carreta de reciclaje cargada de costales en una calle de Chapinero", { x: 0.5, y: 0.35 }), "m", cards.at(732, 3605, 425, 470)),
        card("¿Cómo lo hicimos?", "/como-lo-hicimos/", img("card-como", "Participante con los ojos vendados explora objetos e hilos sobre el piso"), "l", cards.at(179, 4417, 643, 700)),
        card("Equipo", "/equipo/", img("card-equipo", "El equipo del laboratorio reunido en círculo"), "s", cards.at(1044, 4417, 334, 370)),
        title("atención", "verde", cards.at(620, 5004, 760, 142, 4)),
        card("Exhibición", "/exhibicion/", img("card-exhibicion", "Sala de la exhibición con mesas, piezas y pendones"), "s", cards.at(508, 5276, 334, 370)),
        card("Video juego", "/videojuego/", img("card-videojuego", "Joven jugando Chapicartón en una máquina arcade"), "l", cards.at(738, 5775, 643, 700)),
        title("juego", "rojo", cards.at(60, 6121, 142, 299), { rotate: -90, italic: true }),
        title("La piel, \n(de)la ciudad.", "cian", cards.at(62, 6590, 1000, 284), { italic: true }),
      ],
    },
  ],
};
