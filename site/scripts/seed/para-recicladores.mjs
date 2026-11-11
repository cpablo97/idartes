// Para recicladores — frame 1:133 (1440 × 16776). Las y son las del frame de Figma.
import { images, crop, t, b, m, a, body, canvas, image, text, title, rule, explora } from "./_lib.mjs";
const img = images("para-recicladores");
const inicio = images("inicio");

const intro = canvas(927);
const videos = canvas(5401);
const creditos = canvas(13401);
const cierre = canvas(15981);

// Fotos del frame (también alimentan la galería mientras llegan las definitivas).
const foto = {
  costal: img("duotono-costal", "Figura en duotono naranja y morado que avanza agachada con un costal a la espalda", crop(-1.11, -35.67, 101.67, 145.11)),
  mano: img("mano-madera", "Una mano agarra con fuerza el extremo de una tabla de madera gastada"),
  colgada: img("duotono-colgada", "Figura en duotono naranja y morado suspendida de los brazos de una carreta de reciclaje", crop(-9.46, 0, 109.46, 100)),
  cuclillas: img("cuclillas-carreta", "Mujer en cuclillas, con las manos juntas, al lado de la rueda de una carreta"),
  calle: img("carreta-calle", "Una persona empuja por la calle una carreta de reciclaje en la que va subida otra persona", crop(-4.62, 0, 107.63, 100)),
  gorra: img("reciclador-gorra", "Reciclador con gorra que sonríe mientras carga una tabla junto a su carreta llena de costales"),
  tabla: img("manos-tabla", "Dos brazos levantados sostienen una tabla de madera sobre la cabeza", crop(0, -24.91, 100, 149.83)),
  cargando: img("cargando-tabla", "Mujer inclinada hacia adelante que carga una tabla de madera en un parque", crop(0, -8.87, 100, 151.27)),
  brazos: img("brazos-arriba", "Mujer de espaldas, con los brazos arriba, sostiene los brazos de madera de una carreta en un parque"),
  barra: img("estiramiento-barra", "Mujer que estira la espalda agarrada de una barra roja de un parque", crop(0, -7.91, 100, 149.83)),
};

