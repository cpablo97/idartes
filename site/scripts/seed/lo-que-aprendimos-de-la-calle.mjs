// Lo que aprendimos de la calle — frame 1:288 (1440 × 20719). Las y son las del frame de Figma.
import { images, crop, t, b, body, canvas, image, text, title, rule, explora } from "./_lib.mjs";
const img = images("lo-que-aprendimos-de-la-calle");
const inicio = images("inicio");

// Colores puntuales de esta página (el magenta del Figma aquí es #ed56c5, no el token).
const MAGENTA = "#ed56c5";
const ROSA = "#e56aab";
const LIMA = "#95ff00";
const SALMON = "#ff8d67";
const ROJO = "#d52c15";

const mirar = canvas(927);
const contextoTexto = canvas(5069);
const contextoFoto = canvas(5404);
const derivas = canvas(6251);
const residuos = canvas(11171);
const valor = canvas(13126);
const voces = canvas(15216);

const medium = { weight: 500 };
/** Tracking de −0,264 px sobre 24 px (el resto de la página usa −0,528). */
const suave = { weight: 500, variant: "suave" };
const doto = { font: "doto", size: 31, level: 2, variant: "rotulo" };

// Gráfico «Chapinero en los medios»: medidas en px del frame, relativas a la esquina del gráfico (x = 0, y = 12185,56).
const CHART_Y = 12185.56;
const ring = (x, y, d) => ({ x, y: Math.round((y - CHART_Y) * 100) / 100, d });
/** La leyenda de Figma es punto de ⌀27 + texto en una fila de 36 px: el centro del punto cae sobre la circunferencia. */
const dot = (x, y) => ({ x: x + 13.5, y: Math.round((y + 18 - CHART_Y) * 100) / 100 });

