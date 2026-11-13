// Para recicladores — frame 1:133 (1440 × 16776). Las y son las del frame de Figma.
import { images, crop, t, b, m, a, body, canvas, image, text, title, rule, explora } from "./_lib.mjs";
const img = images("para-recicladores");
const imgMapa = images("mapa");
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
        { key: "comedor", label: "Comedores comunitarios", color: "#0048d8" },
        { key: "bano", label: "Baños publicos", color: "#95ff00" }, // (sic) sin tilde en el diseño
        { key: "acopio", label: "Centros de acopio", color: "#ffe100" },
      ],
      center: { lat: 4.6448, lng: -74.0652 },
      zoom: 15,
      // TODO: reemplazar por los lugares reales. Salvo "Toku" (el ejemplo del diseño), todos son INVENTADOS de relleno
      // (`demo: true`): nombres, direcciones, servicios y horarios no existen. Al cargar los reales, quitar `demoLabel`.
      demoLabel: "Lugares de ejemplo",
      places: [
        { name: "Toku", category: "comedor", kind: "Comedor comunitario", lat: 4.6441, lng: -74.0627, address: "Carrera 7 #57-05", service: "Almuerzos, alimentación comunitaria", schedule: "Sábados · 12:00–3:00 p. m.", hours: [{ days: [6], open: "12:00", close: "15:00" }], photo: imgMapa("toku", "Letrero de Toku entre plantas"), demo: true },
        { name: "La Olla Común", category: "comedor", kind: "Comedor comunitario", lat: 4.6519, lng: -74.0661, address: "Calle 63 #9-40", service: "Desayunos y almuerzos", schedule: "Lunes a viernes · 7:00 a. m.–2:00 p. m.", hours: [{ days: [1, 2, 3, 4, 5], open: "07:00", close: "14:00" }], demo: true },
        { name: "El Fogón de la 45", category: "comedor", kind: "Comedor comunitario", lat: 4.6337, lng: -74.0669, address: "Carrera 13 #45-20", service: "Almuerzos", schedule: "Lunes a sábado · 11:30 a. m.–2:30 p. m.", hours: [{ days: [1, 2, 3, 4, 5, 6], open: "11:30", close: "14:30" }], demo: true },
        { name: "Baño público Calle 60", category: "bano", kind: "Baño público", lat: 4.6468, lng: -74.0644, address: "Calle 60 con carrera 9", service: "Baños y lavamanos, sin costo", schedule: "Todos los días · 6:00 a. m.–8:00 p. m.", hours: [{ days: [0, 1, 2, 3, 4, 5, 6], open: "06:00", close: "20:00" }], demo: true },
        { name: "Baño público Calle 53", category: "bano", kind: "Baño público", lat: 4.6402, lng: -74.0655, address: "Calle 53 con carrera 13", service: "Baños, lavamanos y punto de agua", schedule: "Lunes a sábado · 7:00 a. m.–6:00 p. m.", hours: [{ days: [1, 2, 3, 4, 5, 6], open: "07:00", close: "18:00" }], demo: true },
        { name: "Baño público Calle 67", category: "bano", kind: "Baño público", lat: 4.6556, lng: -74.0612, address: "Calle 67 con carrera 7", service: "Baños y lavamanos", schedule: "Todos los días · 24 horas", hours: [{ days: [0, 1, 2, 3, 4, 5, 6], open: "00:00", close: "24:00" }], demo: true },
        { name: "Bodega La Balanza", category: "acopio", kind: "Centro de acopio", lat: 4.6489, lng: -74.0697, address: "Avenida Caracas #61-18", service: "Compra de cartón, papel, plástico y vidrio", schedule: "Lunes a sábado · 6:00 a. m.–6:00 p. m.", hours: [{ days: [1, 2, 3, 4, 5, 6], open: "06:00", close: "18:00" }], demo: true },
        { name: "Acopio El Cartón", category: "acopio", kind: "Centro de acopio", lat: 4.6381, lng: -74.0702, address: "Avenida Caracas #49-32", service: "Compra de cartón, archivo y chatarra", schedule: "Lunes a viernes · 7:00 a. m.–5:00 p. m.", hours: [{ days: [1, 2, 3, 4, 5], open: "07:00", close: "17:00" }], demo: true },
        { name: "Punto de acopio La 39", category: "acopio", kind: "Centro de acopio", lat: 4.6292, lng: -74.0676, address: "Calle 39 #13-50", service: "Compra de PET, aluminio y cartón", schedule: "Lunes a domingo · 8:00 a. m.–8:00 p. m.", hours: [{ days: [0, 1, 2, 3, 4, 5, 6], open: "08:00", close: "20:00" }], demo: true },
      ],
      placeholder: img("mapa-captura", ""),
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