export default {
  _type: "page",
  _id: "page-para-recicladores",
  title: "Para recicladores",
  slug: { current: "para-recicladores" },
  header: "small",
  dots: "amplio",
  footerTone: "#ffe867",
  seo: {
    description: "Datos útiles y movimientos que te sirven en la jornada: un mapa de Chapinero con lugares para comer, ir al baño y vender materiales, y cinco videotutoriales para cuidar el cuerpo. Creado junto a recicladores de Chapinero.",
  },
  sections: [
    {
      _type: "hero",
      // La foto del Figma va girada 90° y recortada: el original se preparó así en assets/originales.
      image: img("hero-dibujos", "Dibujos a lápiz sobre papel calcado, hilos de lana, recortes verdes y un bolígrafo verde sobre una mesa del laboratorio"),
      blur: true,
      eyebrow: "PA EL CAMINO",
      phrase: "Datos útiles y movimientos que te sirven en la jornada.",
      footnote: "Creado junto a recicladores de Chapinero.",
    },
    {
      _type: "collage",
      rows: intro.rows(4085),
      dots: [intro.dots(206, 1657, 950, 2264, true)],
      items: [
        text(body([b("Cada recorrido tiene su historia.")]), intro.at(60, 1087, 560, 40), { nowrap: true, level: 2 }),
        image(foto.costal, intro.at(623, 1087, 180, 183, 2), { drift: 2 }),
        image(foto.mano, intro.at(60, 1183, 334, 334, 1), { drift: 1 }),
        text(body("Quienes recorren Chapinero recuperando materiales conocen la ciudad de una manera particular: sus calles, sus ritmos, sus lugares y todo lo que ocurre en el camino."), intro.at(60, 1577, 668, 110, 3), { tone: "rosa" }),
        image(foto.colgada, intro.at(820, 1350, 560, 920, 1), { drift: 1 }),
        image(foto.cuclillas, intro.at(284, 1745, 334, 334, 2), { drift: 3 }),
        text(
          body([b("De esas experiencias nació este proyecto. "), m("Junto a Ariel, Alejandra, Edwin, Yordanis y otros compañeros del oficio, creamos herramientas pensadas desde sus recorridos y su manera de vivir la ciudad.")]),
          intro.at(60, 2390, 630, 150, 3),
        ),
        image(foto.calle, intro.at(60, 2654, 336, 271, 2), { drift: 2 }),
        image(foto.gorra, intro.at(596, 2654, 672, 584, 1), { drift: 1 }),
        image(foto.tabla, intro.at(148, 3214, 183, 183, 2), { drift: 3 }),
        // "costilas" (sic): errata del diseño, se conserva.
        title("la ciudad en \nlas costilas.", "#9c3841", intro.at(421, 3570, 851, 284, 4)),
      ],
    },
    {
      _type: "map",
      anchor: "mapa",
      title: "Puntos clave para tu recorrido",
      body: body("Aquí encontrarás un mapa de Chapinero con lugares \npara comer, ir al baño y vender tus materiales."),
      legend: [
        { label: "Comedores comunitarios", color: "#0048d8" },
        { label: "Baños publicos", color: "#95ff00" }, // (sic) sin tilde en el diseño
        { label: "Centros de acopio", color: "#ffe100" },
      ],
      // TODO: reemplazar por la URL de inserción del mapa de Google My Maps (…/maps/d/embed?mid=<id>) y poner `pending: false`.
      embedUrl: "https://www.google.com/maps/d/embed?mid=TODO",
      pending: true,
      pendingLabel: "Mapa pendiente",
      placeholder: img("mapa-captura", "Captura de referencia: mapa en grises de Chapinero con puntos numerados"),
      // TODO: completar "[fuentes: …]" y "[fecha]" (marcadores literales del diseño) y confirmar la cuenta de Instagram.
      note: body([
        b("Fuentes y actualización, "),
        t("La información del mapa viene de [fuentes: Secretaría de Integración Social, UAESP, Alcaldía Local de Chapinero, recorridos del equipo]. La revisamos por última vez el [fecha]. Los horarios pueden cambiar: si encuentras algo distinto, cuéntanos en Instagram "),
        a("@cargarbogota.", "https://www.instagram.com/cargarbogota/", "strong", "underline"),
      ]),
    },
    {
      _type: "collage",
      rows: videos.rows(7194),
      items: [
        rule(videos.at(0, 5401, 1440, 10), { bleed: true }),
        text(body("Video tutoriales"), videos.at(60, 5431, 600, 50), { size: 31, font: "doto", nowrap: true, level: 2 }),
        text(
          body([b("Tu cuerpo te acompaña en cada recorrido y también merece cuidado. "), t("Junto a los recicladores, creamos cinco videos con ejercicios y consejos que puedes poner en práctica durante la jornada. ")]),
          videos.at(60, 5551, 811, 110),
        ),
        image(foto.cargando, videos.at(399, 5719, 334, 334, 2), { drift: 2 }),
        image(foto.brazos, videos.at(823, 6053, 560, 920, 1), { drift: 1 }),
        image(foto.barra, videos.at(60, 6331, 334, 334, 2), { drift: 3 }),
        text(body("Encuentra nuevas formas de moverte, aliviar tensiones y cuidar tu cuerpo mientras trabajas."), videos.at(60, 6785, 610, 80, 3)),
        {
          _type: "notice",
          title: "Aviso:",
          body: "Si sientes un dolor fuerte o que no se va, consulta en un centro de salud. Estos videos no reemplazan la atención médica.",
          tone: "#d89009",
          place: videos.at(60, 6947, 1323, 98, 5),
        },
      ],
    },
    {
      _type: "videoList",
      anchor: "videotutoriales",
      videos: [
        {
          label: "Video 1",
          youtubeId: "TODO_VIDEO_1", // TODO: ID real de YouTube (lo que va después de "v=").
          title: "Prepara tu cuerpo antes de salir",
          description: "Antes de arrancar la jornada, dedica unos minutos a mover hombros, escápulas y muñecas. Son zonas que usas constantemente al empujar, levantar y cargar material.",
        },
        {
          label: "Video 2",
          youtubeId: "TODO_VIDEO_2", // TODO: ID real de YouTube.
          title: "Tren inferior: dale fuerza a tus piernas",
          description: "En este video aprenderás ejercicios como sentadillas, estocadas y elevaciones de talón, además de formas de recoger material del suelo cuidando la postura.",
        },
        {
          label: "Video 3",
          youtubeId: "TODO_VIDEO_3", // TODO: ID real de YouTube.
          title: "Trabajo escapular: mueve mejor tus hombros",
          description: "Al empujar la carreta y cargar material, tus hombros y tu espalda hacen un gran esfuerzo. Aquí encontrarás ejercicios para trabajar las escápulas y mejorar el control de los hombros.",
        },
        {
          label: "Video 4",
          youtubeId: "TODO_VIDEO_4", // TODO: ID real de YouTube.
          title: "Abdomen: encuentra tu punto de apoyo",
          description: "En este video encontrarás ejercicios de distintos niveles, que puedes hacer en el piso, con apoyo o colgado de una barra, para trabajar la estabilidad del cuerpo.",
        },
        {
          label: "Video 5",
          youtubeId: "TODO_VIDEO_5", // TODO: ID real de YouTube.
          title: "Tracciones: dale un respiro a tu espalda",
          description: "En este video encontrarás ejercicios de estiramiento y tracción, incluidas algunas opciones con una barra. Hazlos con calma y sin forzar el movimiento.",
        },
      ],
    },
    {
      _type: "collage",
      rows: creditos.rows(13921),
      items: [
        // Espacios y barras tal cual el diseño ("/Producción", "Triana ,").
        text(
          body([
            m("Equipo: Alejandra, Recicladora / Instrucción y narración: Diana Carolina Castañeda Barragán /Producción: Juan Tirado y Samuel Olarte Espitia / Posproducción: José Alberto Miranda Álvarez / Asesoría en fisioterapia: Carolina Acosta / "),
            t("Artistas cocreadores: "),
            m("Camilo Enrique Muñoz Triana , Santiago Andonoff Gaitán, Eduardo Antonio Castro Patiño, Sebastián Espitia Riaño, Camilo Fernando Castañeda Murcia, Yineth Andrea Sandino Cordón, Yenny Alejandra Osma Palacios, Nelson Mauricio Rodríguez Ayala, Carol Sofía Cuervo Lizarazu, Johan Andretty Lozano Suárez, Natalia Patricia Ahumada Baptista, Daniel Felipe García Lagos, Carlos Andrés Saray Orozco / "),
            t("Laboratorista:"),
            m(" Víctor Gómez / "),
            t("Orientadora metodológica:"),
            m(" Laura Ximena Garrido /"),
            t(" Productor de campo: "),
            m("Wilson Dueñas"),
          ]),
          creditos.at(708, 13471, 672, 330),
          { size: 20, align: "justify", variant: "creditos" },
        ),
      ],
    },
    {
      _type: "gallery",
      anchor: "galeria",
      title: "Galería",
      heading: "¿De dónde salió todo esto? ",
      body: body("Lo conversamos con recicladores y, a partir de sus experiencias, identificamos cuatro temas clave: dónde comer, dónde hacer una pausa, dónde vender el material y cómo cuidar el cuerpo durante el trabajo."),
      // TODO: reemplazar por las fotos definitivas de la carpeta de Drive (por ahora son las fotos de esta misma página).
      images: [foto.gorra, foto.brazos, foto.calle, foto.colgada, foto.cuclillas, foto.mano, foto.cargando, foto.costal, foto.barra, foto.tabla].map((f) => ({ image: { local: f.local, alt: f.alt } })),
    },
    explora([
      ["Lo que aprendimos de la calle", "/lo-que-aprendimos-de-la-calle/", inicio("card-calle", "Carreta de reciclaje cargada de costales en una calle de Chapinero", { x: 0.5, y: 0.35 })],
      ["Chapicartón", "/videojuego/", inicio("card-videojuego", "Joven jugando Chapicartón en una máquina arcade")],
      ["¿Cómo lo hicimos?", "/como-lo-hicimos/", inicio("card-como", "Participante con los ojos vendados explora objetos e hilos sobre el piso")],
      ["Exhibición", "/exhibicion/", inicio("card-exhibicion", "Sala de la exhibición con mesas, piezas y pendones")],
    ]),
    {
      _type: "collage",
      rows: cierre.rows(16326),
      items: [
        title("el peso, ", "#d52c15", cierre.at(322, 15984, 571, 142), { align: "right" }),
        title("a peso.", "#d52c15", cierre.at(497, 16126, 571, 142), { align: "right" }),
      ],
    },
  ],
};
