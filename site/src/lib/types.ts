// Tipos del contenido. El seed (src/content/seed.json) tiene exactamente la forma que
// devolverá la consulta GROQ de Sanity; docs/cms-modelo.md describe el mismo modelo en prosa.

/** Imagen: hoy `local` (variantes generadas por scripts/images.mjs); mañana `asset` de Sanity. `alt` es obligatorio. */
export type Img = {
  asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } };
  /** Punto focal (0–1) como el hotspot de Sanity: decide qué parte se conserva al recortar. */
  hotspot?: { x: number; y: number };
  crop?: unknown;
  local?: { webp: string[]; fallback: string; width: number; height: number };
  alt: string;
};

/** Portable Text simplificado: párrafos con tramos marcados. `medium` = peso 500; `href` vuelve el tramo un enlace. */
export type Mark = "strong" | "em" | "medium" | "underline";
export type Span = { _type: "span"; text: string; marks?: Mark[]; href?: string };
export type Block = { _type: "block"; _key: string; style?: "normal"; children: Span[] };

/** Color: un token de marca (custom property de styles.css) o un hex puntual del diseño. */
export type Tone = "negro" | "blanco" | "morado" | "rosa" | "magenta" | "amarillo" | "verde" | "rojo" | "cian" | "ocre" | "gris" | `#${string}`;

/**
 * Posición en la retícula de collage de escritorio: 144 columnas (1 unidad = 10 px en el diseño de 1440)
 * y filas cuadradas de la misma unidad, contadas desde el borde superior de la sección.
 * En tablet y móvil la retícula se ignora y los elementos fluyen en el orden del arreglo.
 */
export type Place = { col: number; row: number; cols: number; rows?: number; z?: number };

// ---------- Elementos de un lienzo (`collage`, `cardGrid`) ----------
// Todos aceptan `variant`: un nombre corto que se vuelve la clase CSS `v-<variant>` para ajustes puntuales.

export type ImageItem = {
  _type: "imageItem";
  _key: string;
  variant?: string;
  image: Img;
  place: Place;
  fit?: "cover" | "contain";
  /** Grados de giro del marco (p. ej. sprites del videojuego). */
  rotate?: number;
  flip?: "x" | "y";
  /** Radio de esquina en px de diseño. */
  radius?: number;
  /** Parallax ligado al scroll: desplazamiento máximo en unidades de retícula (0 = quieto). */
  drift?: number;
  href?: string;
  caption?: string;
};
export type TextItem = {
  _type: "textItem";
  _key: string;
  variant?: string;
  body: Block[];
  place: Place;
  tone?: Tone;
  /** Tamaño en px del diseño de 1440 (16, 20, 24, 30, 36, 40, 46…). Por defecto 24. */
  size?: number;
  font?: "sans" | "mono" | "doto" | "serif";
  weight?: number;
  align?: "left" | "right" | "center" | "justify";
  nowrap?: boolean;
  /** Si se define, el primer párrafo se emite como encabezado de ese nivel. */
  level?: 1 | 2 | 3;
};
export type DisplayTitleItem = {
  _type: "displayTitle";
  _key: string;
  variant?: string;
  /** Tramos del titular; `em` pone el tramo en itálica y "\n" parte la línea. */
  text: Span[];
  tone: Tone;
  italic?: boolean;
  /** 90 = se lee de arriba abajo; -90 = de abajo arriba. En móvil vuelve a horizontal. */
  rotate?: 0 | 90 | -90;
  /** Tamaño en px de diseño; por defecto 119.333. */
  size?: number;
  align?: "left" | "right" | "center";
  level?: 1 | 2 | 3;
  place: Place;
};
export type CardItem = { _type: "card"; _key: string; label: string; href: string; image: Img; size: "s" | "m" | "l"; place: Place };
/** Línea morada de 1 px; con `bleed` cruza toda la ventana. */
export type RuleItem = { _type: "rule"; _key: string; variant?: string; place: Place; bleed?: boolean; tone?: Tone };
/** Aviso destacado (franja de color con icono de advertencia). */
export type NoticeItem = { _type: "notice"; _key: string; title: string; body: string; tone?: Tone; place: Place };
export type CanvasItem = ImageItem | TextItem | DisplayTitleItem | CardItem | RuleItem | NoticeItem;

