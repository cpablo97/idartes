// Exhibición — frame 1:656 (1440 × 19433). Las y son las del frame de Figma (incluyen los 80 px del navegador).
// Cada bloque es un `collage`; los lienzos se encadenan: el y0 de cada uno es donde termina el anterior.
import { images, crop, t, b, body, canvas, image, text, title, rule, explora } from "./_lib.mjs";
const img = images("exhibicion");
const ini = images("inicio");

const ROSA = "#ff67c7"; // titulares de la página
const VERDE = "#023c0f";

// Bordes de los lienzos (y del frame). El hero + su nota terminan en 968.
const Y = { intro: 968, bitacora: 4568, artefactos: 5788, armadura: 7528, carreta: 9018, cuerpo: 11148, ciudad: 12588, chapicarton: 14758, cierre: 16968, fin: 18108 };
const intro = canvas(Y.intro);
const bitacora = canvas(Y.bitacora);
const artefactos = canvas(Y.artefactos);
const armadura = canvas(Y.armadura);
const carreta = canvas(Y.carreta);
const cuerpo = canvas(Y.cuerpo);
const ciudad = canvas(Y.ciudad);
const chapicarton = canvas(Y.chapicarton);
const cierre = canvas(Y.cierre);

/** Subtítulo de bloque (Bold 24) y cuerpo (Regular 24), ambos morados. */
const sub = (label, place) => text(body(label), place, { weight: 700, level: 2 });
/** Texto en peso medio (500) de la intro y el cierre. */
/** Ancho exacto de la caja de texto en Figma (px): la retícula solo da decenas; ver .v-m### en pagina-exhibicion.css. */
const ancho = (px) => ({ variant: `m${Math.round(px)}` });
const medio = (paras, place, tone, extra = {}) => text(body(...paras), place, { weight: 500, tone, ...extra });