export default {
  _type: "page",
  _id: "page-lo-que-aprendimos-de-la-calle",
  title: "Lo que aprendimos de la calle",
  slug: { current: "lo-que-aprendimos-de-la-calle" },
  header: "small",
  menuTone: "blanco",
  footerTone: "#6ae5ba",
  dots: "amplio",
  seo: {
    description: "Lo que cuentan los medios, lo que muestran las cifras y lo que viven quienes reciclan en Chapinero: derivas, precios de referencia y testimonios del laboratorio.",
  },
  sections: [
    {
      _type: "hero",
      image: img("hero-carreta", "Vista desde arriba de una recicladora que hala su carreta cargada de bolsas y cartón por una calle de Chapinero", crop(0, -90.47, 100, 301.73)),
      eyebrow: "Lo que aprendimos de la calle",
      phrase: "¿Cómo hacemos visible lo que la ciudad no ve?",
      tone: "blanco",
      footnote: "Creado junto a recicladores de Chapinero.",
    },

    // ---------- Collage «mirar (una) (y otra) otra vez» ----------
    {
      _type: "collage",
      anchor: "mirar",
      rows: mirar.rows(5069),
      items: [
        text(body([b("La forma en que la ciudad desecha su basura también influye en cómo vemos a quienes la recuperan. ")]), mirar.at(60, 1016.56, 604, 80), { tone: MAGENTA }),
        image(img("calle-02", "Carreta de reciclaje cargada de cartón frente a locales comerciales", crop(0, 0, 100, 133.33)), mirar.at(708, 1016.56, 248, 248)),
        image(img("calle-01", "Triciclo de carga con cabina negra estacionado junto a un muro de ladrillo"), mirar.at(60, 1208.56, 336, 336)),
        image(img("calle-03", "Reciclador con chaleco reflectivo junto a una carreta verde en una calle del barrio"), mirar.at(956, 1264.56, 424, 424)),
        title([t("mirar "), t("(una) (y \notra)", "em"), t(" otra vez")], LIMA, mirar.at(418.45, 1729.56, 851, 284, 3), { level: 2 }),
        image(img("calle-04", "Carreta repleta de bolsas y cajas detenida en una esquina, bajo los cables de un poste"), mirar.at(260, 1824.56, 472, 848)),
        image(img("calle-05", "Carreta inclinada, cargada de cartón y escombros, frente a un edificio de noche"), mirar.at(844, 2336.56, 336, 336)),
        text(
          body(["Para entender esta relación, nos acercamos al reciclaje en Chapinero desde tres perspectivas: ", b("lo que cuentan los medios, lo que muestran las cifras y lo que viven quienes trabajan en este oficio.")]),
          mirar.at(60, 2952.56, 602, 150),
          { tone: MAGENTA },
        ),
        image(img("calle-07", "Carreta de madera recostada contra un árbol en un separador con pasto"), mirar.at(708, 2952.56, 472, 472)),
        image(img("calle-08", "Reciclador acomoda la carga de su carreta de noche; un perro negro va parado sobre los costales"), mirar.at(60, 3544.56, 784, 749)),
        image(img("calle-09", "Carreta con cartón y costales llenos frente a una cortina metálica con grafitis"), mirar.at(1044, 3751.14, 336, 336)),
        image(img("calle-10", "Carreta cubierta con lonas blancas estacionada en una avenida comercial, con carros y un taxi al fondo"), mirar.at(844, 4413.72, 472, 475)),
        image(img("calle-11", "Carreta volcada entre residuos junto a una obra con cerramiento azul", crop(0, -14.58, 100, 133.33)), mirar.at(172, 4640.72, 248, 248)),
      ],
    },

    // ---------- Chapinero en contexto ----------
    {
      _type: "collage",
      anchor: "contexto",
      rows: contextoTexto.rows(5404),
      items: [
        rule(contextoTexto.at(0, 5068.72, 1440, 10), { bleed: true }),
        text(body("Chapinero en contexto"), contextoTexto.at(60, 5129, 600, 47), doto),
        text(body([b("Chapinero es una localidad de contrastes. "), t("\nLos cerros y las quebradas conviven con oficinas, pantallas, bares, comercio y economías informales. ")]), contextoTexto.at(60, 5206, 577, 110), suave),
      ],
    },
    {
      _type: "collage",
      rows: contextoFoto.rows(6251),
      // Foto de la mesa de trabajo: dibujos en papel calcante, hilos de colores y recortes verdes sobre un mapa del barrio (decorativa: va de fondo).
      band: { image: img("contexto-mesa", "") },
      items: [
        text(
          body("Al poner en común nuestras observaciones del barrio, identificamos cinco temas: tecnología, territorio, naturaleza, personas y basura. "),
          contextoFoto.at(781, 5827.28, 599, 176),
          { font: "doto", tone: "negro", variant: "velo" },
        ),
      ],
    },

    // ---------- Derivas: «observar(nos)» y «caminar.» ----------
    {
      _type: "collage",
      anchor: "derivas",
      rows: derivas.rows(11171),
      items: [
        text(body("La basura estuvo presente en todas las conversaciones, aunque pocas veces fuera el centro de atención."), derivas.at(60, 6340.56, 630, 80), { ...suave, tone: MAGENTA }),
        image(img("deriva-01", "Tres participantes del laboratorio en un ejercicio corporal; uno de ellos, de pie, levanta los puños", crop(0, 0, 100, 133.28)), derivas.at(60, 6492.56, 336, 336)),
        text(body("Para explorar el barrio hicimos derivas, recorridos en los que observamos y registramos lo que nos llamaba la atención. "), derivas.at(820, 6490.56, 572, 110), suave),
        image(img("deriva-02", "Notas adhesivas verdes con dibujos y palabras ordenadas sobre una mesa blanca", crop(0, -23.2, 100, 132.83)), derivas.at(820, 6614.56, 560, 560)),
        title([t("observar("), t("nos", "em"), t(")")], SALMON, derivas.at(985.23, 7060, 142, 851, 3), { rotate: 90, level: 2, variant: "largo" }),
        text(body("Durante las derivas observamos detalles del barrio que suelen pasar inadvertidos. "), derivas.at(60, 7102.56, 592, 80), { ...suave, tone: MAGENTA }),
        image(img("deriva-03", "Cuadernos de bocetos abiertos con dibujos del barrio y notas adhesivas verdes sobre una mesa", crop(-2.01, -15.41, 102.01, 115.41)), derivas.at(60, 7334.56, 895, 582)),
        text(
          body("La ponencia de Gabriela Bruna, de Stickerologist!, nos dio otro punto de partida para trabajar con esos hallazgos. Así, hicimos un ejercicio de curaduría urbana."),
          derivas.at(596.46, 8006.84, 699, 110),
          suave,
        ),
        image(img("deriva-04", "Gabriela Bruna sentada al borde de una tarima junto a una pantalla que dice «Stickerologist!»; al frente, una mesa con calcomanías", crop(0, -32.73, 100, 132.73)), derivas.at(596, 8204.84, 666, 666)),
        text(body("Con cinta de enmascarar enmarcamos un tubo oxidado, un grafiti, una fuente seca, y les asignamos fichas como si fueran piezas de museo."), derivas.at(596, 8886.84, 626, 110), suave),
        image(img("deriva-05", "Piso de baldosas con un desagüe enmarcado con cinta de enmascarar y una ficha de museo pegada al lado"), derivas.at(60, 8870.84, 448, 448), { rotate: -90 }),
        image(img("deriva-06", "Participante con gorra pega un marco de cinta de enmascarar sobre el vidrio de una ventana", crop(0, -4.68, 100, 130.94)), derivas.at(620, 9318.84, 760, 760)),
        image(img("deriva-07", "Puerta metálica verde cubierta de grafitis con una ficha de museo pegada"), derivas.at(172, 9654.84, 424, 424)),
        text(body("Así, objetos y lugares cotidianos se convirtieron en puntos de partida para mirar el barrio de otra manera."), derivas.at(620, 10138.84, 600, 80), suave),
        image(img("deriva-08", "Mural de un caimán pintado sobre un muro, visto a través de una malla y de ramas con flores moradas"), derivas.at(620, 10270.84, 760, 760)),
        title("caminar.", SALMON, derivas.at(41.45, 10694.05, 560, 142, 3), { level: 2 }),
      ],
    },

    // ---------- Banda intermedia ----------
    {
      _type: "collage",
      rows: residuos.rows(11681),
      items: [
        rule(residuos.at(0, 11170.56, 1440, 10), { bleed: true }),
        text(
          body([
            "Aunque no encontramos cifras oficiales recientes sobre la cantidad de basura que se genera en Chapinero cada día, nuestros recorridos nos permitieron observar cómo se ",
            b("acumulan los residuos en Chapinero Central."),
            " En esta zona confluyen actividades comerciales, obras del Metro, oficinas, universidades, restaurantes y espacios culturales.",
          ]),
          residuos.at(60, 11330.56, 805, 180),
          { ...suave, tone: MAGENTA },
        ),
        rule(residuos.at(0, 11670.56, 1440, 10), { bleed: true }),
      ],
    },

    // ---------- Chapinero en los medios: texto + gráfico ----------
    {
      _type: "data",
      anchor: "medios",
      title: "Chapinero en los medios",
      body: body([
        "Durante 2025, El Espectador y Semana publicaron 162 piezas sobre Chapinero: 100 en El Espectador y 62 en Semana. Al clasificarlas por tema, encontramos que la seguridad y la movilidad ocuparon buena parte de la cobertura, con 45 y 40 publicaciones, respectivamente. En movilidad, destacaron las obras del Metro en la avenida Caracas y la calle 72. En cambio, ",
        b("la cultura, la gastronomía y la vivienda tuvieron una presencia mucho menor,"),
        " con 12 publicaciones entre las tres categorías.",
      ]),
      // TODO: poner la URL real de la hoja de cálculo («Chapinero 2025 en los medios»); en Figma el enlace no tiene destino.
      link: { label: "Ver Excel", url: "#" },
      chart: {
        title: "Temas de la cobertura de Chapinero en El Espectador y Semana durante 2025",
        description: "Tres círculos de tamaño decreciente, uno por tema: seguridad, movilidad y vida urbana.",
        // Lienzo del gráfico en px de diseño (ancho del frame × diámetro del círculo mayor).
        width: 1440,
        height: 940.5,
        // Del círculo mayor al menor. `value` (publicaciones) solo se anuncia en la leyenda; «Vida urbana» no tiene cifra en el texto.
        series: [
          // En Figma el punto de «Seguridad» es magenta aunque su círculo es ocre.
          { label: "Seguridad", value: 45, unit: "publicaciones", tone: MAGENTA, ringTone: "#b05400", ring: ring(284.25, 12185.56, 940.5), dot: dot(1205.75, 12714.73), gap: 16 },
          { label: "Movilidad", value: 40, unit: "publicaciones", tone: "morado", ring: ring(307.5, 12241.44, 763.25), dot: dot(1051.75, 12550.56), gap: 14 },
          { label: "Vida urbana", tone: ROSA, ring: ring(338.08, 12368.39, 364.344), dot: dot(654.63, 12636.56), gap: 16 },
        ],
      },
    },

    // ---------- «el valor.» y ¿Cuánto pagan por el material reciclable? ----------
    {
      _type: "collage",
      anchor: "el-valor",
      rows: valor.rows(14146),
      items: [
        text(
          body("Los dos medios también mostraron enfoques distintos. El Espectador cubrió asuntos como las obras, los servicios públicos, el ruido y el ambiente. Semana, por su parte, dio mayor espacio a crímenes de alto perfil y a representaciones de Chapinero asociadas con las élites."),
          valor.at(60, 13186.06, 607, 180),
          medium,
        ),
        text(body([b("Lo que pasa todos los días caminando cargando material con una carreta casi nunca es noticia.")]), valor.at(60, 13396.06, 672, 80)),
        title("el valor.", "morado", valor.at(851.45, 13454.56, 529, 142, 2), { level: 2 }),
        rule(valor.at(0, 13570.56, 1440, 10), { bleed: true }),
        text(body("¿Cuánto pagan por el material reciclable?"), valor.at(60, 13660.56, 900, 47), doto),
        text(
          body("En Bogotá, más de 26.000 recicladoras y recicladores de oficio están inscritos en el Registro Único de Recicladores de Oficio (RURO) de la UAESP. Sin embargo, no todas las personas que se dedican al reciclaje están registradas. La inscripción es gratuita y no requiere intermediarios."),
          valor.at(60, 13767.56, 784, 150),
          medium,
        ),
        text(
          body([
            b("Desde el Decreto 596 de 2016, las organizaciones de recicladores pueden prestar el servicio de aprovechamiento y recibir una remuneración a través de la tarifa de aseo."),
            " ",
            b("El precio de compra"),
            " de los materiales, en cambio, ",
            b("depende del mercado."),
            " Varía según el tipo de material, su calidad, presentación, cantidad y comprador.",
          ]),
          valor.at(60, 13935.56, 752, 180),
          medium,
        ),
      ],
    },

    // ---------- Tabla de precios ----------
    {
      _type: "data",
      anchor: "precios",
      table: {
        title: "Precios de referencia por kilo",
        subtitle: "Promedio nacional, febrero de 2025.",
        tone: "#0e9640",
        head: ["Material y presentación", "Precio por kilo"],
        rows: [
          { cells: ["Aluminio (lata)", "$6.326"] },
          { cells: ["PET (botella transparente, suelta)", "$2.765"] },
          { cells: ["Archivo (papel mezclado)", "$907"] },
          { cells: ["Chatarra", "$793"] },
          { cells: ["Cartón (suelto)", "$604"] },
          { cells: ["Vidrio (entero)", "$197"] },
        ],
        note: body([
          b("Fuente:"),
          " Acoplásticos, Encuesta de precios de reciclaje en Colombia, febrero de 2025. Los valores son de referencia y ",
          b("se basan en una encuesta a 35 organizaciones de recicladores en 10 regiones del país."),
        ]),
      },
    },

    // ---------- Lo que encontramos nosotros / «co-crear.» / preguntas ----------
    {
      _type: "collage",
      anchor: "testimonios",
      rows: voces.rows(19398),
      items: [
        rule(voces.at(0, 15215.56, 1440, 10), { bleed: true }),
        text(body([b("Lo que encontramos nosotros")]), voces.at(60, 15358, 700, 36), { nowrap: true, level: 2 }),
        text(
          body([
            "Hablamos con ",
            b("Ariel, Alejandra, Edwin, Yordanis, Marta, Graciela, Sandra, Ginet y Leonardo."),
            " Conocimos personas que reciclan solos y otras que trabajan en familia. Algunas están inscritas en el registro oficial de recicladores y otras no. Aunque sus experiencias son distintas, las conversaciones nos permitieron conocer las condiciones en las que trabajan y las dificultades que enfrentan en su día a día.",
          ]),
          voces.at(60, 15418, 693, 250),
        ),
        text(
          body([
            "El precio de un material no siempre es el mismo para quien lo recoge poco y para quien lo vende en mayores cantidades. En una de las conversaciones, una recicladora que trabaja con su familia nos contó que recibían cerca de $800 por kilo de PET. En otra sesión, nos dijeron que el kilo de vidrio se pagaba a unos $50. ",
            b("Ambos valores están por debajo de los precios de referencia nacionales que consultamos."),
          ]),
          voces.at(60, 15700, 665, 250),
        ),
        image(img("encuentro-mesa", "Recicladoras, recicladores y miembros del equipo conversan de pie alrededor de una mesa metálica"), voces.at(708, 16011.5, 672, 672)),
        title("co-crear.", ROJO, voces.at(260, 16567.5, 851, 142, 3), { level: 2 }),
        text(body([b("Los testimonios nos permitieron ver que el valor de referencia no siempre se refleja en el pago que reciben por su material.")]), voces.at(60, 16803.5, 714, 80)),
        text(
          body(
            "Las conversaciones dejaron ver otras dificultades del oficio. Nos hablaron de materiales que llegan mal separados, recorridos en los que se sienten inseguros y barreras para acceder a la educación y la salud. También mencionaron las largas jornadas durante las que pueden pasar muchas horas sin comer ni tomar agua. ",
            ["Al escucharlos, entendimos que las necesidades no se limitan a las herramientas o a las condiciones físicas del trabajo. También está el ", b("reconocimiento de su labor y de su aporte a la ciudad, que muchas veces pasa inadvertido.")],
          ),
          voces.at(60, 16935.5, 672, 400),
        ),
        image(img("cocrear-brazos", "Dos participantes hacen un ejercicio corporal: una, con pañoleta de colores, sostiene por la espalda a otra que levanta los brazos"), voces.at(60, 17390, 672, 1180)),
        text(
          body(
            "Fuentes: Alcaldía Mayor de Bogotá. «XV Mesa Distrital Deliberativa de Recicladores 2026 en Bogotá». bogota.gov.co, 1 de abril de 2026. Dato sobre las más de 26.000 personas inscritas en el RURO. / Alcaldía Mayor de Bogotá. «UAESP reitera que los trámites de registro para recicladores son totalmente gratuitos». bogota.gov.co, 31 de diciembre de 2025. Información sobre la gratuidad del registro y la ausencia de intermediarios. / Ministerio de Vivienda, Ciudad y Territorio. «Colombia es líder latinoamericano en políticas de inclusión de los recicladores». minvivienda.gov.co, 1 de marzo de 2020. Información sobre el Decreto 596 de 2016 y la remuneración del servicio de aprovechamiento. / Acoplásticos. Encuesta de precios de reciclaje en Colombia. Febrero de 2025. / José Alberto Miranda Álvarez. «Chapinero 2025 en los medios». Clasificación de 162 piezas de El Espectador y Semana. Ejercicio del laboratorio, 2026. / Actas del laboratorio, sesiones 10 a 14, julio y agosto de 2026. Testimonios y precios reportados por los recicladores.",
          ),
          voces.at(817.18, 18029.91, 558, 540),
          { size: 20, align: "justify", variant: "fuentes" },
        ),
        rule(voces.at(0, 18689.91, 1440, 10), { bleed: true }),
        text(body([b("Preguntas que quedan abiertas")]), voces.at(60, 18849.91, 700, 36), { nowrap: true, level: 2 }),
        text(
          body(
            "¿Podría crearse una red que conecte a los recicladores y les permita organizarse para vender sus materiales en mejores condiciones?",
            "¿Sabemos quién recoge y recupera los materiales que separamos en casa?",
          ),
          voces.at(60, 18915.91, 1130, 320),
          { font: "doto", size: 42.512, variant: "preguntas" },
        ),
        rule(voces.at(0, 19357.91, 1440, 10), { bleed: true }),
      ],
    },

    // Las tarjetas de Figma traen un damero de relleno: se reutilizan fotos de Inicio.
    explora([
      // TODO: «Video tutoriales» no tiene foto propia; se usa la de «¿Cómo lo hicimos?» mientras llega una.
      ["Video tutoriales", "/para-recicladores/#videotutoriales", inicio("card-como", "Participante con los ojos vendados explora objetos e hilos sobre el piso")],
      ["Chapicartón", "/videojuego/", inicio("card-videojuego", "Joven jugando Chapicartón en una máquina arcade")],
      ["Para recicladores", "/para-recicladores/", inicio("card-recicladores", "Recicladora sonriente empujando su carreta cargada frente a un camión rojo")],
      ["Exhibición", "/exhibicion/", inicio("card-exhibicion", "Sala de la exhibición con mesas, piezas y pendones")],
    ]),
  ],
};
