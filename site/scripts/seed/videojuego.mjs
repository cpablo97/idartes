// Videojuego — frame 1:933 (1440 × 17956). Las y son las del frame de Figma.
import { images, svg, crop, t, b, m, body, canvas, image, text, rule, explora } from "./_lib.mjs";
const img = images("videojuego");
const inicio = images("inicio");
const comun = images("comun");
const panel = (name, w, alt) => svg(`/assets/images/videojuego/${name}.svg`, w, 234, alt);

const jugar = canvas(1759.16); // banda ciudad teal
const historia = canvas(5904.22);
const proceso = canvas(8431.29);
const items = canvas(10411.29);
const capturas = canvas(12881.29); // banda ciudad verde
const creditos = canvas(14431.29);

const key = (k, label, extra = {}) => ({ key: k, ...(label ? { label } : {}), ...extra });

export default {
  _type: "page",
  _id: "page-videojuego",
  title: "Videojuego",
  slug: { current: "videojuego" },
  header: "none",
  menuTone: "ocre",
  footerTone: "#ff67cf",
  dots: "amplio",
  seo: {
    title: "Chapicartón, el videojuego",
    description: "Chapicartón: un videojuego creado junto a recicladores de Chapinero. Juégalo aquí, conoce sus controles, su historia y cómo se hizo.",
  },
  sections: [
    {
      _type: "hero",
      image: img("hero-arcade", "Joven de gorra verde jugando Chapicartón en una máquina arcade ilustrada con edificios de Chapinero"),
      eyebrow: "CHAPICARTÓN",
      tone: "blanco",
      footnote: "Creado junto a recicladores de Chapinero.",
      footnoteTone: "morado",
    },
    {
      _type: "gameEmbed",
      anchor: "jugar",
      title: "Chapicartón",
      // TODO: reemplazar por la URL real del embed (itch.io → Distribute → Embed game) y quitar `pending`.
      embedUrl: "https://itch.io/embed-upload/TODO",
      pageUrl: "https://cuerpoyciudad.itch.io/chapicarton",
      pending: true,
    },
    {
      _type: "collage",
      anchor: "como-jugar",
      rows: jugar.rows(3361.16),
      band: { image: img("fondo-ciudad-teal", "", { x: 0.37, y: 0.5 }) },
      items: [
        text(
          body(
            [b("¿Cómo jugar?")],
            "Al entrar al videojuego encontrarás distintas formas de recorrer el universo de Chapicartón. Puedes seguir la historia de José, enfrentarte a los desafíos de los minijuegos o poner a prueba tus conocimientos sobre la separación de residuos.",
          ),
          jugar.at(60.9, 1879.16, 620.1, 220),
          { tone: "negro", level: 2, variant: "junto" },
        ),
        image(img("sprite-botella-calavera", "Botella rota con una calavera, uno de los residuos peligrosos del juego"), jugar.at(790.5, 1889.6, 279.4, 279.4), { fit: "contain", rotate: -75, flip: "y", drift: 2, variant: "sprite" }),
        text(
          body(
            [b("Minijuegos")],
            "Puedes jugar tres niveles inspirados en distintos escenarios de la ciudad. Cada uno tiene sus propios obstáculos y personajes por enfrentar, entre ellos Humazo, el rey del smog.",
          ),
          jugar.at(732, 2259.16, 619, 180),
          { tone: "negro", level: 3, variant: "junto" },
        ),
        image(img("sprite-botella-vidrio", "Botella de vidrio azul"), jugar.at(326.12, 2279.35, 204.741, 204.741), { fit: "contain", drift: 3, variant: "sprite" }),
        text(
          body([
            t("También, encontrarás un juego de memoria en el que debes descubrir parejas de cartas y relacionar cada residuo con la caneca correspondiente. "),
            b("Una forma de poner a prueba lo que sabes sobre la separación de materiales mientras juegas."),
          ]),
          jugar.at(60.9, 2847.16, 710.1, 150),
          { tone: "negro" },
        ),
        image(img("sprite-caja-carton", "Caja de cartón abierta"), jugar.at(844, 2817.16, 336, 336), { fit: "contain", drift: 2, variant: "sprite" }),
        image(img("sprite-botella-verde", "Botella de vidrio verde"), jugar.at(190.7, 3062.3, 167.118, 167.118), { fit: "contain", rotate: 31, drift: 3, variant: "sprite" }),
      ],
    },
    {
      _type: "controls",
      anchor: "controles",
      title: "Controles",
      gamepad: {
        title: "Con control",
        groups: [
          {
            title: "Menú",
            panel: panel("panel-menu", 601.6, "Cruceta; botón triángulo o botón start; botón círculo"),
            width: 601.6,
            labels: [{ text: "Cruceta para elegir", x: 87.9 }, { text: "Para entrar", x: 342.3 }, { text: "Para volver", x: 544.7 }],
          },
          {
            title: "Niveles",
            panel: panel("panel-niveles", 637.516, "Cruceta; botones triángulo, equis, círculo y cuadrado"),
            width: 637.516,
            labels: [{ text: "Cruceta para\nmoverte", x: 94.66 }, { text: "Salta", x: 269 }, { text: "Remolino", x: 373.6 }, { text: "Bomba", x: 477 }, { text: "Ladrido\nde Chapi", x: 585 }],
          },
          {
            title: "Poderes extra",
            panel: panel("panel-poderes", 638, "Botones R1, L1, R2, L2 y start"),
            width: 638,
            labels: [{ text: "Carrera", x: 50 }, { text: "Poder\nespecial", x: 194.21 }, { text: "Imán", x: 323.92 }, { text: "Baile", x: 452.81 }, { text: "Pausa", x: 585.08 }],
          },
          {
            title: "Aventura",
            panel: panel("panel-aventura", 563.15, "Palanca; botones triángulo, círculo y select"),
            width: 563.15,
            labels: [{ text: "Palanca\npara mover\nel puntero", x: 80.42 }, { text: "Clic", x: 248.5 }, { text: "Clic\nderecho", x: 381.29 }, { text: "Vuelve\nal menú", x: 510.71 }],
          },
          {
            title: "Parejas",
            panel: panel("panel-parejas", 325.516, "Cruceta y botón triángulo"),
            width: 325.516,
            labels: [{ text: "Cruceta para\nelegir la carta", x: 86.68 }, { text: "Voltear", x: 266.37 }],
          },
        ],
        photo: img("mando", "Mando plateado de PlayStation"),
      },
      keyboard: {
        title: "Con teclado y mouse",
        groups: [
          {
            title: "Moverse",
            joiner: "O",
            clusters: [
              { layout: "cross", keys: [key("W"), key("A"), key("S"), key("D")] },
              {
                layout: "cross",
                keys: [key("Flecha arriba", null, { icon: "up" }), key("Flecha izquierda", null, { icon: "left" }), key("Flecha abajo", null, { icon: "down" }), key("Flecha derecha", null, { icon: "right" })],
              },
            ],
          },
          { title: "Saltar / aceptar", clusters: [{ layout: "row", keys: [key("Espacio", null, { size: "space" })] }] },
          {
            title: "Poderes ",
            clusters: [
              { layout: "row", keys: [key("K", "Remolino"), key("B", "Bomba"), key("M", "Ladrido"), key("E", "Poder\nespecial")] },
              { layout: "row", indent: true, keys: [key("Q", "Imán"), key("T", "Baile"), key("Shift", "Carrera", { size: "wide" })] },
            ],
          },
          { title: "Volver", clusters: [{ layout: "row", keys: [key("Esc")] }] },
        ],
        photos: [img("teclado", ""), img("mouse", "")],
      },
    },
    {
      _type: "collage",
      anchor: "historia",
      rows: historia.rows(8421.29),
      items: [
        text(
          body(
            [b("Un día. Una carreta. Una hija por recuperar.")],
            [
              b("¿Qué pasaría si reciclar fuera ilegal? "),
              t("Chapicartón parte de esta pregunta para construir una historia ambientada en una versión futurista de Chapinero, en Bogotá, donde la ciudad ha intentado ocultar los residuos y quienes se encargan de recuperarlos han sido desplazados."),
            ],
          ),
          historia.at(60, 5994.22, 599.1, 300),
          { level: 2 },
        ),
        image(img("foto-jugador-arcade", "Un joven juega en la máquina arcade de Chapicartón mientras otras personas lo observan", crop(0, 0, 149.98, 100)), historia.at(731.1, 5994.22, 448, 448), { drift: 2 }),
        image(img("foto-publico-arcade", "Dos personas de espaldas juegan Chapicartón en la arcade bajo una luz violeta"), historia.at(370.89, 6602.22, 336.21, 336.21), { drift: 3 }),
        text(
          body(
            "En medio de ese escenario conocemos a José, un reciclador que pierde su carreta y es separado de su hija, Rosita. Tiene un solo día para recuperarlas. Para lograrlo, debe recorrer las calles del barrio, recoger materiales, visitar el centro de acopio y tomar decisiones que pueden acercarlo o alejarlo de su objetivo.",
          ),
          historia.at(731.1, 6602.22, 591, 260),
          { tone: "ocre" },
        ),
        text(
          body("A lo largo del recorrido, la ciudad no es solo el escenario \nde la historia. Sus calles, edificios, personajes y situaciones hacen parte de los desafíos que José debe enfrentar. "),
          historia.at(60, 7028.43, 678.5, 110),
          { variant: "salto" },
        ),
        image(img("maqueta-arcade", "Maqueta blanca en 3D del mueble de la máquina arcade"), historia.at(386.5, 7306.75, 336, 579.42, 1), { fit: "contain" }),
        image(img("foto-nino-luz-verde", "Un niño juega concentrado, iluminado por la luz verde de la pantalla", crop(-10.17, 0, 149.98, 100)), historia.at(819.1, 7313.75, 560, 560), { drift: 2 }),
        image(img("lateral-arcade-1", "Ilustración del lateral de la arcade: edificios de colores, un reciclador con su carreta y montones de residuos"), historia.at(60, 7544.71, 469.965, 876.583, 2), { fit: "contain" }),
        text(
          body(
            [
              t("Chapicartón es un videojuego desarrollado en el marco de ARTEFACTUM, "),
              b("Laboratorio Artístico de Innovación Social: El diseño y lo digital en Chapinero."),
              t(" A través de su historia y sus mecánicas, propone acercarse a algunas de las situaciones que atraviesan las personas recicladoras en su trabajo cotidiano."),
            ],
            [b("¿Te animas a jugar?")],
          ),
          historia.at(731.1, 7993.75, 648, 330),
          { tone: "ocre" },
        ),
        rule(historia.at(0, 8421.29, 1440, 10), { bleed: true }),
      ],
    },
    {
      _type: "collage",
      anchor: "asi-se-hizo",
      rows: proceso.rows(10411.29),
      items: [
        text(
          body([
            b("Así se hizo Chapicartón, "),
            t("el videojuego que encuentras aquí fue el resultado de un proceso de exploración, escritura, dibujo y experimentación. Antes de llegar a la programación, la historia tomó forma a través de conversaciones, ejercicios creativos, personajes, escenarios y distintas pruebas que permitieron definir cómo sería el mundo de Chapicartón."),
          ]),
          proceso.at(60, 8541.29, 653, 330),
        ),
        image(img("foto-proceso", "Visitantes de la exhibición conversan alrededor de una mesa con piezas impresas del proyecto"), proceso.at(732, 8541.29, 500, 500), { drift: 2 }),
        image(img("logo-chapicarton", "Logotipo de Chapicartón"), proceso.at(8, 9033.29, 646.268, 293.326), { fit: "contain", variant: "logo" }),
        text(
          body(
            "Ese proceso quedó registrado en la biblia del videojuego: un documento que reúne el desarrollo de la propuesta y permite conocer cómo se construyó su universo. Allí encontrarás los personajes que acompañan a José, los lugares que recorre, los primeros bocetos, las mecánicas y las decisiones que dieron forma a cada desafío.",
          ),
          proceso.at(732, 9197.29, 648, 260),
          { tone: "ocre" },
        ),
        image(img("foto-biblia-impresa", "Cuatro integrantes del equipo revisan la biblia impresa del videojuego sobre una mesa"), proceso.at(60, 9503.29, 1320, 880.107), { variant: "ancha" }),
      ],
    },
    {
      _type: "collage",
      anchor: "proceso",
      rows: items.rows(12881.29),
      items: [
        image(img("item-botella-plastico", "Botella de plástico aplastada"), items.at(1180, 10443.4, 200, 200), { fit: "contain", variant: "sprite" }),
        image(img("fondo-neon", "Escenario pixel-art de una Bogotá futurista en tonos neón, con Monserrate al fondo"), items.at(60, 10583.4, 448, 448), { drift: 2 }),
        image(img("item-botella-verde", "Botella de vidrio verde rota"), items.at(596, 10603.4, 172.883, 172.883), { fit: "contain", variant: "sprite" }),
        image(img("item-carreta", "Carreta de reciclaje morada cargada de cartón, con el letrero «La carroza»"), items.at(956, 10673.4, 424, 424, 2), { fit: "contain", variant: "sprite" }),
        image(img("item-caja-huevos", "Cubeta de huevos de cartón"), items.at(732, 10876.28, 224, 224), { fit: "contain", variant: "sprite" }),
        image(img("item-arepa", "Arepa asada"), items.at(60, 11121.4, 200, 200), { fit: "contain", variant: "sprite" }),
        image(img("item-carton-leche", "Caja de leche de cartón"), items.at(747.76, 11130.28, 172.883, 172.883), { fit: "contain", variant: "sprite" }),
        image(img("lateral-arcade-2", "Ilustración del otro lateral de la arcade: casas en la montaña y un reciclador entre bolsas de residuos"), items.at(844, 11117.4, 536, 999.753, 1), { fit: "contain" }),
        image(img("item-manguera", "Manguera roja enrollada"), items.at(373.99, 11231.4, 222.013, 222.013), { fit: "contain", variant: "sprite" }),
        image(img("item-caneca", "Contenedor de basura con grafitis"), items.at(172, 11483.41, 312, 312), { fit: "contain", variant: "sprite" }),
        image(img("hoja-items", "Hoja de objetos del juego: martillo de cartón, pistola de botella, guantes amarillos y tapas"), items.at(620, 11537.3, 224, 317.168, 2), { fit: "contain" }),
        image(img("foto-taller", "Sesión de trabajo del laboratorio: participantes sentados alrededor de una mesa larga frente a una pantalla"), items.at(60, 11915.41, 648, 648), { drift: 2 }),
        image(img("captura-laberinto", "Captura del minijuego «El laberinto de Chapi», con las tres canecas de Bogotá"), items.at(732, 12517.15, 648, 364.5), { variant: "captura" }),
      ],
    },
    {
      _type: "collage",
      anchor: "capturas",
      rows: capturas.rows(14431.29),
      band: { image: img("fondo-ciudad-verde", "", { x: 0.18, y: 0.5 }) },
      items: [
        image(img("captura-menu", "Captura del menú principal de Chapicartón: iniciar, minijuegos, aprende a reciclar, opciones, créditos y salir"), capturas.at(60, 12881.65, 648, 364.5), { variant: "captura" }),
        image(img("captura-vidrios", "Captura de un nivel en la ciudad de neón donde se recogen vidrios"), capturas.at(60, 13276.15, 648, 364.5), { variant: "captura" }),
        image(img("captura-carreta", "Captura del nivel de la carreta: Chapi ladra «¡Guau!» junto a un bus"), capturas.at(732, 13276.15, 648, 364.5), { variant: "captura" }),
        image(img("captura-reciclables", "Captura de un nivel en la ciudad gris donde se recogen reciclables"), capturas.at(60, 13670.65, 648, 364.5), { variant: "captura" }),
        image(img("captura-final", "Captura de la pantalla final: «¡Neo-Bogotá vuelve a brillar!»"), capturas.at(60, 14065.15, 648, 364.5), { variant: "captura" }),
      ],
    },
    {
      _type: "collage",
      anchor: "creditos",
      rows: creditos.rows(15751.29),
      items: [
        image(img("bocetos-biblia", "Lámina de bocetos a lápiz de personajes y escenarios del videojuego"), creditos.at(0, 14433.13, 1440, 810), { fit: "contain", variant: "ancha" }),
        text(
          // En el diseño hay un salto forzado tras "Mentoría:": son dos párrafos que se leen como uno solo (ver .v-creditos).
          body([t("Animación y programación:"), m(" Camilo Enrique Muñoz Triana / "), t("Mentoría:"), m(" ")], [
            m("Julie López / "),
            t("Personajes, ilustración y bocetos: "),
            m("Sebastián Espitia Riaño, Carol Sofía Cuervo Lizarazu, Yineth Andrea Sandino Cordón, Eduardo Antonio Castro Patiño, Camilo Fernando Castañeda Murcia, Nelson Mauricio Rodríguez Ayala, Johan Andretty Lozano Suárez y Samuel Olarte Espitia / "),
            t("Artistas cocreadores:"),
            m(" Diana Carolina Castañeda Barragán, José Alberto Miranda Álvarez, Santiago Andonoff Gaitán, Yenny Alejandra Osma Palacios, Natalia Patricia Ahumada Baptista, Daniel Felipe García Lagos, Carlos Andrés Saray Orozco / "),
            t("Laboratorista:"),
            m(" Víctor Gómez / "),
            t("Orientadora metodológica:"),
            m(" Laura Ximena Garrido /"),
            t(" Productor de campo: "),
            m("Wilson Dueñas"),
          ]),
          creditos.at(707.83, 15333.13, 672.166, 360),
          { size: 20, align: "justify", variant: "creditos" },
        ),
        rule(creditos.at(0, 15753.13, 1440, 10), { bleed: true }),
      ],
    },
    {
      _type: "bitacora",
      anchor: "biblia",
      title: "Biblia del juego ",
      mode: "book",
      // TODO: reemplazar por las láminas reales
      pages: [1, 2, 3, 4, 5, 6].map((n) => ({ image: comun(`lamina-pendiente-${n}`, `Lámina ${n} de la biblia del videojuego (pendiente)`) })),
    },
    explora([
      ["Lo que aprendimos de la calle", "/lo-que-aprendimos-de-la-calle/", inicio("card-calle", "Carreta de reciclaje cargada de costales en una calle de Chapinero", { x: 0.5, y: 0.35 })],
      ["Video tutoriales", "/para-recicladores/#videotutoriales", inicio("card-recicladores", "Recicladora sonriente empujando su carreta cargada frente a un camión rojo")],
      ["¿Cómo lo hicimos?", "/como-lo-hicimos/", inicio("card-como", "Participante con los ojos vendados explora objetos e hilos sobre el piso")],
      ["Exhibición", "/exhibicion/", inicio("card-exhibicion", "Sala de la exhibición con mesas, piezas y pendones")],
    ]),
  ],
};