export default {
  _type: "page",
  _id: "page-exhibicion",
  title: "Exhibición",
  slug: { current: "exhibicion" },
  header: "none",
  menuTone: "ocre",
  dots: "amplio",
  footerTone: "#9c67ff",
  seo: {
    description: "La ciudad que pasa por el cuerpo: recorrido por la exposición en Villa Adelaida, con la bitácora, los artefactos, la indumentaria, la carreta, las siluetas, el microdocumental y el videojuego Chapicartón.",
  },
  sections: [
    {
      _type: "hero",
      anchor: "microdocumental",
      image: img("hero-proyeccion-pasos", "Proyección fragmentada sobre paneles de cartón: los pies de dos personas caminando por la calle"),
      // TODO: reemplazar por el ID real del microdocumental en YouTube (lo que va después de "v=").
      youtubeId: "TODO_MICRODOCUMENTAL_EXHIBICION",
      videoTitle: "Microdocumental: La ciudad que no vemos",
      footnote: "Creado junto a recicladores de Chapinero.",
      footnoteTone: "#0d0c19",
      footnotePlace: "below",
    },

    // ---------- Intro ----------
    {
      _type: "collage",
      anchor: "intro",
      rows: intro.rows(Y.bitacora),
      items: [
        text(body("La ciudad que pasa por el cuerpo"), intro.at(302, 1042, 720, 60), { font: "mono", size: 36, tone: "negro", align: "center", level: 1, variant: "titulo" }),
        text(
          body([b("La ciudad se puede recorrer de muchas maneras."), t(" Está en los trayectos que hacemos a diario, en los lugares que habitamos, en los materiales que circulan y en las relaciones que construimos con quienes la transitan.")]),
          intro.at(60, 1228, 560, 220),
          { tone: "ocre" },
        ),
        image(img("nino-bitacora-impresa", "Un niño observa una bitácora impresa sobre la mesa, rodeado de otros visitantes"), intro.at(732, 1228, 424, 424)),
        image(img("mediador-visitantes", "Un cocreador conversa con dos visitantes mayores frente a un pendón de la exposición"), intro.at(60, 1468, 224, 224)),
        medio(["No todas las personas la experimentan de la misma forma. Hay trabajos, recorridos y experiencias que hacen parte de su funcionamiento cotidiano, pero que pocas veces nos detenemos a observar."], intro.at(732, 1712, 648, 150), "ocre"),
        image(img("visitantes-lamina", "Tres jóvenes revisan una lámina impresa sobre una mesa de la exposición"), intro.at(60, 1917, 424, 424)),
        image(img("visitantes-mesa", "Dos visitantes conversan junto a una mesa, entre pendones de la exposición"), intro.at(508, 1917, 424, 424)),
        image(img("conversacion-pendones", "Un joven de saco amarillo conversa con otro visitante frente a los pendones"), intro.at(956, 1917, 424, 424)),
        medio(
          ["La ciudad que pasa por el cuerpo nació de una exploración colectiva sobre esas formas de relacionarnos con el entorno. Durante cinco meses, 16 cocreadores de distintas disciplinas y experiencias participaron en un proceso de observación, conversación, experimentación y creación en Chapinero."],
          intro.at(60, 2428.56, 670, 190),
          VERDE,
          ancho(666.3),
        ),
        medio(
          ["Lo que comenzó como una pregunta amplia sobre la ciudad fue tomando dirección a medida que recorríamos el territorio, compartíamos ideas y nos encontrábamos con otras formas de vivirlo."],
          intro.at(60, 2638.56, 670, 150),
          VERDE,
          ancho(666.3),
        ),
        image(img("visitante-pendon", "Un visitante lee un pendón azul con círculos rojos en una sala de Villa Adelaida"), intro.at(820, 2528.56, 560, 560)),
        title("exponer.", ROSA, intro.at(384.35, 2914.56, 851, 142, 5)),
        image(img("visitantes-mayores-penumbra", "Un joven y dos personas mayores miran una pantalla en la penumbra de la sala"), intro.at(60, 3188.56, 612, 612)),
        medio(
          ["En ese camino nos acercamos al oficio del reciclaje. A través de los encuentros con recicladoras y recicladores, conocimos una manera particular de recorrer la ciudad, sus experiencias nos permitieron comprender que la ciudad también se construye desde el trabajo que hace posible recuperar y reincorporar materiales a los ciclos de aprovechamiento."],
          intro.at(820, 3288.56, 560, 300),
          "ocre",
        ),
        image(img("visitante-luz-azul", "Una mujer mayor, iluminada por luz azul, prueba el mando del videojuego"), intro.at(820, 3776.56, 500, 500)),
        medio(
          ["El cuerpo apareció entonces como un punto de encuentro entre el territorio y el oficio. No como una idea abstracta, sino como aquello que camina, hala, carga, se mueve y se adapta a las condiciones de cada jornada. "],
          intro.at(60.71, 4105.19, 640, 150),
          "morado",
          ancho(638.65),
        ),
        medio(
          ["Desde esta perspectiva surgieron diferentes propuestas que buscaron acercarse a esas experiencias a través de lenguajes visuales, audiovisuales, materiales y digitales."],
          intro.at(60.71, 4278.75, 650, 110),
          "morado",
          ancho(647.3),
        ),
        rule(intro.at(0, 4506.75, 1440, 10), { bleed: true }),
      ],
    },

    // ---------- Bitácora ----------
    {
      _type: "collage",
      anchor: "bitacora",
      rows: bitacora.rows(Y.artefactos),
      items: [
        sub("Bitácora", bitacora.at(732.41, 4626.75, 648, 36)),
        image(img("sala-bitacora", "Sala de la exposición con mesas de piezas y los pendones de la bitácora montados sobre bastidores"), bitacora.at(60, 4626.75, 648, 432)),
        text(
          body(
            "Desde la primera sesión, cada participante recibió una agenda para registrar sus observaciones, ideas y experiencias. La bitácora se convirtió en una herramienta para documentar el recorrido individual y conservar la memoria de lo que íbamos descubriendo como grupo.",
            "Al finalizar el laboratorio, reunimos los registros de veinte jueves y organizamos el material en nueve islas temáticas. Estas permitían recorrer cronológicamente las distintas etapas del proceso, desde las primeras exploraciones sobre nosotros, la ciudad y Chapinero hasta las reflexiones que surgieron al cierre del laboratorio.",
            "Los registros se imprimieron y montaron sobre bastidores forrados en cartón. La elección del material buscaba conectar la presentación de la memoria del laboratorio con uno de los materiales centrales del oficio del reciclaje.",
          ),
          bitacora.at(732.41, 4722.75, 650, 660),
          ancho(647.6),
        ),
        image(img("mediador-pareja", "Un cocreador explica un pendón amarillo a una pareja de visitantes mayores"), bitacora.at(284, 5318.8, 424, 424)),
        image(img("piezas-ceramica-origami", "Piezas de cerámica blanca y grullas de origami sobre una mesa de la muestra"), bitacora.at(1068, 5423.07, 312, 200)),
      ],
    },

    // ---------- Artefactos para el cuerpo ----------
    {
      _type: "collage",
      anchor: "artefactos",
      rows: artefactos.rows(Y.armadura),
      items: [
        sub("Artefactos para el cuerpo", artefactos.at(732.41, 5834.75, 629, 36)),
        text(
          body(
            "Al observar el movimiento de la carreta, identificamos que quien la conduce alterna entre jalarla y empujarla, y cambia varias veces la forma de sujetar la lanza. Estos movimientos implican esfuerzos para las manos, las muñecas y la espalda. A partir de esta observación surgió la pregunta de cómo acompañar esos movimientos sin interferir con las labores del oficio.",
            "Algunos cocreadores exploraron un sistema de anillas que permitiera realizar movimientos de rotación de la muñeca sin soltar la lanza de la carreta. Como todavía no contábamos con una carreta para probar la propuesta, el primer acercamiento con los recicladores se realizó utilizando un perchero como sustituto. La idea no los convenció inicialmente, pero fueron ellos quienes propusieron probarla directamente en una carreta.",
            "A partir de ese primer acercamiento, exploramos otras alternativas, como bandas elásticas, una riata y un mecanismo de pernos que permitía acumular tensión. Samuel y Diana realizaron pruebas en el parque para evaluar el funcionamiento de estos elementos y explorar sus posibilidades de uso.",
            "Los encuentros con los recicladores también nos permitieron replantear el objetivo de estas exploraciones. Nos señalaron que la carreta no necesitaba ser rediseñada y que la necesidad estaba en facilitar algunos momentos de su uso, especialmente al iniciar el desplazamiento y al detenerla.",
          ),
          artefactos.at(732.41, 5930.75, 650, 1010),
          ancho(647.6),
        ),
        image(img("mesa-artefactos-guantes", "Mesa con guantes negros, piezas textiles bordadas y bandas elásticas verdes"), artefactos.at(60, 6142.8, 648, 648)),
        image(img("mesa-prototipos", "Mesa azul con prototipos: guantes, una riata, bandas elásticas y figuras de papel"), artefactos.at(284, 7010.8, 424, 424)),
        image(img("mano-alambre", "Silueta de una mano hecha en alambre negro sobre una mesa"), artefactos.at(1080, 7070.75, 300, 300)),
      ],
    },

    // ---------- Una armadura cotidiana ----------
    {
      _type: "collage",
      anchor: "armadura",
      rows: armadura.rows(Y.carreta),
      items: [
        sub("Una armadura cotidiana", armadura.at(60, 7614.8, 644, 36)),
        text(
          body(
            "Durante los encuentros surgió la preocupación por la falta de prendas que protegieran adecuadamente a quienes realizan el oficio del reciclaje. A partir de esta observación, comenzamos a explorar la posibilidad de desarrollar una indumentaria que acompañara las condiciones de trabajo y ofreciera protección durante la jornada.",
            "El desarrollo comenzó con una lluvia de ideas, referencias visuales y moodboards que dieron paso a los primeros bocetos. Estas propuestas se fueron ajustando a partir de las conversaciones con los recicladores. Después avanzamos hacia el patronaje, el corte y la confección de las prendas.",
            "En esta etapa apareció el escarabajo como símbolo de la propuesta, por su relación con la transformación de la materia orgánica y los procesos de descomposición. Sin embargo, las observaciones de los recicladores ayudaron a definir aspectos mucho más concretos de la indumentaria: preferían prendas discretas, con pocos elementos reflectivos, menos bolsillos y uno de uso reservado para guardar el dinero. También señalaron la importancia de contar con abrigo para las jornadas nocturnas.",
            "La propuesta contempló un conjunto de dos piezas en denim ignífugo de alta resistencia, con corte recto, bolsillos funcionales, bordado de escarabajo y refuerzos acolchados en cuerina. Se exploraron además complementos como guantes largos, una faja y protecciones para distintas partes ",
            "Al considerar el costo de fabricar un uniforme completo, surgió otra posibilidad: desarrollar refuerzos que cada persona pudiera incorporar a su propia ropa mediante costuras, utilizando retazos recuperados. Así, la propuesta también exploraba una alternativa modular y más accesible.",
          ),
          armadura.at(60, 7710.8, 650, 1260),
          ancho(644),
        ),
        image(img("chaleco-chapicarton", "Chaleco de denim negro con la palabra Chapicartón, apoyado sobre una estructura de alambre"), armadura.at(844, 7700.75, 536, 536)),
        title("proteger", ROSA, armadura.at(1180, 7961.64, 142, 851, 5), { rotate: -90 }),
        image(img("chaleco-maniqui", "Chaleco negro con refuerzos exhibido sobre una mesa, con una cabeza de alambre y pendones al fondo"), armadura.at(844, 8656.75, 312, 312)),
      ],
    },

    // ---------- La carreta en Chapinero ----------
    {
      _type: "collage",
      anchor: "carreta",
      rows: carreta.rows(Y.cuerpo),
      items: [
        sub("La carreta en Chapinero", carreta.at(732, 9468.75, 648, 36)),
        image(img("visitante-velos-azules", "Una visitante de perfil entre velos iluminados de azul"), carreta.at(60, 9070.8, 448, 448)),
        image(img("velos-rojos", "Velos translúcidos colgados en una sala oscura, iluminados de rojo y magenta"), carreta.at(732, 9108.75, 300, 300)),
        text(
          body(
            "La carreta es una herramienta fundamental para el oficio del reciclaje. También es uno de los elementos que hace visible la presencia de quienes recorren la ciudad recuperando materiales. Por eso, decidimos llevarla al espacio público y convertirla en parte de la exposición.",
            "Intervenimos una carreta incorporando algunos de los prototipos de agarre desarrollados durante el laboratorio. Luego la ubicamos en el exterior de Villa Adelaida, donde funcionaba como una invitación a acercarse a la exposición, entrar y tomarse una fotografía. De esta manera, una herramienta cotidiana del oficio pasó a ocupar un lugar dentro de la muestra y a generar un punto de encuentro con los visitantes.",
          ),
          carreta.at(732, 9564.75, 620, 520),
          ancho(615.7),
        ),
        image(img("velo-proyeccion-silueta", "Fotografía de silueta en tonos morados proyectada sobre un velo", crop(-4.25, 0, 149.98, 100)), carreta.at(60, 9738.8, 600, 600)),
        image(img("velo-dibujo", "Velo iluminado de azul con el dibujo a mano de un cuerpo cargando"), carreta.at(732, 10128.75, 200, 200)),
        image(img("visitante-velos-blancos", "Un visitante con gorra observa los velos color hueso colgados en la sala"), carreta.at(844, 10508.75, 424, 424)),
        // Sale 60 px por debajo del lienzo (hasta y = 11207) y queda junto al bloque siguiente: ver .v-pacas.
        image(img("pacas-carton-azul", "Pacas de cartón apiladas bajo una luz azul", crop(-49.98, 0, 149.98, 100)), carreta.at(60, 10558.8, 648, Y.cuerpo - 10558.8), { variant: "pacas" }),
      ],
    },

    // ---------- El cuerpo que carga ----------
    {
      _type: "collage",
      anchor: "cuerpo",
      rows: cuerpo.rows(Y.ciudad),
      items: [
        sub("El cuerpo que carga", cuerpo.at(732, 11182.75, 648, 36)),
        text(
          body(
            "¿Cómo se expresa el esfuerzo del reciclaje en el cuerpo? Esta pregunta nos llevó a observar las posturas, los movimientos y las fuerzas que intervienen al cargar y desplazar una carreta. Nos interesaba explorar visualmente aquello que ocurre durante el trabajo y que no siempre resulta evidente para quien observa desde afuera.",
            "Para esta exploración realizamos fotografías de silueta con Alejandra como modelo. A través de distintas posturas buscamos registrar los movimientos asociados al oficio y convertirlos en imágenes que permitieran observar el cuerpo desde otra perspectiva. Las fotografías fueron realizadas por Juan Tirado, mientras que José Miranda desarrolló las intervenciones y la exploración gráfica de las siluetas.",
            "En la entrada de la exposición suspendimos pacas de cartón que retomaban la forma en que se apila este material durante el reciclaje. Su disposición buscaba introducir visualmente el volumen y la presencia de las cargas.",
            "La instalación se complementó con velos de color hueso intervenidos a mano con crayola y carboncillo. Sobre estas superficies se proyectaban las fotografías de silueta, mezclando las imágenes con las marcas y trazos realizados por los cocreadores.",
          ),
          cuerpo.at(732, 11278.75, 610, 1050),
          ancho(607.3),
        ),
        image(img("visitante-velo-luz", "Un visitante entre velos morados, junto al destello de un proyector"), cuerpo.at(60, 11426.75, 312, 312)),
        image(img("paca-suspendida", "Paca de cartón suspendida en un nicho iluminado de azul, vista tras otras pacas desenfocadas"), cuerpo.at(396, 11426.75, 312, 312)),
        title("moverse", ROSA, cuerpo.at(280, 11174.64, 142, 851, 5), { rotate: -90 }),
        image(img("visitante-velos-perfil", "Una visitante de perfil, en penumbra, frente a los velos iluminados"), cuerpo.at(284, 11998.75, 424, 424)),
        // Baja 487 px dentro del bloque siguiente (hasta y = 13075), a la derecha de su texto: ver .v-velo.
        image(img("velo-silueta-roja", "Velo intervenido con trazos rojos sobre el que se proyecta una silueta"), cuerpo.at(732, 12426.75, 648, Y.ciudad - 12426.75), { variant: "velo" }),
      ],
    },

    // ---------- La ciudad que no vemos ----------
    {
      _type: "collage",
      anchor: "ciudad",
      rows: ciudad.rows(Y.chapicarton),
      items: [
        sub("La ciudad que no vemos", ciudad.at(60, 12642.75, 596, 36)),
        text(
          body(
            "Para acercarnos a la experiencia de recorrer Chapinero desde el oficio del reciclaje, decidimos acompañar a Ariel durante uno de sus recorridos. Nos interesaba observar la ciudad desde su experiencia y registrar aspectos del trayecto que pueden pasar inadvertidos para quienes la recorren de otra manera.",
            "Durante el recorrido realizamos tomas desde el punto de vista de Ariel y planos generales que permitieran reconocer tanto su experiencia como los espacios por los que transitaba. El material se convirtió en un microdocumental que recoge parte de ese encuentro y propone una mirada de la ciudad desde su recorrido.",
            "El espacio destinado a la proyección se construyó utilizando cartón tanto en el piso como en las pantallas. La imagen se distribuyó en fragmentos sobre paneles ubicados a diferentes distancias. Para completar la imagen, los visitantes debían desplazarse por la sala y encontrar las relaciones entre las distintas proyecciones. Así, el recorrido físico por el espacio hacía parte de la forma de ver el documental.",
          ),
          ciudad.at(60, 12738.75, 600, 870),
          ancho(595.75),
        ),
        image(img("still-carreta-calle", "Fotograma del microdocumental: Ariel hala su carreta por una plazoleta de Chapinero"), ciudad.at(844, 13234.75, 448, 448)),
        image(img("still-titulo", "Fotograma del microdocumental: una calle de Chapinero con la frase «La ciudad que pasa por el cuerpo» repetida"), ciudad.at(60, 13630.75, 648, 483)),
        title("cuidar", ROSA, ciudad.at(732, 14151.8, 142, 358, 5), { rotate: -90 }),
        image(img("still-ariel-carreta", "Fotograma del microdocumental: Ariel, de saco rojo y gorra, junto a su carreta cargada"), ciudad.at(60, 14233.67, 300, 300)),
        image(img("proyeccion-fragmentos", "El microdocumental proyectado en fragmentos sobre paneles de cartón"), ciudad.at(956, 14337.67, 424, 424)),
      ],
    },

    // ---------- Chapicartón ----------
    {
      _type: "collage",
      anchor: "chapicarton",
      rows: chapicarton.rows(Y.cierre),
      items: [
        sub("Chapicartón", chapicarton.at(732, 14921.67, 648, 36)),
        image(img("arcade-jugador", "Un visitante juega Chapicartón en la máquina arcade roja, en una sala iluminada de azul"), chapicarton.at(60, 14763.67, 648, 648)),
        text(
          body(
            "El videojuego surgió de un ejercicio de imaginación colectiva a partir de la pregunta: ¿qué pasaría si...? Durante una exploración sobre posibles escenarios para Bogotá en el año 2078, comenzamos a construir situaciones y personajes que nos permitieran pensar otras formas de habitar la ciudad.",
            "La idea inicial fue evolucionando. Lo que comenzó como un juego de gran escala, ambientado en una ciudad futurista, terminó convirtiéndose en una experiencia centrada en un día de trabajo de una persona recicladora. Edwin, reciclador que participó en el laboratorio, revisó la propuesta y aportó observaciones que ayudaron a orientar su desarrollo. Antes de pasar a programación, organizamos la historia, los personajes y las dinámicas del juego en una biblia de diseño.",
            "El videojuego se presentó en una máquina arcade construida para la exposición. Se diseñó con partidas cortas, de manera que distintos visitantes pudieran acercarse a jugar durante el recorrido. También se exhibieron tres páginas de la biblia de diseño impresas en gran formato, para compartir parte del proceso de construcción del juego y mostrar cómo se organizó la idea antes de convertirse en una experiencia interactiva.",
          ),
          chapicarton.at(732, 15017.67, 648, 880),
        ),
        image(img("mando-arcade", "Manos sosteniendo el mando del arcade, iluminadas de azul"), chapicarton.at(372, 15591.67, 336, 336)),
        image(img("pantalla-chapicarton", "Pantalla del videojuego Chapicartón con una ciudad futurista en pixel art"), chapicarton.at(732, 15925.67, 648, 648)),
        image(img("nino-jugando", "Un niño juega con el mando mientras otros visitantes lo observan"), chapicarton.at(60, 16087.67, 424, 424)),
        title("curiosear", ROSA, chapicarton.at(342, 15795.33, 142, 537, 5), { rotate: -90 }),
        image(img("publico-arcade", "Visitantes de espaldas reunidos alrededor de la máquina arcade"), chapicarton.at(372, 16571.68, 336, 336)),
      ],
    },

    // ---------- Cierre ----------
    {
      _type: "collage",
      anchor: "cierre",
      rows: cierre.rows(Y.fin),
      items: [
        medio(
          [
            "La exposición en Villa Adelaida reunió esas exploraciones en un recorrido por distintos espacios. ",
            "En el primer piso, la bitácora permitió reconstruir cronológicamente el proceso mediante sus registros, objetos y prototipos. Las pacas de cartón en el sótano retomaron la disposición de los materiales que hacen parte del oficio, mientras que los velos, intervenidos con bordados y pinturas, se convirtieron en superficies para proyectar y compartir imágenes. ",
            "El microdocumental acercó a los visitantes a la experiencia de Ariel, el espacio construido en cartón propuso otra manera de observarla. Finalmente, el videojuego abrió un espacio de interacción a partir de una de las propuestas desarrolladas durante el laboratorio.",
            "Más que presentar respuestas definitivas, La ciudad que pasa por el cuerpo reúne distintas maneras de observar, interpretar y relacionarse con Chapinero. Cada pieza conserva algo de las preguntas, conversaciones y decisiones que dieron forma al proceso. En conjunto, invitan a mirar con más atención los recorridos cotidianos, los trabajos que sostienen la vida urbana y las personas que, con sus propias experiencias, también construyen la ciudad.",
          ],
          cierre.at(60, 17027.68, 730, 800),
          "ocre",
          ancho(726.7),
        ),
        image(img("still-ariel-perfil", "Fotograma del microdocumental: el rostro de Ariel de perfil, con gorra blanca", crop(-42.14, -3.17, 167.15, 106.81)), cierre.at(844, 17053.68, 536, 536), { variant: "perfil" }),
        // El titular baja hasta y ≈ 18258: cruza la línea y entra en «Explora más».
        title("ver lo que\nsiempre ha\nestado ahí.", ROSA, cierre.at(656.44, 17831.68, 724, Y.fin - 17831.68, 5), { align: "right", variant: "cierre" }),
        rule(cierre.at(0, 18111.68, 1440, 10), { bleed: true }),
      ],
    },

    explora([
      ["Lo que aprendimos de la calle", "/lo-que-aprendimos-de-la-calle/", ini("card-calle", "Carreta de reciclaje cargada de costales en una calle de Chapinero", { x: 0.5, y: 0.35 })],
      ["Chapicartón", "/videojuego/", ini("card-videojuego", "Joven jugando Chapicartón en una máquina arcade")],
      ["¿Cómo lo hicimos?", "/como-lo-hicimos/", ini("card-como", "Participante con los ojos vendados explora objetos e hilos sobre el piso")],
      ["Equipo", "/equipo/", ini("card-equipo", "El equipo del laboratorio reunido en círculo")],
    ]),
  ],
};
