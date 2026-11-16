# Rueda Libre

Sitio web de alquiler de bicicletas en Medellín. El proyecto busca que el usuario pueda conocer la flota, consultar tarifas y reservar una bicicleta de forma fácil, y que descubra nuevas experiencias, como la ruta nocturna por la ciudad.

El ecosistema tiene dos productos que comparten la misma marca:

- **Sitio informativo (Bootstrap):** inicio, tarifas y reservas.
- **Landing de la ruta nocturna (Tailwind CSS):** planes, inscripción y modo oscuro.

## Enlaces publicados

| Producto | Enlace |
|---|---|
| Sitio informativo | https://laura-fracica.github.io/rueda_libre/ |
| Landing Rueda Nocturna | https://laura-fracica.github.io/rueda_libre/nocturna/ |
| Repositorio | https://github.com/laura-fracica/rueda_libre |

Desde cualquier página del sitio se llega a la landing con un clic en "Rueda Nocturna" (en la barra de navegación o en la cuarta diapositiva del carrusel). Desde la landing, el logo lleva al inicio del sitio y el botón "Reserva tu bici" lleva a la página de reservas.

## Páginas

| Página | Archivo | Contenido |
|---|---|---|
| Inicio | `index.html` | Carrusel de promociones, flota, rutas, cómo alquilar, beneficios y contacto |
| Tarifas | `paginas/tarifas.html` | Tarifas por hora y planes de recorridos |
| Reservas | `paginas/reservas.html` | Formulario de reserva con validación y políticas de alquiler |
| Landing Rueda Nocturna | `nocturna/index.html` | Rutas, planes, cómo funciona e inscripción |

La carpeta `nocturna/` también incluye una versión del sitio hecha solo con Tailwind (`inicio.html`, `tarifas.html` y `reservas.html`), la página de componentes (`componentes.html`) y el prototipo inicial (`prototipo.html`).

## Tecnologías

- HTML5 semántico
- Bootstrap 5.3.8 para el sitio informativo
- Tailwind CSS 4 para la landing, con `@theme` para la marca
- JavaScript sin librerías (menú, carrusel, validación y confirmación de la inscripción)
- Google Fonts: Montserrat para títulos y Open Sans para texto
- GitHub Pages para la publicación
- Validador W3C (Nu Html Checker) para revisar el HTML

## Marca compartida

Los dos productos usan los mismos valores. En el sitio están en `:root` de `css/styles.css`, y en la landing, en `@theme` de `nocturna/input.css`.

| Color | Valor |
|---|---|
| Verde Ruta | `#1F7A4D` |
| Naranja Pedal | `#F26B21` |
| Azul Noche | `#14213D` |
| Crema | `#FFF4E0` |
| Gris Asfalto | `#4A4F57` |
| Amarillo Farol | `#FFC83D` |

Los dos usan Montserrat y Open Sans, y los mismos datos de contacto en el pie: correo `holaruedalibre@gmail.com`, WhatsApp, horario de lunes a domingo de 8:00 a. m. a 8:00 p. m. y enlace al mapa.

## Capturas

**Landing en escritorio**

![Landing de Rueda Nocturna en escritorio](img/capturas/landing-escritorio.png)

**Landing en celular**

![Landing de Rueda Nocturna en celular](img/capturas/landing-celular.png)

**Landing en modo oscuro**

![Landing de Rueda Nocturna en modo oscuro](img/capturas/landing-oscuro.png)

## Recomendación de framework

Para este proyecto recomiendo usar los dos según el tipo de página:

- **Bootstrap** para el sitio informativo. Trae la barra de navegación, el carrusel, la ventana de políticas y la validación visual ya resueltos, y con pocas clases se obtiene un resultado consistente. Fue la opción más rápida para páginas con muchos componentes.
- **Tailwind CSS** para la landing. Permite un diseño propio, un modo oscuro con `dark:` y una hoja compilada de unos 30 KB con solo las clases usadas. El costo es que hay que escribir el comportamiento (menú, carrusel, ventanas) con JavaScript propio.

Si el proyecto crece y hay que elegir uno solo, elegiría Tailwind, porque la marca se define en un único `@theme` y no hay que sobrescribir estilos de un framework. A cambio hay que construir los componentes.

## Accesibilidad y calidad

- Atributo `lang="es"`, textos alternativos descriptivos, jerarquía de encabezados y enlace para saltar al contenido.
- Formularios con etiquetas asociadas, `fieldset` y `legend`, y validación nativa (`required`, `minlength`, `pattern`, `min` y `max`).
- Navegación completa con teclado y foco visible.
- Contraste de texto de al menos 4.5:1, en modo claro y oscuro en la landing.
- Diseño verificado en 360, 768 y 1280 px.
- Sin estilos en línea y con `nocturna/output.css` minificado.
- Sin errores en el validador del W3C en la landing y en la página de reservas.

## Estructura del proyecto

```
rueda_libre/
├── index.html
├── paginas/
│   ├── tarifas.html
│   └── reservas.html
├── css/
│   └── styles.css
├── nocturna/
│   ├── index.html
│   ├── inicio.html
│   ├── tarifas.html
│   ├── reservas.html
│   ├── componentes.html
│   ├── prototipo.html
│   ├── input.css
│   ├── output.css
│   └── js/
│       └── app.js
├── img/
│   └── capturas/
├── package.json
└── README.md
```

La carpeta `img/` contiene las imágenes del sitio y `img/bitacora.txt`, la bitácora del proyecto.

## Ejecutar en local

1. Clona el repositorio:

   ```
   git clone https://github.com/laura-fracica/rueda_libre.git
   ```

2. Abre `index.html` en el navegador, o usa la extensión Live Server de Visual Studio Code.

Se necesita conexión a internet para cargar las fuentes y Bootstrap.

## Modificar los estilos de Tailwind

`nocturna/output.css` se genera a partir de `nocturna/input.css` y de las clases usadas en `nocturna/`. Para regenerarlo después de cambiar clases:

```
npm install
npm run build
```

Con `npm run watch` se recompila al guardar.

## Aprendizajes

- Los atributos nativos de HTML (`required`, `minlength`, `pattern`, `min`, `max` y `step`) validan un formulario sin escribir JavaScript.
- Las rutas relativas cambian según la carpeta: `nocturna/index.html` desde la raíz y `../nocturna/index.html` desde `paginas/`.
- Una sola fuente de verdad para la marca (`:root` y `@theme`) evita que los productos se desalineen.
- Conviene medir el contraste y revisar el foco en modo claro y oscuro, no solo mirarlos.
- El validador del W3C encuentra errores que no se ven en pantalla.

## Autora

Laura Vanesa Fracica Sarmiento
