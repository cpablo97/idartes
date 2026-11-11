// Equipo — frame 1:758 (1440 × 16073). Las y son las del frame de Figma.
import { images, crop, body, canvas, text, rule, explora } from "./_lib.mjs";
const img = images("equipo");
const ini = images("inicio");

const intro = canvas(927);
const cierre = canvas(14618);

/**
 * Ficha de persona. `recorte` = [left, top, width, height] del recorte interior de Figma (% del marco de 909,755 × 560):
 * se traduce a punto focal (`crop()` → hotspot) + `zoom` (ancho del recorte / 100, porque todas las fotos llenan el marco por el ancho).
 * Con `flip` la foto va espejada: el punto focal se da sobre la foto original, por eso su x se invierte.
 */
function persona(name, role, bio, archivo, alt, recorte, flip = false) {
  let hotspot;
  let zoom;
  if (recorte) {
    const [left, top, width, height] = recorte;
    hotspot = crop(left, top, width, height);
    if (flip) hotspot.x = Math.round((1 - hotspot.x) * 100) / 100;
    if (width > 100.5) zoom = Math.round(width * 100) / 10000;
  }
  return { name, role, bio: body(bio), photo: img(archivo, alt, hotspot), ...(zoom ? { zoom } : {}), ...(flip ? { flip: true } : {}) };
}