// ---------- Secciones (page builder) ----------

type Shared = { _key: string; anchor?: string };
/** Banda de fondo a sangre detrás de una sección. */
export type Band = { color?: Tone | string; image?: Img };

/** Composición libre de fotos, textos, titulares y tarjetas sobre la retícula. */
export type CollageSection = Shared & {
  _type: "collage";
  /** Alto del lienzo en unidades de retícula. */
  rows: number;
  items: CanvasItem[];
  /** Tramas de puntos magenta: `over` las pinta encima de las fotos. */
  dots?: (Place & { over?: boolean })[];
  band?: Band;
};
/** Cabecera fotográfica a sangre de las páginas interiores. Con `youtubeId` es además un video. */
export type HeroSection = Shared & {
  _type: "hero";
  image: Img;
  blur?: boolean;
  /** Rótulo centrado en Doto ("PA EL CAMINO", "CHAPICARTÓN"…). */
  eyebrow?: string;
  /** Frase centrada en Xanh Mono 46. */
  phrase?: string;
  /** Título de página pequeño centrado (36 px). */
  title?: string;
  titleFont?: "mono" | "doto" | "sans";
  tone?: Tone;
  footnote?: string;
  footnoteTone?: Tone;
  /** `below` pone la nota bajo la foto en vez de sobre ella. */
  footnotePlace?: "over" | "below";
  youtubeId?: string;
  videoTitle?: string;
};
/** Índice de tarjetas: `free` las coloca en la retícula (Inicio); `row` es la fila "Explora más". */
export type CardGridSection = Shared & {
  _type: "cardGrid";
  layout: "free" | "row";
  title?: string;
  rows?: number;
  items: (CardItem | DisplayTitleItem)[];
  dots?: (Place & { over?: boolean })[];
};
export type VideoSection = Shared & {
  _type: "video";
  /** ID del video de YouTube (lo que va después de `v=`). */
  youtubeId: string;
  title: string;
  intro?: Block[];
  caption?: Block[];
  poster?: Img;
  rule?: boolean;
};
export type VideoListSection = Shared & {
  _type: "videoList";
  videos: { _key: string; label: string; youtubeId: string; title: string; description?: string; poster?: Img }[];
};
export type MapSection = Shared & {
  _type: "map";
  title: string;
  body?: Block[];
  legend: { _key: string; label: string; color: string }[];
  /** URL `…/maps/d/embed?mid=…` de Google My Maps. */
  embedUrl: string;
  /** Mientras sea true se muestra la captura de referencia en vez del iframe. */
  pending?: boolean;
  /** Rótulo sobre la captura mientras el mapa esté pendiente ("Mapa pendiente"). */
  pendingLabel?: string;
  placeholder?: Img;
  note?: Block[];
};
export type GallerySection = Shared & {
  _type: "gallery";
  title?: string;
  heading?: string;
  body?: Block[];
  /** Fotos de la espiral (entre 8 y 12 es lo que mejor se ve). */
  images: { _key: string; image: Img; caption?: string }[];
};
/** Visor de láminas de la bitácora: `slider` se desliza; `book` pasa de a dos páginas. */
export type BitacoraSection = Shared & { _type: "bitacora"; title?: string; intro?: Block[]; mode: "slider" | "book"; pages: { _key: string; image: Img }[] };
export type GameEmbedSection = Shared & {
  _type: "gameEmbed";
  /** Nombre del juego: arma el botón ("Jugar Chapicartón") y el título del iframe. */
  title: string;
  /** URL `https://itch.io/embed-upload/<id>` del juego (itch.io → Distribute → Embed game). */
  embedUrl: string;
  /** Página pública del juego en itch.io; siempre queda como enlace visible. */
  pageUrl: string;
  /** Imagen de la fachada mientras no se ha pulsado "Jugar". */
  poster?: Img;
  /** Mientras sea true no hay botón ni iframe: solo el hueco pendiente con el enlace. */
  pending?: boolean;
  /** Texto del botón; por defecto "Jugar <title>". */
  playLabel?: string;
  /** Texto del enlace a itch.io; por defecto "Abrir en itch.io". */
  linkLabel?: string;
};
/**
 * Grupo de fichas de persona (Equipo): titular del grupo + una ficha por persona (foto a la izquierda, texto a la derecha).
 * El recorte de cada foto sale del `hotspot` de la imagen (punto que se conserva) y de `zoom` (acercamiento sobre el encuadre "cover").
 */
