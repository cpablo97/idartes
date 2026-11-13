// ¿Cómo lo hicimos? — frame 1:452 (1440 × 41402). Las y son las del frame de Figma;
// en la línea de tiempo son relativas a la sección (yi), como en el archivo de diseño.
import { images, crop, t, b, i, a, body, canvas, image, text, title, rule, explora } from "./_lib.mjs";
const img = images("como-lo-hicimos");
const inicio = images("inicio");
const comun = images("comun");

const MORADO = { weight: 500 }; // "P-morado": Schibsted Grotesk Medium 24 (el morado es el color por defecto)
const V = "#023c0f"; // verde oscuro de las citas de la línea de tiempo
const AZUL = "#678dff"; // palabras display de la línea de tiempo
const ENLACE = { size: 16, weight: 600, tone: "#ef8e34", align: "right", nowrap: true, variant: "enlace" };

const intro = canvas(927);
const reflexion = canvas(31245);
const citas = canvas(34023);
const llevamos = canvas(35517);
const creditos = canvas(37787);

// ----- línea de tiempo -----
const TL_Y = 5722.59; // y del frame donde empieza la sección
const r10 = (n) => Math.round(n / 10);
/** Un paso: lienzo que va desde su punto (yi) hasta el punto siguiente. `build` recibe el lienzo con y relativas a la sección. */
const paso = (titulo, dot, next, build) => ({ title: titulo, rows: r10(next) - r10(dot), items: build(canvas(r10(dot) * 10)) });
const B = (str, place, extra = {}) => text(body(str), place, extra);
const W = (spans, place, extra = {}) => title(spans, AZUL, place, extra);

