# Extracción de las cuatro referencias

Revisión en vivo el 17 de octubre de 2026. El sistema visual de CA27 se completó el 18 de octubre contra [ca27.netlify.app](https://ca27.netlify.app/). Figma (`HILLSONG-sites`, nodo `487:194`) no se pudo leer: el archivo pide permiso de edición. Sirve para reconstruir las versiones de CA27. No es permiso para copiar fotos, marcas, textos ni código de esos sitios. Lo que se toma es el sistema: orden de la página, tipo de movimiento e interacción.

## 0. Lo que el sitio de CA27 ya fija

Esto viste a las cuatro versiones. No es una quinta estructura.

- **Tipo.** Display: Neue Haas Grotesk Display Pro 65 Medium, peso 500. Botón: Neue Haas Grotesk Text Pro 75 Bold, peso 700. FAQ y pie: Helvetica 700. Tokens en `webs/shared/ca27.css` (`--display`, `--text`, `--ui`).
- **Firma.** Imagen, no fuente: `webs/shared/media/casa-abierta-script.webp`.
- **Color de interfaz.** Crema `#FFFAF6`, tinta `#0D1517`, arena `#F6EBDC`. Los campos azul, naranja y amarillo del PDF están dentro de `hero-bg.webp`, `lineup-bg.webp` y `banner.webp`, no como variables del CSS publicado.
- **Piezas.** En `webs/shared/media/`: logo HLN, ícono de pie, tira de nav, Obelisco, «10 años», script, tres fondos y `speaker-01.webp` … `speaker-11.webp`. Esas fotos de oradores en el hero van chicas, desenfocadas (`blur(1.5px)`) y sin nombre al lado. No asignar un apellido a un número de archivo.
- **Cinta del sitio.** `LUNA / DOOLEY / MENDEZ / lopez / clarke / mejÍas / RUI BOTO / hendroff / gillies / houghton`, con `text-transform: uppercase`. No trae a Douglas ni la línea «equipo local». La memoria del PDF sigue siendo la lista de trabajo; esta es la del sitio.
- **Copy de contacto que el deck no tenía.** `ventas.buenosaires@hillsong.com` y `@hillsongbuenosaires`. FAQ con tres preguntas y respuesta «pendiente de confirmar». El botón dice REGISTRATE y el `href` es `#`.

Las versiones actuales en `webs/` se parecen al cartel de CA27 puesto en una página. Estas referencias son otra cosa: cada una tiene un motor de scroll o de piezas, y el contenido vive dentro de ese motor.

## 1. Lando Norris — [landonorris.com](https://landonorris.com/)

Hecho por OFF+BRAND sobre Webflow. El motor es **Lenis** (scroll suave), **SplitType** (palabras que se parten para pintar una en otro color) y **Rive** (el casco, el menú, los botones y el pie no son CSS: son archivos de animación). Hay scroll horizontal pineado y cambios de tema del nav según la sección.

Es un sitio **vertical a propósito**. En horizontal chico aparece: «Please rotate your device. This is a vertical drive.»

### Orden real de la home

1. **Nav fija.** Pastilla lima «Store» arriba a la izquierda. Monograma LN + «LANDO NORRIS / MCLAREN F1 SINCE 2019» al centro. Hamburguesa arriba a la derecha, animada. El nav cambia de color al pasar de sección.
2. **Hero de un solo retrato a sangre**, de arriba abajo. Sobre la cabeza hay un casco de alambre (Rive). Hay un sticker gráfico sobre la cara. Abajo a la derecha, botón lima **«Tap to lock»**. Al activarlo pasa a **«Back to scroll»**: cambia la física del gesto (swipe fijado contra scroll libre), no es solo un snap de CSS.
3. **Next Race.** Módulo propio, con contorno y animación, no un párrafo. En la visita decía Austin GP.
4. **Cinta** «mclaren f1 since 2019» y la **firma en lima como imagen**, no como una fuente cursiva del sistema.
5. **Message from Lando.** Fondo verde muy oscuro. Foto chica. Titular enorme recortado por el borde. Abajo, el párrafo con dos o tres palabras en lima (`wins`, `legacy`). El resto del texto es del color del fondo, más apagado.
6. **Historia horizontal pineada.** El scroll vertical no baja: clava la pantalla y mueve una tira de fotos con fecha. Cada pieza es foto grande + lugar y año (Qatar 2024, FIA Prize Giving, Miami, Monaco, Britain, Battersea, gala, Barcelona, Austria, US). En el medio hay una cita con dos palabras enfatizadas: «It doesn’t matter *where* you start, it’s *how* you progress from there.»
7. **ON / TRACK** y **OFF / TRACK.** Dos bloques. La palabra se parte en dos líneas gigantes. Una línea de bajada. Cada bloque es un link a su página.
8. **Helmets / Hall of Fame.** Grilla de cascos. Cada uno tiene año, nombre y una imagen que se revela. Hay versión desktop y mobile del marco. En la visita: Season, Discoball, Dark Glitter, Porcelain, Japan, GIF, Dark Mode, Race, Las Vegas, Chrome, Beachball, Basketball, Silverstone, de 2019 a 2025.
9. **Store.** «World Drivers' Champion» + «Visit the store».
10. **Partners & campaigns.** Marquesina de logos.
11. **What’s up on socials.** TikTok, Instagram, YouTube, Twitch.
12. **Footer.** «Always / bringing / the / fight», palabra por palabra. Marquesina de logos, signup, legales, y un casco Rive de fondo.

### Lo que nuestra versión no tiene

Tenemos capítulos a pantalla y un cambio de imágenes al scrollear. Falta el nav, el lock como cambio de física, el módulo «próximo encuentro» como pieza, la historia horizontal pineada, las palabras iluminadas dentro de la frase, el catálogo (el equivalente a los cascos) y el pie con la frase partida.

## 2. La Joya — [lajoya-foods.com](https://lajoya-foods.com/)

Tienda Shopify, tema propio (Guillaume). No es una página de títulos enormes en negro. El hero es **un campo de color pleno** (verde en la visita) con el **monograma LAJOYA dibujado**, no una fuente de sistema. «Bueno» entra por la izquierda con una estrella. «de Verdad» entra por la derecha, en vertical, con una hoja. Esas dos piezas arrancan en `opacity: 0` y se animan.

### Orden real

1. **Header mínimo.** Dos rayas (menú), la palabra Tienda, el carrito con cantidad.
2. **Hero de color** con el monograma al centro y «Bueno / de Verdad» en los costados.
3. **Bloques `tile__block`**, uno tras otro, no una lista de filas:
   - foto a sangre
   - un producto solo, con el nombre repetido muchas veces como textura
   - otra foto
   - bloque de Instagram
   - video
   - otro producto solo
   - grilla de productos
   - marquesina «Nuestros productos Gourmet»
   - producto nuevo, con estrella y etiqueta
   - chefs, y el nombre de cada chef también está repetido
4. **Menú overlay** a pantalla, con las palabras partidas en máscaras (`splits__mask` / `splits__word`): Tienda, Sobre, Contacto, y abajo los legales. La palabra no aparece de golpe: sale de una máscara.
5. **Carrito** lateral con overlay, total y pagar. Se abre encima de la página.
6. **Footer** duplicado en estructura (desktop y mobile), con bordes gráficos y «Sitio por Guillaume».

El nombre repetido seis veces no es un adorno al lado del título. Es el título del producto. La foto del frasco es la otra mitad de la pieza.

### Lo que nuestra versión no tiene

Tenemos el nombre repetido y una marquesina, pero el hero no es el monograma sobre un campo de color, no hay máscaras de texto, no hay overlay de menú ni de carrito, y las piezas no se alternan (foto / ficha / video / grilla). En CA27 el «carrito» no corresponde. El equivalente es un panel que se abre: lineup, o reservar.

## 3. Gut Feeling — [gutfeeling.agency](https://gutfeeling.agency/)

Sitio propio, sin framework visible. El comportamiento está partido en archivos: `wall.js`, `reel.js`, `slingshot.js`, `hints.js`, `glide.js`, `picker.js`, `piano.js`, `sound.js`. No es un muro de fichas de texto. Es una **hoja de stickers** mezclada con casos.

### Orden real

1. **Nav.** Wordmark que vuelve arriba. «Play the reel · 1:41». Menú.
2. **Hero.** «You're only limited by your imagination.» Hay una pista de que se mueve: «psst. it moves.» El titular y una nota se pueden despegar.
3. **The wall.** «Drag anything. Nobody's keeping score.» Adentro conviven cosas distintas, cada una con cursor propio (`open`, `drag`, `play`, `meet`, `say hi`):
   - casos con foto, título y un número
   - stickers de prensa (una cita abre el artículo; arrastrar no abre)
   - logos de clientes
   - credenciales «HELLO my name is» con foto y rol
   - servicios
   - un disco que dice **Play the reel · 1:41 · plays right here**
   - una cinta de prensa que se puede frotar para los dos lados y tiene inercia
   - un bloque «The family»
   - la plancha entera de stickers de clientes
4. **Manifiesto** más abajo, no en lugar del muro: «The way we see it…», «Why Gut Feeling?», después «Say Hello» con el mail y un botón que lo copia.
5. **Footer** con páginas y redes.
6. **Easter egg.** «Grab Matt, pull back and let go.» Un personaje se estira y se suelta. Hay piano del fundador, sonido on/off, y **Trust your gut** que baraja el muro y elige un proyecto al azar. **Tidy up** lo ordena con FLIP: las piezas vuelan a su lugar y los stickers giran en el camino.

### Cómo se mueve de verdad

- En desktop, el click arrastra. En el teléfono hay que **mantener apretado** (~260 ms) para levantar. Si movés el dedo antes, es scroll, no drag.
- Al levantar hay un efecto de esquina despegada, una sombra y un sonido.
- Soltar no es un frenado lineal. Hay spring y, al ordenar, las piezas hacen FLIP (se mide dónde están, se reordena el DOM y se anima el salto).
- Una nota escrita a mano dice que se puede mover. Si lo movés, la nota cambia a «see? told you.» Si la página queda quieta unos segundos, un sticker da un saltito para invitarte.
- El reel no es un slideshow de imágenes. Es un **video** que crece desde el disco, se puede compartir (`/reel/`), recuerda en qué segundo quedó y, si el browser no lo toca solo, espera un tap.
- El cursor cambia la palabra según lo que hay debajo.

### Lo que nuestra versión no tiene

Tenemos fichas que se arrastran y un pase de imágenes. Falta la mezcla de tipos (caso, sticker, nombre, disco), el hold en mobile, el despegue, el reel como capa que crece desde el botón, la nota que enseña el gesto, el barajar, y el manifiesto recién después del muro.

Para CA27 no hay que inventar un Matt ni un piano. Sí hay que armar el muro con piezas distintas: oradores como credenciales, la frase del manifiesto como sticker, el disco de piezas, y el Obelisco como caso.

## 4. Meety — [meety-wcopilot.webflow.io](https://meety-wcopilot.webflow.io/)

Template de Webflow (jQuery + el JS de Webflow). No tiene Lenis, Rive ni física. El nivel está en que **cada bloque es un componente terminado**, con su slider, su menú y su estado.

### Orden real de Home 1

1. **Nav** con dropdown (Demos: Home 1, 2 y 3. Pages: About, Schedule, Workshops, Reviews, Speakers, blog, Contact). Menú hamburguesa en mobile.
2. **Banner.** Chip de fecha, ciudad, título, dos botones (tickets y read more), **cuenta regresiva** en cuatro cajas, y un **slider de fotos** de fondo.
3. **Welcome.** Texto a un lado, imagen al otro.
4. **Schedule.** Días con filas de horario. Hay ítems marcados «Done» y un botón Join Event por día.
5. **Workshops.** Lista numerada, cada una con título, texto y link.
6. **Testimonios.** Slider de Webflow: flechas, máscara, dots, cita, autor y foto. No es un texto que se reemplaza sin transición.
7. **Logos de clientes** en una franja.
8. **Speakers.** Grilla con foto, nombre y rol.
9. **Location.** Dirección, teléfono, mail, y fotos.
10. **Moments.** Grilla de fotos del evento, con filtros o categorías (Office, Event, Workshop, Conference).
11. **Hotels.** Cards con precio y «Learn more».
12. **Tweets / blog.** Tres notas con fecha e imagen.
13. **FAQ de contacto** en el pie del home: teléfono, mail, dirección, redes.
14. **Footer** de dos pisos: contacto, marca, links, copyright, crédito del template.

Las animaciones son las de Webflow: el menú abre, el slider cruza, los links subrayan, algunas cosas entran al scrollear. No es un sitio de scroll cinematográfico. Subirlo de nivel acá es completar componentes, no agregar más física.

### Lo que nuestra versión no tiene

Tenemos pestañas de días, una cuenta regresiva y una cita que cambia. Falta el slider de fondo, el dropdown, las filas de horario, el slider con flechas y dots, la franja de logos, la grilla de momentos con categorías y el footer de dos pisos. Los hoteles, tweets y testimonios de personas no existen en CA27: esos huecos se llenan con el manifiesto, las piezas del deck y el lugar, con la misma estructura de componente.

## Qué construir, y en qué orden

No seguir sumando detalles sobre las páginas actuales. Cada versión se rehace contra esta lista.

1. **Lando.** Nav fija, hero a sangre, lock que cambia el gesto, módulo de próximo encuentro, y una sección horizontal pineada con las piezas reales (páginas 5 a 10 y los PNG). Recién después, el catálogo de oradores y el pie.
2. **La Joya.** Hero de un solo color con el monograma CA27, «Casa» y «Abierta» entrando desde los costados, y después bloques alternados: pieza a sangre, ficha con el nombre repetido, video o foto, grilla. Menú en overlay con palabras en máscara.
3. **Gut Feeling.** Muro de verdad: stickers, credenciales de oradores, un disco que abre una capa, cinta que se frota, ordenar con salto, y una nota que enseña el gesto. El manifiesto queda debajo.
4. **Meety.** Componentes de template: banner con slider, schedule en filas, slider de frases, grilla de oradores, momentos, footer de dos pisos. Sin inventar hoteles ni testimonios.

La memoria de marca sigue en `MEMORIA.md`. Este archivo manda sobre cómo se mueve cada versión.
