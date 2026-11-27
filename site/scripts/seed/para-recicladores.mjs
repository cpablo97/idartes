// Para recicladores — frame 1:133 (1440 × 16776). Las y son las del frame de Figma.
import { images, crop, t, b, m, a, body, canvas, image, text, title, rule, explora } from "./_lib.mjs";
const img = images("para-recicladores");
const tuto = images("videotutoriales");
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
        { key: "bano", label: "Baños públicos", color: "#95ff00" },
        { key: "ccr", label: "Centros de cuidado al reciclador", color: "#f756ef" },
        { key: "acopio", label: "Asociaciones y centros de acopio", color: "#ffe100" },
      ],
      center: { lat: 4.6475, lng: -74.0655 },
      zoom: 15,
      // Lugares reales (Excel "Datosmapaschapinero", hoja Puntos). Las coordenadas se calcularon a partir de la dirección
      // (cruce de vías + metros de la placa) con datos de OpenStreetMap: son aproximadas y conviene revisarlas.
      // Los baños que funcionan dentro de un comedor o un CCR van como `also: ["bano"]` en ese mismo lugar.
      // Sin lat/lng = fuera del área del mapa: solo salen en la lista.
      places: [
        { name: "Lourdes", category: "comedor", also: ["bano"], kind: "Comedor comunitario", lat: 4.6436, lng: -74.06571, address: "Carrera 14 # 56-34, Local 2", service: "Tiene baño público, sin costo", schedule: "Lunes a viernes: 10:30 a. m. a 3:00 p. m. · Sábados: 10:30 a. m. a 2:00 p. m. · No abre en festivos ni el sábado de Semana Santa", hours: [{ days: [1, 2, 3, 4, 5], open: "10:30", close: "15:00" }, { days: [6], open: "10:30", close: "14:00" }] },
        { name: "Moraci", category: "comedor", also: ["bano"], kind: "Comedor comunitario", address: "Calle 98 # 5-78 Este", service: "Tiene baño público, sin costo", schedule: "Lunes a viernes: 10:30 a. m. a 3:00 p. m. · Sábados: 10:30 a. m. a 2:00 p. m. · No abre en festivos ni el sábado de Semana Santa", hours: [{ days: [1, 2, 3, 4, 5], open: "10:30", close: "15:00" }, { days: [6], open: "10:30", close: "14:00" }] },
        { name: "Pardo Rubio", category: "comedor", also: ["bano"], kind: "Comedor comunitario", lat: 4.63265, lng: -74.05867, address: "Calle 47B # 3-26 Este", service: "Tiene baño público, sin costo", schedule: "Lunes a viernes: 10:30 a. m. a 3:00 p. m. · Sábados: 10:30 a. m. a 2:00 p. m. · No abre en festivos ni el sábado de Semana Santa", hours: [{ days: [1, 2, 3, 4, 5], open: "10:30", close: "15:00" }, { days: [6], open: "10:30", close: "14:00" }] },
        { name: "Doce de Octubre", category: "comedor", also: ["bano"], kind: "Comedor comunitario", lat: 4.67291, lng: -74.07764, address: "Calle 74 # 57A-17", locality: "Barrios Unidos", service: "Tiene baño público, sin costo", schedule: "Lunes a viernes: 10:30 a. m. a 3:00 p. m. · Sábados: 10:30 a. m. a 2:00 p. m. · No abre en festivos ni el sábado de Semana Santa", hours: [{ days: [1, 2, 3, 4, 5], open: "10:30", close: "15:00" }, { days: [6], open: "10:30", close: "14:00" }] },
        { name: "CCR Los Mártires (1)", category: "ccr", also: ["bano"], kind: "Centro de Cuidado al Reciclador", lat: 4.61292, lng: -74.07911, address: "Calle 21 # 18A-59", locality: "Los Mártires", service: "Tiene baño público, sin costo", schedule: "Lunes a sábado: 7:00 a. m. a 10:30 p. m.", hours: [{ days: [1, 2, 3, 4, 5, 6], open: "07:00", close: "22:30" }] },
        { name: "CCR Los Mártires (2)", category: "ccr", also: ["bano"], kind: "Centro de Cuidado al Reciclador", lat: 4.6104, lng: -74.0768, address: "Calle 20 # 15-46", locality: "Los Mártires", service: "Tiene baño público, sin costo", schedule: "Lunes a sábado: 7:00 a. m. a 10:00 p. m.", hours: [{ days: [1, 2, 3, 4, 5, 6], open: "07:00", close: "22:00" }] },
        { name: "CCR Barrios Unidos", category: "ccr", also: ["bano"], kind: "Centro de Cuidado al Reciclador", lat: 4.66775, lng: -74.07199, address: "Calle 73 # 29B-20", locality: "Barrios Unidos", service: "Tiene baño público, sin costo", schedule: "Lunes a viernes: 24 horas · Sábados: 7:00 a. m. a 6:00 p. m.", hours: [{ days: [1, 2, 3, 4, 5], open: "00:00", close: "24:00" }, { days: [6], open: "07:00", close: "18:00" }] },
        { name: "CCR Usaquén", category: "ccr", also: ["bano"], kind: "Centro de Cuidado al Reciclador", address: "Calle 163A # 19A-85", locality: "Usaquén", service: "Tiene baño público, sin costo", schedule: "Lunes a viernes: 7:00 a. m. a 3:00 p. m. y de 9:30 p. m. a 7:00 a. m. · Sábados: 7:00 a. m. a 3:00 p. m.", hours: [{ days: [1, 2, 3, 4, 5, 6], open: "07:00", close: "15:00" }, { days: [1, 2, 3, 4, 5], open: "21:30", close: "24:00" }, { days: [2, 3, 4, 5, 6], open: "00:00", close: "07:00" }] },
        { name: "MAPRONAL - Asociación de Recicladores Manejo de Aprovechamiento Nacional", category: "acopio", kind: "Asociación de recicladores y centro de acopio", lat: 4.65982, lng: -74.06354, address: "Carrera 17 # 71A-19", schedule: "Lunes a viernes: 8:00 a. m. a 6:00 p. m. · Sábados: 8:00 a. m. a 12:00 del mediodía", hours: [{ days: [1, 2, 3, 4, 5], open: "08:00", close: "18:00" }, { days: [6], open: "08:00", close: "12:00" }] },
        { name: "Asociación Reciclando Ando", category: "acopio", kind: "Asociación de recicladores y centro de acopio", lat: 4.64453, lng: -74.05402, address: "Carrera 1 # 63-40, Interior 9", schedule: "Lunes a viernes: 8:00 a. m. a 6:00 p. m. · Sábados: 8:00 a. m. a 12:00 del mediodía", hours: [{ days: [1, 2, 3, 4, 5], open: "08:00", close: "18:00" }, { days: [6], open: "08:00", close: "12:00" }] },
        { name: "ASORELLE - Asociación de Recicladores", category: "acopio", kind: "Asociación de recicladores y centro de acopio", lat: 4.65784, lng: -74.06789, address: "Carrera 21 # 68-57", locality: "Barrios Unidos", schedule: "Lunes a viernes: 8:00 a. m. a 6:00 p. m. · Sábados: 8:00 a. m. a 12:00 del mediodía", hours: [{ days: [1, 2, 3, 4, 5], open: "08:00", close: "18:00" }, { days: [6], open: "08:00", close: "12:00" }] },
        { name: "Asociación de Recicladores Julio Flores y 12 de Octubre", category: "acopio", kind: "Asociación de recicladores y centro de acopio", lat: 4.68143, lng: -74.08589, address: "Carrera 68G # 73A-42", locality: "Barrios Unidos", schedule: "Lunes a viernes: 8:00 a. m. a 6:00 p. m. · Sábados: 8:00 a. m. a 12:00 del mediodía", hours: [{ days: [1, 2, 3, 4, 5], open: "08:00", close: "18:00" }, { days: [6], open: "08:00", close: "12:00" }] },
        { name: "Avenida Chile", category: "bano", kind: "Baño público", lat: 4.65648, lng: -74.05787, address: "Calle 72 # 10-34", cost: "Sin costo", schedule: "Lunes a jueves: 8:00 a. m. a 9:00 p. m. · Viernes y sábados: 8:00 a. m. a 10:00 p. m. · Domingos: 8:30 a. m. a 9:00 p. m.", hours: [{ days: [1, 2, 3, 4], open: "08:00", close: "21:00" }, { days: [5, 6], open: "08:00", close: "22:00" }, { days: [0], open: "08:30", close: "21:00" }] },
        { name: "Centro de Alta Tecnología", category: "bano", kind: "Baño público", lat: 4.66355, lng: -74.05783, address: "Carrera 15 # 77-05", cost: "Posible costo: $2.500 COP (por confirmar)", schedule: "Lunes a sábado: 8:00 a. m. a 8:00 p. m. · Domingos: 10:00 a. m. a 6:00 p. m.", hours: [{ days: [1, 2, 3, 4, 5, 6], open: "08:00", close: "20:00" }, { days: [0], open: "10:00", close: "18:00" }] },
        { name: "Cosmos 64", category: "bano", kind: "Baño público", lat: 4.6504, lng: -74.06265, address: "Calle 64 # 11-37", cost: "Posible costo: $2.500 COP (por confirmar)", schedule: "Todos los días: 9:00 a. m. a 8:00 p. m.", hours: [{ days: [0, 1, 2, 3, 4, 5, 6], open: "09:00", close: "20:00" }] },
        { name: "Unilago", category: "bano", kind: "Baño público", lat: 4.6646, lng: -74.0572, address: "Carrera 15 # 78-33", cost: "Posible costo: $2.500 COP (por confirmar)", schedule: "Todos los días: 9:00 a. m. a 8:00 p. m.", hours: [{ days: [0, 1, 2, 3, 4, 5, 6], open: "09:00", close: "20:00" }] },
        { name: "Chapi Centro", category: "bano", kind: "Baño público", lat: 4.64846, lng: -74.06368, address: "Carrera 13 # 61-65", cost: "Posible costo: $2.500 COP (por confirmar)", schedule: "8:00 a. m. a 10:00 p. m. (días por confirmar)" },
        { name: "Plaza 39", category: "bano", kind: "Baño público", lat: 4.62614, lng: -74.066, address: "Diagonal 40A # 7-40", cost: "Posible costo: $2.500 COP (por confirmar)", schedule: "Lunes a sábado: 8:00 a. m. a 8:30 p. m. · Domingos: 9:00 a. m. a 8:30 p. m.", hours: [{ days: [1, 2, 3, 4, 5, 6], open: "08:00", close: "20:30" }, { days: [0], open: "09:00", close: "20:30" }] },
        { name: "Aquarium Centro Comercial y Empresarial", category: "bano", kind: "Baño público", lat: 4.64629, lng: -74.06288, address: "Calle 60 # 9-83", cost: "Posible costo: $2.500 COP (por confirmar)", schedule: "Lunes a sábado: 9:00 a. m. a 8:00 p. m. · Domingos: por confirmar" },
        { name: "Plaza Shopping 59", category: "bano", kind: "Baño público", lat: 4.64628, lng: -74.06405, address: "Carrera 13 # 59-38", cost: "Por confirmar", schedule: "Lunes a sábado: 9:00 a. m. a 6:00 p. m. · Domingos: 9:00 a. m. a 5:00 p. m.", hours: [{ days: [1, 2, 3, 4, 5, 6], open: "09:00", close: "18:00" }, { days: [0], open: "09:00", close: "17:00" }] },
        { name: "Centro Comercial Galerías", category: "bano", kind: "Baño público", lat: 4.64335, lng: -74.07484, address: "Calle 53B # 25-21", locality: "Teusaquillo", cost: "Sin costo", schedule: "Lunes a jueves: 8:30 a. m. a 8:30 p. m. · Viernes y sábados: 8:30 a. m. a 9:00 p. m. · Domingos y festivos: 9:30 a. m. a 8:00 p. m.", hours: [{ days: [1, 2, 3, 4], open: "08:30", close: "20:30" }, { days: [5, 6], open: "08:30", close: "21:00" }, { days: [0], open: "09:30", close: "20:00" }] },
        { name: "Pasaje Comercial 7 de Agosto", category: "bano", kind: "Baño público", lat: 4.65814, lng: -74.07086, address: "Carrera 25 # 66-61", locality: "Barrios Unidos", cost: "Por confirmar", schedule: "8:00 a. m. a 5:00 p. m. (días por confirmar)" },
        { name: "Parque Nacional Enrique Olaya Herrera", category: "bano", kind: "Baño público", lat: 4.6243, lng: -74.0662, address: "Carrera 7 entre calles 36 y 39", locality: "Santa Fe", cost: "Sin costo", schedule: "9:00 a. m. a 6:00 p. m. (horario administrativo; días por confirmar)" },
        { name: "Centro Felicidad Chapinero (CEFE Chapinero)", category: "bano", kind: "Baño público", lat: 4.6655, lng: -74.0526, address: "Calle 82 # 10-69", cost: "Sin costo", schedule: "9:00 a. m. a 6:00 p. m. (horario administrativo; días por confirmar)" },
      ],
      placeholder: img("mapa-captura", ""),
      // TODO: confirmar la fecha de la última revisión y la cuenta de Instagram.
      note: body([
        b("Fuentes y actualización, "),
        t("La información del mapa viene de la Secretaría Distrital de Integración Social (SDIS), la Unidad Administrativa Especial de Servicios Públicos (UAESP), IDECA y la Alcaldía Mayor de Bogotá, con consulta complementaria en Google Maps y observación directa del Laboratorio. Los horarios y costos pueden cambiar: si encuentras algo distinto, cuéntanos en Instagram "),
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
          youtubeId: "tEkV2sXb8CE",
          poster: tuto("video-1", "Portada del videotutorial 1: Calentamiento antes de salir a reciclar"),
          title: "Prepara tu cuerpo antes de salir",
          description: "Antes de arrancar la jornada, dedica unos minutos a mover hombros, escápulas y muñecas. Son zonas que usas constantemente al empujar, levantar y cargar material.",
        },
        {
          label: "Video 2",
          youtubeId: "h4_8pcst8U4",
          poster: tuto("video-2", "Portada del videotutorial 2: Ejercicios de piernas y forma de agacharse"),
          title: "Tren inferior: dale fuerza a tus piernas",
          description: "En este video aprenderás ejercicios como sentadillas, estocadas y elevaciones de talón, además de formas de recoger material del suelo cuidando la postura.",
        },
        {
          label: "Video 3",
          youtubeId: "GRp43h0o3VY",
          poster: tuto("video-3", "Portada del videotutorial 3: Ejercicios de espalda y hombros"),
          title: "Trabajo escapular: mueve mejor tus hombros",
          description: "Al empujar la carreta y cargar material, tus hombros y tu espalda hacen un gran esfuerzo. Aquí encontrarás ejercicios para trabajar las escápulas y mejorar el control de los hombros.",
        },
        {
          label: "Video 4",
          youtubeId: "takQTBJNOVY",
          poster: tuto("video-4", "Portada del videotutorial 4: Ejercicios de abdomen"),
          title: "Abdomen: encuentra tu punto de apoyo",
          description: "En este video encontrarás ejercicios de distintos niveles, que puedes hacer en el piso, con apoyo o colgado de una barra, para trabajar la estabilidad del cuerpo.",
        },
        {
          label: "Video 5",
          youtubeId: "mXYVKL0HkSo",
          poster: tuto("video-5", "Portada del videotutorial 5: Estiramientos al terminar la jornada"),
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