export type Person = {
  _key: string;
  name: string;
  /** Disciplinas, separadas por " · ". */
  role?: string;
  bio?: Block[];
  photo: Img;
  /** Acercamiento de la foto: 1 = llena el marco; 2 = al doble. El `hotspot` de la foto es el punto fijo. */
  zoom?: number;
  /** Foto espejada horizontalmente. */
  flip?: boolean;
  /** Color de esta ficha, si difiere del grupo. */
  tone?: Tone;
  links?: { _key: string; label: string; url: string }[];
};
export type PeopleSection = Shared & {
  _type: "people";
  /** Titular del grupo ("Cocreadores", "Laboratorista"…). */
  title: string;
  titleTone?: Tone;
  titleAlign?: "left" | "right";
  /** Color de fondo de las fichas del grupo. */
  tone?: Tone;
  /** Color de la línea de disciplinas (clara sobre lila, morada sobre los colores vivos). */
  roleTone?: Tone;
  people: Person[];
};
/** Tecla del teclado: `key` es lo que se lee en la tecla; con `icon` se dibuja una flecha y `key` queda como texto accesible. */
export type ControlKey = { _key: string; key: string; label?: string; icon?: "up" | "down" | "left" | "right"; size?: "space" | "wide" };
/** Controles del videojuego: mando y teclado. */
export type ControlsSection = Shared & {
  _type: "controls";
  title: string;
  gamepad: {
    title: string;
    groups: {
      _key: string;
      title: string;
      /** Dibujo del panel (SVG con su fondo lila). `alt` describe los botones que muestra. */
      panel: Img;
      /** Ancho del panel en px de diseño (el alto es siempre 234). */
      width: number;
      /** Etiquetas bajo el panel: `x` = centro de la etiqueta en px de diseño desde el borde izquierdo del panel; "\n" parte la línea. */
      labels: { _key: string; text: string; x: number }[];
    }[];
    photo?: Img;
  };
  keyboard: {
    title: string;
    groups: {
      _key: string;
      title: string;
      /** Texto entre un grupo de teclas y el siguiente ("O"). */
      joiner?: string;
      /** `cross` = T invertida (W / A S D); `row` = fila con etiquetas debajo; `indent` desplaza la fila. */
      clusters: { _key: string; layout: "cross" | "row"; indent?: boolean; keys: ControlKey[] }[];
    }[];
    /** Fotos decorativas: [teclado, mouse]. */
    photos?: Img[];
  };
};
/**
 * Datos (Lo que aprendimos de la calle): texto con enlace a la fuente, gráfico de círculos y/o tabla.
 * Todos los bloques son opcionales, así que la misma sección sirve para «texto + gráfico» y para «tabla».
 */