export default {
  _type: "page",
  _id: "page-equipo",
  title: "Equipo",
  slug: { current: "equipo" },
  header: "none",
  menuTone: "ocre",
  footerTone: "#9c67ff",
  dots: "amplio",
  seo: { description: "Las personas que participaron en el laboratorio Ciudad y Cuerpo: cocreadores, laboratorista, orientadora metodológica y productor de campo." },
  sections: [
    {
      _type: "hero",
      image: img("hero-equipo", "El equipo del laboratorio reunido de pie alrededor de una mesa en un salón amplio"),
      title: "Equipo",
      tone: "#ed56c5",
      footnote: "Creado junto a recicladores de Chapinero.",
      footnoteTone: "blanco",
    },
    {
      _type: "collage",
      rows: intro.rows(1230),
      items: [
        text(
          body(
            "Este laboratorio fue un espacio de encuentro entre artistas, diseñadores y creadores de distintas disciplinas.",
            "Conoce a las personas que participaron en este proceso y que, desde sus experiencias y conocimientos, aportaron a la construcción colectiva del laboratorio.",
          ),
          intro.at(59, 1047, 667, 180),
          { variant: "intro" },
        ),
      ],
    },
    {
      _type: "people",
      anchor: "cocreadores",
      title: "Cocreadores",
      titleTone: "morado",
      titleAlign: "right",
      tone: "#a486ba",
      roleTone: "#eae8ff",
      people: [
        persona("Camilo Enrique Muñoz Triana", "Gestión cultural · Arte interdisciplinar", "Fundador y director de DiversArte, colectivo que integra pintura, música, fotografía, danza y patinaje urbano. Le interesa conectar el arte, la tecnología y la participación comunitaria.", "camilo-munoz", "Joven de gorra verde juega Chapicartón en una máquina arcade de cartón"),
        persona("Santiago Andonoff Gaitán", "Diseño industrial · Agroecología", "Diseñador industrial interesado en la creación de espacios sostenibles, las huertas y la agricultura orgánica. Explora las relaciones entre territorio, conocimiento ancestral y herramientas digitales.", "santiago-andonoff", "Participantes conversan en una sesión del laboratorio: dos sentados y dos de pie frente a un pendón", [-40.25, -68.85, 276.01, 298.96]),
        persona("José Alberto Miranda Álvarez", "Periodismo · Producción de contenidos", "Comunicador social y periodista con experiencia en producción audiovisual, edición y coordinación de contenidos digitales. Le interesa explorar narrativas experimentales que conecten la comunicación, el diseño y lo social.", "jose-miranda", "Joven de buzo negro expone gesticulando junto a una pantalla con una presentación magenta", [0, -85.48, 122.35, 265.02]),
        persona("Eduardo Antonio Castro Patiño", "Arquitectura · UX/UI · Diseño interactivo", "Arquitecto en formación complementaria en UX/UI, interesado en integrar el diseño espacial, las herramientas de inteligencia artificial y las experiencias interactivas para explorar nuevas formas de creación.", "eduardo-castro", "Un hombre de buzo negro y una mujer de gafas escriben en sus libretas, sentados uno junto al otro", [0, -24.08, 134.63, 145.83]),
        persona("Sebastián Espitia Riaño", "Producción audiovisual · Animación", "Creador audiovisual con experiencia académica en guion, storyboard, edición, animación y diseño sonoro. Explora la construcción de historias a través de medios digitales y lenguajes visuales.", "sebastian-espitia", "Tres participantes dibujan inclinados sobre una mesa blanca, bajo una estructura metálica roja", [-19.98, -5.22, 119.98, 129.96], true),
        persona("Camilo Fernando Castañeda Murcia", "Diseño gráfico · Comunicación visual", "Diseñador gráfico enfocado en conceptos creativos, ilustración y comunicación visual. Su trabajo combina diseño digital, contenidos y narrativas gráficas con interés en la experimentación y el impacto social.", "camilo-castaneda", "Hombre de brazo tatuado se apoya en una mesa mientras dos mujeres escriben y un fotógrafo las retrata", [-73.1, -129.75, 272.61, 295.28]),
        persona("Yineth Andrea Sandino Cordón", "Diseño gráfico · Identidad visual", "Estudiante de Diseño Gráfico con experiencia en proyectos de identidad de marca, dirección de arte y animación. Le interesa el diseño como herramienta para conectar personas, territorios y tecnologías.", "yineth-sandino", "Una joven de cabello largo acompaña a una mujer con los ojos vendados que huele un objeto", [0, -3.63, 116.21, 125.88], true),
        persona("Yenny Alejandra Osma Palacios", "Diseño de modas · Confección", "Diseñadora de modas en formación, con experiencia en un taller familiar de confección. Explora la creación de prendas mediante el patronaje, la costura, la deconstrucción y la reutilización de retazos.", "yenny-osma", "Dos mujeres conversan en la exhibición, frente a una ventana de madera", [-9.55, -6.28, 109.55, 118.66], true),
        persona("Diana Carolina Castañeda Barragán", "Danza · Audiovisual · Gestión cultural", "Artista interdisciplinar, bailarina y coreógrafa que investiga las relaciones entre cuerpo, imagen y sonido. Su práctica integra danza, videoperformance y tecnologías interactivas para crear experiencias participativas.", "diana-castaneda", "Fotografía en blanco y negro de una bailarina que se arquea hacia atrás atravesada por un haz de luz", [0, -1.53, 100, 108.32], true),
        persona("Nelson Mauricio Rodríguez Ayala", "Diseño de modas · Vestuario escénico", "Diseñador de modas con experiencia en patronaje, confección e ilustración de vestuario para teatro. Explora la indumentaria como una forma de construir personajes, narrativas y universos visuales.", "nelson-rodriguez", "Joven asomado entre telas blancas colgantes iluminadas de azul", [-1.66, -42.54, 103.32, 223.81], true),
        persona("Samuel Olarte Espitia", "Arte · Psicología · Innovación social", "Artista y estudiante de Psicología interesado en la educación, la gestión cultural y el bienestar humano. Investiga las relaciones entre inteligencia artificial, aprendizaje y prácticas artísticas con enfoque social.", "samuel-olarte", "Silueta de un hombre de gorra inclinado hacia el haz de un proyector en una sala a oscuras", [0, -0.55, 100, 108.32], true),
        persona("Carol Sofía Cuervo Lizarazu", "Diseño de modas · Desarrollo de prendas", "Diseñadora de modas en formación con experiencia en patronaje, confección y desarrollo de prendas. Combina exploración conceptual, atención al detalle y conocimiento técnico para convertir ideas en propuestas de vestuario.", "carol-cuervo", "Participantes arrodillados en el piso tienden hilos entre objetos durante un ejercicio del laboratorio", [0, -31.66, 157.61, 170.66]),
        persona("Johan Andretty Lozano Suárez", "Diseño gráfico · Moda · Narrativas visuales", "Diseñador gráfico y de modas que combina ilustración, vestuario y experimentación textil. Su trabajo explora imaginarios fantásticos, estéticas maximalistas y narrativas inspiradas en la cultura latinoamericana.", "johan-lozano", "Joven de gafas y cabello rojo conversa con visitantes de la exhibición junto a un panel azul"),
        persona("Natalia Patricia Ahumada Baptista", "Diseño de modas · Vestuario", "Diseñadora de modas en formación, con conocimientos de patronaje industrial y desarrollo de prendas. Le interesa la exploración creativa del vestuario y el fortalecimiento de su práctica artística y profesional.", "natalia-ahumada", "Grupo reunido en penumbra alrededor de una mesa iluminada con velas", [-84.09, -40.18, 190.2, 206.01]),
        persona("Daniel Felipe García Lagos", "Ilustración · Diseño gráfico · Moda", "Ilustrador con experiencia en desarrollo de piezas gráficas y manejo de herramientas digitales. Actualmente amplía su formación hacia el diseño de modas, con interés en conectar la ilustración y la experimentación visual.", "daniel-garcia", "Joven de chaqueta de jean explica una pieza de la exhibición a tres visitantes"),
        persona("Carlos Andrés Saray Orozco", "Artes visuales · Educación · Investigación-creación", "Artista visual y docente con experiencia en procesos pedagógicos, ilustración y creación colectiva. Su trayectoria integra prácticas artísticas y educativas, con interés en investigar las relaciones entre cultura, tecnología y territorio.", "carlos-saray", "Hombre con los ojos vendados palpa objetos dispuestos en el piso durante un ejercicio sensorial", [-13.44, -9.08, 113.44, 134.05]),
      ],
    },
    {
      _type: "people",
      anchor: "laboratorista",
      title: "Laboratorista",
      titleTone: "morado",
      tone: "#ffe867",
      roleTone: "morado",
      people: [
        persona("Victor Gómez Rodríguez", "Diseño digital · Tipografía · Diseño editorial", "Diseñador y tipógrafo, magíster en Diseño de la Universidad de los Andes. Cuenta con más de quince años de experiencia en diseño digital, editorial y tipográfico. Su trabajo abarca el diseño de sitios web, aplicaciones, publicaciones y sistemas de señalética, además de explorar campos como el diseño de interacción y de servicios. En 2023, su tipografía Alestalgia fue seleccionada en la Bienal Tipos Latinos. En ARTEFACTUM acompañó el proceso desde su experiencia en diseño y creación.", "victor-gomez", "Hombre de camisa verde levanta los brazos sonriendo mientras dos participantes le ponen una hoja seca en el pecho", [0, 0, 100, 216.61]),
      ],
    },
    {
      _type: "people",
      anchor: "orientadora-metodologica",
      title: "Orientadora metodológica",
      titleTone: "#67ff8d",
      tone: "#ff67cf",
      roleTone: "morado",
      people: [
        persona("Laura Garrido", "Creación textil · Cartografía afectiva · Memoria y territorio", "Artista y facilitadora de procesos de creación artística que exploran las relaciones entre memoria, territorio y afectividad. Su trabajo integra prácticas textiles, reparación de materiales y cartografía afectiva como medios para reconocer historias y transformaciones del territorio, propiciando espacios de exploración y creación colectiva.", "laura-garrido", "Mujer de gafas y chaqueta de jean toma notas en una libreta, rodeada de otros participantes", [-20.66, -25.62, 154.11, 166.93]),
      ],
    },
    {
      _type: "people",
      anchor: "productor-de-campo",
      title: "Productor de campo",
      titleTone: "#ff67cf",
      tone: "#67ff8d",
      roleTone: "morado",
      people: [
        persona("Wilson Dueñas", "Artes visuales · Educación artística · Realización audiovisual", "Artista visual, docente, diseñador y fotógrafo independiente con más de quince años de experiencia en procesos culturales. Su trayectoria reúne conocimientos en realización audiovisual, fotografía, producción y montaje, así como en manejo de grupos y formación artística. Ha participado en procesos de gestión cultural territorial y formación artística en Bogotá.", "wilson-duenas", "Retrato en penumbra de un hombre de gorra, gafas y barba", [0, 0, 100, 108.3]),
      ],
    },
    {
      _type: "collage",
      rows: cierre.rows(14798),
      items: [rule(cierre.at(0, 14788, 1440, 10), { bleed: true })],
    },
    explora([
      ["Lo que aprendimos de la calle", "/lo-que-aprendimos-de-la-calle/", ini("card-calle", "Carreta de reciclaje cargada de costales en una calle de Chapinero", { x: 0.5, y: 0.35 })],
      ["Chapicartón", "/videojuego/", ini("card-videojuego", "Joven jugando Chapicartón en una máquina arcade")],
      ["¿Cómo lo hicimos?", "/como-lo-hicimos/", ini("card-como", "Participante con los ojos vendados explora objetos e hilos sobre el piso")],
      ["Exhibición", "/exhibicion/", ini("card-exhibicion", "Sala de la exhibición con mesas, piezas y pendones")],
    ]),
  ],
};