export default {
  _type: "page",
  _id: "page-como-lo-hicimos",
  title: "¿Cómo lo hicimos?",
  slug: { current: "como-lo-hicimos" },
  header: "small",
  menuTone: "blanco",
  footerTone: "#67ff8d",
  dots: "amplio",
  seo: {
    description: "Investigar, escuchar y diseñar: el proceso del laboratorio Ciudad y Cuerpo, paso a paso, junto a recicladoras y recicladores de Chapinero.",
  },
  sections: [
    {
      _type: "hero",
      image: img("hero-taller-estructura", "Participantes del laboratorio prueban una estructura con anillas en el taller", crop(-6.39, -27.92, 128.08, 163.28)),
      eyebrow: "¿CÓMO LO HICIMOS?",
      phrase: "Investigar, escuchar y diseñar",
      tone: "blanco",
      footnote: "Creado junto a recicladores de Chapinero.",
    },

    // ---------- Intro ----------
    {
      _type: "collage",
      anchor: "inicio-del-proceso",
      rows: 480,
      dots: [intro.dots(0, 1102, 838, 2264, true)],
      items: [
        text(body("El 21 de mayo de 2026 nos reunimos por primera vez en círculo en la Universidad LCI, en Chapinero. "), intro.at(61, 982, 597), MORADO),
        image(img("intro-mesa-lci", "Participantes del laboratorio escriben y dibujan alrededor de una mesa larga", crop(-6.92, 0, 133.33, 100)), intro.at(61, 1174, 783, 783), { drift: 2 }),
        text(
          body("Veníamos de distintos campos: cine, fotografía, grafiti, moda, diseño, ilustración, arquitectura, baile y canto. Nos convocó ARTEFACTUM Laboratorio Artístico de Innovación Social: El diseño y lo digital en Chapinero 2026, de IDARTES, para explorar la relación entre el diseño, lo digital y el territorio."),
          intro.at(60, 2176, 597),
          MORADO,
        ),
        image(img("intro-ronda-sillas", "Tres participantes conversan sentados en ronda frente a un panel de LCI Bogotá", crop(0, -25.33, 105.12, 140.17)), intro.at(932, 2176, 448, 448), { drift: 3 }),
        image(img("intro-proyeccion", "Una pantalla iluminada en una sala oscura muestra una mesa redonda vista desde arriba"), intro.at(61, 2612, 559, 559)),
        title([t("leer("), i("nos"), t(")")], "#67ff8d", intro.at(570, 2919, 851, 142, 7)),
        text(
          body(["En esa primera ronda aparecieron temas que nos acompañaron durante el proceso: ", b("el agua, los cuerpos, las relaciones de cercanía, los sonidos de la ciudad, la humanidad y la sostenibilidad."), " "]),
          intro.at(61, 3231, 559),
          MORADO,
        ),
        image(img("intro-tablero-ejes", "Dos participantes observan un tablero blanco con notas adhesivas"), intro.at(732, 3317, 648, 648), { drift: 2 }),
        text(body("A medida que avanzamos, empezamos a encontrar conexiones entre esas inquietudes y una pregunta común: "), intro.at(732, 4025, 559), { weight: 500, tone: "#ffc130" }),
        text(body("¿cómo puede una ciudad estar tan conectada por la tecnología y, al mismo tiempo, tan distante de las personas que la habitan?"), intro.at(61, 4245, 671), { font: "doto", level: 2 }),
        image(img("intro-notas-ejes", "Notas adhesivas naranjas organizadas sobre dos ejes de cinta amarilla en una pared", crop(-15.02, 0, 133.33, 100)), intro.at(60, 4373, 800, 800)),
        image(img("intro-pregunta-proyectada", "Siluetas de participantes frente a una pregunta proyectada en la oscuridad"), intro.at(890, 4373, 400, 400), { drift: 3 }),
        image(img("intro-hilos-vendada", "Participante con los ojos vendados explora objetos unidos por hilos sobre el piso"), intro.at(460, 5203, 400, 400), { drift: 2 }),
      ],
    },

    // ---------- Línea de tiempo (18 pasos) ----------
    {
      _type: "timeline",
      anchor: "linea-de-tiempo",
      title: "El proceso, paso a paso",
      band: { color: "#f4fad5" },
      dots: [canvas(TL_Y).dots(1085, TL_Y, 350, 6829)],
      steps: [
        paso("¿Qué significa cocrear?", 176.71, 1726.23, (c) => [
          B("Pusimos en común nuestras ideas sobre la cocreación y la innovación. ", c.at(172, 228, 594)),
          text(body([t("Innovacción", "underline")]), c.at(172, 398, 200), { size: 20, weight: 500, tone: "#f986ec", nowrap: true }),
          text(body("“Alquimia creativa.\""), c.at(170, 458, 176), { size: 20, weight: 500, tone: V, align: "right", nowrap: true, variant: "cita" }),
          text(body([t("Cocrear", "underline")]), c.at(1306, 398, 80), { size: 20, weight: 500, tone: "#f986ec", nowrap: true }),
          image(img("paso01-cuadernos", "Manos que conversan sobre una mesa con cuadernos, notas adhesivas y marcadores"), c.at(770, 458, 610, 814)),
          text(
            body('"Mosaico construido sinápticamente por el diálogo."\n"Habitar en comunidad. Miceliar."\n"Acompañar, escuchar, compartir y trabajar junto a otros."'),
            c.at(780, 1302, 600),
            { size: 20, weight: 500, tone: V, align: "right", nowrap: true, variant: "cita" },
          ),
          B("También discutimos los límites entre el diseño y el arte, y qué posibilidades ofrecía cada campo para trabajar sobre problemáticas sociales.", c.at(173, 1488, 521)),
        ]),
        paso("Leer Chapinero", 1726.23, 2878.41, (c) => [
          B("Compartimos los hallazgos de nuestras primeras derivas. ", c.at(172, 1783, 626)),
          image(img("paso02-derivas", "Participantes dibujan en sus cuadernos junto a hojas y objetos recogidos en la calle", crop(0, -3.2, 100, 133.33)), c.at(172, 1909, 600, 600)),
          B("Aunque cada persona había observado aspectos distintos, encontramos coincidencias que nos llevaron a reconocer la fragmentación del territorio y las desconexiones presentes en la vida urbana.", c.at(172, 2599, 594), { tone: V }),
        ]),
        paso("Ampliar la mirada y formular preguntas", 2878.41, 3765.3, (c) => [
          B("Con Camila Carozzi Aravena exploramos cómo el diseño puede abrir conversaciones sobre temas complejos. ", c.at(172, 2936, 626)),
          image(img("paso03-conversacion", "Una invitada conversa con el grupo mientras sostiene una tableta"), c.at(820, 3008, 448, 448)),
          B("A partir de ese intercambio, propusimos 15 ideas para investigar otras formas de relacionarnos con el territorio.", c.at(820, 3486, 448)),
        ]),
        paso("Curaduría urbana", 3765.3, 4900.15, (c) => [
          B("Con Gabriela Bruna Serrano exploramos cómo destacar elementos cotidianos que suelen pasar inadvertidos. ", c.at(172, 3823, 626)),
          image(img("paso04-curaduria", "Una invitada presenta frente a una pantalla con imágenes de adhesivos callejeros", crop(0, -33.33, 100, 133.33)), c.at(732, 3954, 600, 600)),
          B("Usamos cinta de enmascarar para enmarcar elementos de la calle y convertirlos en objetos de observación, como si fueran piezas de una exposición.", c.at(732, 4614, 504)),
        ]),
        paso("Pensar desde el cuerpo", 4900.15, 6014.37, (c) => [
          B("Con Margaret Arias exploramos el cuerpo como punto de partida para relacionarnos con otras personas y con el entorno. ", c.at(172, 4957, 626)),
          image(img("paso05-cuerpo", "Participantes con los ojos cerrados junto a una mesa cubierta de hojas con dibujos de líneas", crop(0, 0, 100, 133.33)), c.at(172, 5095, 600, 600)),
          B("A través de experiencias sensoriales y ejercicios colectivos, construimos un conjunto de palabras relacionadas con el tacto, la escucha, la piel, la vulnerabilidad y la respiración.", c.at(172, 5725, 600)),
          W("conectar.", c.at(1044, 5065, 142, 537), { rotate: -90 }),
        ]),
        paso("Encuentro entre laboratorios", 6014.37, 6973.6, (c) => [
          B("El encuentro nos permitió compartir experiencias con otros grupos que también exploraban la relación entre el arte, el diseño, lo digital y el territorio.", c.at(172, 6072, 626)),
          image(img("paso06-laboratorios", "Decenas de personas sentadas en círculo en un auditorio de madera durante el encuentro de laboratorios", crop(0, -1.62, 100, 103.25)), c.at(620, 6340, 600, 391)),
        ]),
        paso("Compartir experiencias", 6973.6, 9107.65, (c) => [
          B("Cada participante propuso una experiencia para los demás. Exploramos la luz y la sombra, la reparación simbólica a través de un muñeco, las grullas de papel, una constelación táctil y un ritual con canto", c.at(172, 7031, 648)),
          image(img("paso07-constelacion", "Participantes con los ojos vendados sentados en el piso alrededor de objetos unidos por hilos"), c.at(780, 7245, 600, 600)),
          image(img("paso07-silueta-luz", "Silueta de una persona detrás de un velo plástico iluminado de azul", crop(0, -24.62, 100, 133.33)), c.at(172, 7845, 536, 536)),
          text(body("Las actividades nos permitieron experimentar distintas maneras de comunicar, conectar y construir con otros."), c.at(873, 7875, 507), { weight: 500, tone: V, align: "right" }),
          image(img("paso07-ritual-velas", "Un muñeco de tela sobre una mesa rodeado de velas encendidas", crop(0, -14.91, 100, 132.89)), c.at(780, 8231, 300, 300)),
          image(img("paso07-grulla", "Una mano sostiene una grulla de papel con estampado de flores", crop(0, -32.35, 100, 177.78)), c.at(1156, 8531, 224, 224)),
          image(img("paso07-circulo", "El grupo sentado en círculo en el piso junta las manos en el centro"), c.at(396, 8681, 312, 312)),
          image(img("paso07-circulo-movimiento", "Fotografía en blanco y negro del grupo en círculo, desenfocado por el movimiento"), c.at(732, 8681, 400, 400)),
          W("bailar.", c.at(620, 7484, 142, 418), { rotate: -90 }),
        ]),
        paso("Poner las ideas a prueba", 9107.65, 10437.86, (c) => [
          B("Presentamos prototipos en arcilla polimérica y escuchamos cómo los interpretaban los demás. ", c.at(172, 9165, 648)),
          image(img("paso08-arcilla", "Prototipos de arcilla polimérica verde sobre una mesa blanca", crop(0, 0, 100, 114.3)), c.at(172, 9297, 648, 756)),
          B("La retroalimentación amplió nuestras perspectivas y, con las preguntas de Stephen Bruque sobre deseabilidad, viabilidad, factibilidad y necesidad, empezamos a evaluar qué propuestas podían desarrollarse y para quiénes tenían sentido.", c.at(172, 10113, 621)),
          W("moldear", c.at(780, 9374, 142, 418, 2), { rotate: -90 }),
        ]),
        paso("Decidir con quién trabajar", 10437.86, 11644.1, (c) => [
          B("Llegamos con entrevistas y hallazgos de nuestras exploraciones. Al ponerlos en común, votamos por el grupo con el que queríamos continuar el proceso: ocho de once participantes eligieron trabajar con personas recicladoras.", c.at(172, 10495, 648)),
          image(img("paso09-votacion", "Participantes se estiran para tocar un objeto en el piso durante un ejercicio grupal", crop(0, -2.64, 100, 132.59)), c.at(708, 10717, 672, 672)),
        ]),
        paso("Imaginar otros futuros", 11644.1, 12736.51, (c) => [
          B("Pusimos a las personas recicladoras en el centro de un ejercicio de mapeo y llevamos la imaginación hasta una Bogotá futurista, en 2078. De ese ejercicio surgió la idea de desarrollar un videojuego para explorar otras formas de representar y comprender su trabajo.", c.at(172, 11701, 648)),
          image(img("paso10-mapeo", "Participantes de pie frente a una pared con notas adhesivas de colores"), c.at(172, 11971, 672, 504)),
          W("prototipar", c.at(1264, 11640, 142, 580), { rotate: -90 }),
        ]),
        paso("Explorar posibles respuestas", 12736.51, 14438.35, (c) => [
          B("Organizamos el trabajo en tres equipos: videojuego, indumentaria y artefactos. Cada grupo empezó a explorar una forma distinta de responder a lo que habíamos identificado. ", c.at(172, 12794, 648)),
          image(img("paso11-bordado-escarabajo", "Muestra de bordado digital de un escarabajo rinoceronte rojo"), c.at(708, 13058, 672, 468)),
          image(img("paso11-indumentaria", "Tablero de referencias de indumentaria titulado «Cuerpos expandidos», con siluetas, texturas y colores"), c.at(148, 13176, 472, 350)),
          B("También apareció el escarabajo como símbolo de transformación, una imagen que conectaba con las ideas que veníamos desarrollando.", c.at(708, 13556, 648)),
          image(img("paso11-boceto-carreta", "Boceto a línea de un reciclador empujando una carreta cubierta"), c.at(148, 13724, 584, 438)),
          image(img("paso11-boceto-anillas", "Dibujo a línea de una figura inclinada que carga una viga al hombro y sostiene una anilla"), c.at(820, 13943, 424, 375)),
          W("hacer,", c.at(539, 14222, 400, 142, 3)),
        ]),
        paso("Contrastar nuestras ideas", 14438.35, 15698.29, (c) => [
          B("Alejandra, Edwin y Yordanis se sumaron al trabajo y rotaron por las mesas de los tres equipos.", c.at(172, 14496, 648)),
          image(img("paso12-prueba-recicladoras", "Una recicladora acompaña a una joven que prueba un prototipo con los brazos extendidos", crop(0, -39.13, 100, 178.26)), c.at(732, 14768, 637, 637)),
          B(" Sus comentarios nos permitieron contrastar nuestras propuestas con la experiencia de quienes ejercen el oficio y revisar decisiones que habíamos tomado sin conocer suficientemente su realidad.", c.at(732, 15465, 637)),
          W([t("y "), i("hacer.")], c.at(106, 15015, 600, 142)),
        ]),
        paso("Probar y ajustar", 15698.29, 16887.33, (c) => [
          B("En un segundo encuentro con recicladores y con David Feliciano, avanzamos en la revisión de las propuestas. Probamos las anillas y empezamos a definir la biblia del videojuego, un documento para organizar su concepto y los elementos que darían coherencia a la experiencia.", c.at(172, 15756, 648)),
          image(img("paso13-anillas", "El grupo prueba unas anillas de madera colgadas de una estructura en el taller"), c.at(732, 15996, 637, 637)),
        ]),
        paso("Consolidar el videojuego", 16887.33, 17845.2, (c) => [
          B("El videojuego pasó a ocupar un lugar central en el proceso. Nos distribuimos las tareas y comenzamos a desarrollar sus componentes, mientras organizábamos las ideas que formarían parte de su universo y su narrativa.", c.at(172, 16945, 645)),
          image(img("paso14-personajes", "Personajes del videojuego: un perro, una niña y un reciclador de gorra roja con un costal"), c.at(372, 17179, 1008, 607)),
        ]),
        paso("Identificar necesidades concretas", 17845.2, 19243.9, (c) => [
          text(
            body([
              b("Nos preguntamos qué necesita una persona para realizar su trabajo de reciclaje."),
              " Al conectar esta pregunta con lo que habíamos escuchado y observado, surgieron propuestas orientadas al día a día: ",
              b("un mapa con información útil, videotutoriales de cuidado corporal y una página web para reunir estos recursos."),
            ]),
            c.at(172, 17902, 645),
          ),
          image(img("paso15-mesa-notas", "Mesa de trabajo cubierta de notas adhesivas rosadas y azules, marcadores y cuadernos"), c.at(148, 18178, 669, 892)),
        ]),
        paso("Grabación de videotutoriales y documental", 19243.9, 21172.31, (c) => [
          B("Grabamos los videotutoriales junto a recicladores y con el acompañamiento de una fisioterapeuta, que aportó sus conocimientos para desarrollar ejercicios y recomendaciones relacionados con las exigencias físicas de la jornada de trabajo.", c.at(172, 19301, 583)),
          image(img("paso16-carreta-parque", "Una carreta de reciclaje vacía en un parque durante la grabación"), c.at(932, 19249, 336, 336)),
          image(img("paso16-still-ariel-carga", "Fotograma del microdocumental: Ariel sonríe mientras amarra la carga de su carreta"), c.at(0, 19675, 1068, 601), { variant: "sangre-izq" }),
          image(img("paso16-still-manos", "Fotograma del microdocumental: manos que separan botellas plásticas", crop(-21.76, -3.94, 143.93, 107.52)), c.at(732, 20385, 648, 488), { variant: "zoom" }),
          B("También realizamos un breve documental que recoge el mensaje que Ariel compartió con nosotros. Sus palabras nos dejaron una reflexión sobre el oficio y sobre aquello que queríamos transmitir con este proceso.", c.at(732, 20903, 645)),
          W("cargar,", c.at(1126, 19854, 142, 418), { rotate: -90 }),
        ]),
        paso("Llevar las ideas al espacio", 21172.31, 24971.98, (c) => [
          B("Visitamos el sótano de Villa Adelaida, medimos el espacio y empezamos a definir la ubicación de los elementos de la exposición. Los velos, las pacas de cartón y la carreta dejaron de ser ideas sueltas y comenzaron a formar parte de una propuesta de montaje.", c.at(172, 21230, 645)),
          image(img("paso17-sotano", "Dos integrantes del equipo sonríen a la cámara en el sótano de Villa Adelaida"), c.at(708, 21570, 672, 504)),
          image(img("paso17-pacas-carton", "Pacas de cartón apiladas bajo una luz azul"), c.at(148, 21759, 472, 315)),
          W("armar,", c.at(148, 21617, 500, 142, 2)),
          text(
            body("Comenzamos el montaje en Villa Adelaida. Conseguimos cartón con recicladores del barrio, instalamos los velos y ubicamos los elementos en el espacio. La exposición empezó a tomar forma y a reunir los distintos resultados del laboratorio."),
            c.at(662, 22164, 718),
            { weight: 500, tone: V, align: "right" },
          ),
          image(img("paso17-velos", "Velos translúcidos con manchas rojas colgados en la sala de la exposición"), c.at(148, 22368, 600, 600)),
          image(img("paso17-proyeccion-pies", "Proyección de unos pies con tenis caminando sobre una pared"), c.at(844, 23048, 448, 448)),
          W("editar,", c.at(384, 23380, 500, 142, 2)),
          image(img("paso17-publico", "Visitantes a contraluz recorren la exposición"), c.at(484, 23725, 896, 597)),
          image(img("paso17-videojuego", "Pantalla del videojuego Chapicartón con una ciudad futurista"), c.at(260, 24413, 696, 464)),
        ]),
        paso("Continuamos trabajando", 24971.98, 25521, (c) => [W("sentir.", c.at(508, 25181, 500, 142), { italic: true })]),
      ],
    },

    // ---------- Reflexión ----------
    {
      _type: "collage",
      anchor: "reflexion",
      rows: 167,
      items: [
        text(
          body("Este proceso  implicó acercarnos a las experiencias de recicladoras y recicladores de oficio. A través de las conversaciones y los espacios de trabajo compartidos, conocimos sus formas de trabajar y las dificultades que enfrentan."),
          reflexion.at(709, 31334, 672),
          MORADO,
        ),
        text(body("Escuchar sus experiencias nos permitió pregutarnos:"), reflexion.at(61, 31604, 840), MORADO),
        text(body("¿Cómo pasa la ciudad por el cuerpo de quienes la cargan, la arrastran y la recorren reciclando?"), reflexion.at(61, 31670, 896), { size: 40, font: "doto", weight: 700, tone: "#0800ff", level: 2 }),
        text(
          body(
            [b("Prototipar también es una forma de pensar.")],
            [
              "Antes de llegar a las propuestas que presentamos hoy, exploramos muchas otras ideas: ",
              b("un asadero gigante de ratas, un reloj para detener la ciudad durante un minuto, cápsulas con mensajes y un gabinete de curiosidades de Chapinero."),
              " Cada experimento nos permitió explorar distintas maneras de ",
              b("llamar la atención sobre lo que ocurre en la ciudad"),
              " ",
              b("y abrir preguntas sobre cómo nos relacionamos con ella."),
            ],
            [
              "Pero cuando empezamos a escuchar a las recicladoras y los recicladores, nuestra mirada cambió. Al principio, queríamos rediseñar la carreta, hasta que ellos nos hicieron ver que no era ese el problema. La carreta funcionaba. ",
              b("Lo que hacía falta era que más personas conocieran su trabajo, entendieran su aporte a la ciudad y reconocieran que detrás de cada recorrido hay personas que trabajan por el bienestar de todos."),
            ],
            [
              b("Comprendimos que diseñar no siempre significa crear algo nuevo."),
              " A veces, significa ",
              b("escuchar antes de proponer"),
              " y encontrar maneras de ",
              b("hacer visible aquello que suele pasar inadvertido."),
              " No buscaban ser vistos con lástima, sino ser ",
              b("reconocidos, saludados y tenidos en cuenta."),
            ],
          ),
          reflexion.at(61, 32010, 805),
          { tone: "#be5203" },
        ),
        image(img("reflexion-dibujo", "Manos que dibujan con marcador sobre tablas apoyadas en las piernas"), reflexion.at(1045, 32074, 336, 336), { drift: 2 }),
      ],
    },

    // ---------- Microdocumental ----------
    {
      _type: "video",
      anchor: "microdocumental",
      // TODO: reemplazar por el ID real del microdocumental en YouTube (lo que va después de "v=").
      youtubeId: "TODO_MICRODOCUMENTAL_ARIEL",
      title: "Microdocumental: los recorridos de Ariel, recicladora de oficio",
      poster: img("microdocumental-poster", "Fotograma del microdocumental: Ariel, recicladora de oficio, mira a la cámara junto a su carreta", crop(0, -3.66, 100, 107.04)),
    },

    // ---------- Citas ----------
    {
      _type: "collage",
      rows: 48,
      items: [
        text(
          body('"Fue una acumulación de ideas y fricciones que se fue decantando según su viabilidad e impacto." ', '"Metamorfosis conceptual y convergencia creativa."'),
          citas.at(62, 34143, 840),
          { size: 31, tone: "#0800ff" },
        ),
        rule(citas.at(0, 34491, 1440, 10), { bleed: true }),
      ],
    },

    // ---------- Bitácora ----------
    {
      _type: "bitacora",
      anchor: "bitacora",
      title: "Nuestra bitacora",
      // TODO: definir el destino de "Ver más" (¿bitácora completa en PDF?); por ahora apunta a la propia sección.
      intro: body([a("Ver más", "#bitacora")]),
      mode: "slider",
      pages: [
        { image: img("bitacora-lamina-1", "Lámina de la bitácora en tres franjas amarilla, azul y morada: «Nosotros, la ciudad y Chapinero», «Primeras exploraciones» y «Enfoque: ¿qué nos mueve?»") },
        // TODO: reemplazar por las láminas reales
        ...[1, 2, 3, 4, 5, 6].map((n) => ({ image: comun(`lamina-pendiente-${n}`, `Lámina ${n + 1} de la bitácora (pendiente)`) })),
      ],
    },

    // ---------- Lo que nos llevamos ----------
    {
      _type: "collage",
      anchor: "lo-que-nos-llevamos",
      rows: 227,
      items: [
        rule(llevamos.at(0, 35517, 1440, 10), { bleed: true }),
        text(body("Lo que nos llevamos"), llevamos.at(61, 35647, 600), { weight: 700, level: 2 }),
        image(img("llevamos-velos", "Cuatro participantes en una sala blanca con velos lilas extendidos en el piso"), llevamos.at(61, 35764, 536, 536), { drift: 2 }),
        text(body("Diseñar con otro es aprender a dejar espacio para que ese otro transforme la idea y le dé vida propia."), llevamos.at(61, 36330, 571), MORADO),
        image(img("llevamos-still-zapato", "Fotograma del microdocumental: un zapato pisa el asfalto", crop(-21.24, -5.8, 143.89, 110.89)), llevamos.at(845, 36047, 336, 336), { variant: "zoom" }),
        text(body("La vulnerabilidad como elemento poderoso de cocreación."), llevamos.at(845, 36437, 371), MORADO),
        image(img("llevamos-abrazo", "Una recicladora y una participante se abrazan en el salón del laboratorio"), llevamos.at(287, 36502, 334, 334)),
        text(body("Crear es lo que podemos dejar."), llevamos.at(285, 36866, 400), { weight: 500, nowrap: true }),
        image(img("llevamos-grabacion", "Grabación de un videotutorial en un parque: dos personas estiran apoyadas en un poste azul"), llevamos.at(733, 36836, 536, 715), { drift: 2 }),
        image(img("llevamos-ejercicio", "Dos personas hacen un ejercicio corporal bajo una luz azul"), llevamos.at(373, 37303, 248, 248)),
        text(body("El encuentro con los recicladores transformó la manera de entender el diseño."), llevamos.at(733, 37581, 500), MORADO),
      ],
    },

    // ---------- Créditos ----------
    {
      _type: "collage",
      anchor: "creditos",
      rows: 216,
      items: [
        rule(creditos.at(0, 37787, 1440, 10), { bleed: true }),
        text(body([a("Conoce al equipo", "/equipo/")]), creditos.at(1180, 37823, 200), ENLACE),
        image(img("creditos-proyector", "Fotografía en blanco y negro de una persona de perfil junto al haz de luz de un proyector"), creditos.at(61, 37883, 424, 424)),
        text(
          body([
            b("Artistas cocreadores:"),
            " Camilo Enrique Muñoz Triana · Santiago Andonoff Gaitán · José Alberto Miranda Álvarez · Eduardo Antonio Castro Patiño · Sebastián Espitia Riaño · Camilo Fernando Castañeda Murcia · Yineth Andrea Sandino Cordón · Yenny Alejandra Osma Palacios · Diana Carolina Castañeda Barragán · Nelson Mauricio Rodríguez Ayala · Samuel Olarte Espitia · Carol Sofía Cuervo Lizarazu · Johan Andretty Lozano Suárez · Natalia Patricia Ahumada Baptista · Daniel Felipe García Lagos · Carlos Andrés Saray Orozco / ",
            b("Laboratorista:"),
            " Víctor Gómez / ",
            b("Orientadora metodológica:"),
            " Laura Ximena Garrido / ",
            b("Productor de campo:"),
            " Wilson Dueñas / ",
            b("Producción general:"),
            " Claudia Manosalva / ",
            b("Coordinación Artefactum:"),
            " Edwin Rodríguez / ",
            b("Personas recicladoras:"),
            " Ariel, que nos dejó acompañarla en el microdocumental y nos dio el cartón que hizo parte de la muestra · Alejandra, que participó en las fotografías de silueta y en los videotutoriales, y validó nuestros prototipos · Edwin y Yordanis, que revisaron con nosotros el diseño del videojuego, la ropa y la carreta · Marta, Graciela, Sandra, Ginet y Leonardo, que conversaron con nosotros sobre su oficio y su día a día · Y todas las personas que se detuvieron a hablar con nosotros en la calle / ",
            b("Invitadas e invitados:"),
            " Camila Carozzi Aravena, diseñadora · Gabriela Bruna Serrano, investigadora STICKEROLOGIST · Margaret Arias, laboratorista de Artefactum invitada · Stephen Bruque, docente de diseño · David Feliciano, ingeniero mecánico · Julie López, mentora del videojuego · Juan Tirado, realización audiovisual · Carolina Acosta, fisioterapeuta / ",
            b("Instituciones:"),
            " IDARTES – ARTEFACTUM · Ministerio de las Culturas, las Artes y los Saberes · Alcaldía Mayor de Bogotá · Universidad LCI Bogotá · Villa Adelaida.",
          ]),
          creditos.at(709, 37882, 672),
          { size: 20, weight: 500, align: "justify", variant: "creditos" },
        ),
        image(img("creditos-grupo", "El grupo del laboratorio reunido de pie alrededor de una mesa en la Universidad LCI"), creditos.at(61, 38712, 1120, 1120)),
        rule(creditos.at(0, 39933, 1440, 10), { bleed: true }),
      ],
    },

    explora([
      ["Video tutoriales", "/para-recicladores/#videotutoriales", inicio("card-recicladores", "Recicladora sonriente empujando su carreta cargada frente a un camión rojo")],
      ["Chapicartón", "/videojuego/", inicio("card-videojuego", "Joven jugando Chapicartón en una máquina arcade")],
      ["Equipo", "/equipo/", inicio("card-equipo", "El equipo del laboratorio reunido en círculo")],
      ["Exhibición", "/exhibicion/", inicio("card-exhibicion", "Sala de la exhibición con mesas, piezas y pendones")],
    ]),
  ],
};