export type DataSeries = {
  _key: string;
  label: string;
  /** Cifra que representa el círculo; se anuncia en la leyenda (el dibujo no es proporcional). */
  value?: number;
  unit?: string;
  /** Color del punto y del rótulo de la leyenda. */
  tone: Tone;
  /** Color del contorno del círculo; por defecto, `tone`. */
  ringTone?: Tone;
  /** Círculo: esquina superior izquierda y diámetro, en px de diseño dentro del lienzo del gráfico. */
  ring: { x: number; y: number; d: number };
  /** Centro del punto de la leyenda (va sobre la circunferencia). */
  dot: { x: number; y: number };
  /** Separación entre punto y rótulo en px de diseño (16 por defecto). */
  gap?: number;
};
export type DataChart = {
  /** Título accesible del gráfico. */
  title: string;
  description?: string;
  /** Lienzo del gráfico en px de diseño (1440 = ancho del frame). */
  width: number;
  height: number;
  /** Del círculo mayor al menor. */
  series: DataSeries[];
};
export type DataTable = {
  /** Título de la tabla (su <caption>). */
  title: string;
  subtitle?: string;
  /** Fondo de la tarjeta. */
  tone?: Tone;
  /** Encabezados de columna. */
  head: string[];
  /** La primera celda de cada fila es su encabezado. */
  rows: { _key: string; cells: string[] }[];
  /** Fuente o nota al pie de la tabla. */
  note?: Block[];
};
export type DataSection = Shared & {
  _type: "data";
  /** Rótulo de la sección (Doto 31). */
  title?: string;
  body?: Block[];
  /** Enlace a los datos; se pinta al final del último párrafo de `body`. */
  link?: { label: string; url: string };
  chart?: DataChart;
  table?: DataTable;
};
/**
 * Línea de tiempo de pasos (¿Cómo lo hicimos?). Cada paso es un pequeño lienzo de collage que empieza en su punto
 * y termina en el punto del paso siguiente; el componente dibuja la línea vertical, los puntos y el título de cada paso.
 */
export type TimelineSection = Shared & {
  _type: "timeline";
  /** Encabezado de la sección (solo para lectores de pantalla; en el diseño no se ve). */
  title?: string;
  band?: Band;
  /** Tramas de puntos magenta detrás de los pasos; filas contadas desde el borde superior de la sección. */
  dots?: Place[];
  steps: {
    _key: string;
    /** Título del paso, junto al punto. */
    title: string;
    /** Alto del paso en unidades de retícula (de su punto al punto siguiente). */
    rows: number;
    /** Elementos del lienzo; la fila 1 es la del punto y el título. */
    items: CanvasItem[];
  }[];
};

export type Section =
  | CollageSection | HeroSection | CardGridSection | VideoSection | VideoListSection | MapSection
  | GallerySection | BitacoraSection | GameEmbedSection | PeopleSection | ControlsSection | DataSection | TimelineSection;

// ---------- Documentos ----------

export type Seo = { title?: string; description?: string; ogImage?: Img; noindex?: boolean };

export type Page = {
  _type: "page";
  _id: string;
  title: string;
  slug: { current: string }; // "" para Inicio
  /** `display`: titular grande + "LAB." (Inicio). `small`: titular de 30 px sobre el hero. `none`: solo MENÚ. */
  header: "display" | "small" | "none";
  /** Color de MENÚ y del cuadrito cuando van sobre la foto del hero. */
  menuTone?: Tone;
  /** Color de la franja del footer en esta página. */
  footerTone?: Tone;
  /** Paso de la trama de puntos del fondo: `fino` (Inicio) o `amplio` (interiores). */
  dots?: "fino" | "amplio";
  seo?: Seo;
  sections: Section[];
};

export type Settings = {
  _type: "settings";
  _id: "settings";
  siteName: string;
  siteUrl: string;
  /** Titular del header ("ciudad y cuerpo", con la "y" en itálica). */
  headerTitle: Span[];
  brandLabel: string; // "LAB."
  menuLabel: string; // "MENÚ"
  menu: { _key: string; label: string; href: string }[];
  footer: { credit: string; tone: Tone; logos: { _key: string; image: Img; url?: string }[] };
  seo: { title: string; description: string; ogImage?: Img };
  labels: Record<"menu" | "openMenu" | "closeMenu" | "skip" | "play" | "pending" | "prev" | "next" | "close" | "home", string>;
};

export type Content = { settings: Settings; pages: Page[] };
