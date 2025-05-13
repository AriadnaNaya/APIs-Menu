# Sushi Town Menu

## Descripción 

**Sushi Town Menu** es una aplicación web de una sola página (SPA) que muestra el menú de un restaurante de sushi de forma interactiva. Permite:

* Navegar entre diferentes categorías (sushi & rolls, comida, bebidas, postres) usando query params (`?category=`).
* Mostrar cada plato como una card con imagen, nombre y precio.
* Filtrar el menú por categoría o subcategoría.
* Ver detalles de cada plato en un modal con animaciones y navegación "Anterior/Siguiente".
* Incorpora un slider hero en la parte superior para destacar ofertas o imágenes.

Esta SPA está construida con **React**, **React Router**, **Material UI** y **Tailwind CSS**, y empacada con **Vite**.

---

## Estructura de carpetas y archivos

```
project-root/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSlider.jsx
│   │   ├── MenuList.jsx
│   │   ├── MenuItemCard.jsx
│   │   └── MealDetailModal.jsx
│   ├── pages/
│   │   └── Menu.jsx
│   ├── data/
│   │   ├── data.js
│   │   └── menuData.js
│   ├── utils/
│   │   ├── formatTitle.js
│   │   └── grupoCategorias.js
│   ├── hooks/
│   │   └── useMobile.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
└── vite.config.js
```

---

## Tecnologías usadas

* **React**: Biblioteca principal para construir la UI.
* **React Router**: Manejo de rutas y parámetros de consulta (<BrowserRouter>, <Routes>, <Route>, useSearchParams).
* **Material UI (MUI)**: Componentes listos para UI (AppBar, Toolbar, Accordion, Dialog, Buttons, etc.) y theming.
* **Tailwind CSS**: Estilos utilitarios para casos globales y responsive.
* **Vite**: Bundler ultrarrápido para desarrollo local y build.
* **PostCSS**: Procesador de CSS para Tailwind.

---

## Páginas

### `Menu`

* Renderiza el componente `Menu.jsx`.
* Lee `?category=` de la URL con `useSearchParams`.
* Muestra el menú completo, un grupo de categorías o una lista filtrada según el parámetro:

    * **showAll**: Si no hay `category`, muestra todas las categorías en acordeones.
    * **isGroup**: Si `category` coincide con un grupo padre, muestra los acordeones de esa sección.

---

## Componentes principales

### `Header.jsx`

* Barra de navegación superior.
* En desktop: logo a la izquierda, links al centro, dirección a la derecha.
* En móvil: ícono de hamburguesa que abre un `Drawer` con los mismos enlaces.
* **Links** apuntan a `/menu?category=…` para filtrar por categoría.

### `Footer.jsx`

* Pie de página con:

    * Contacto (dirección, teléfono, horarios).
    * Enlaces a redes sociales (Instagram, Facebook).
    * Mapa embebido de Google Maps.
    * Copyright dinámico.

### `HeroSlider.jsx`

* Slider o carrusel de imágenes en la cabecera.
* Destaca ofertas o imágenes representativas.

### `MenuList.jsx`

* Recibe `meals` (array de platos) y `onMealClick`.
* Renderiza un grid/responsive de `MenuItemCard`.

### `MenuItemCard.jsx`

* Tarjeta de cada plato:

    * Imagen recortada (`object-fit: cover`).
    * Nombre y precio formateado en ARS.
    * Descripción truncada a 2 líneas.
    * Hover con escala y sombra.
* `onClick` dispara `onToggle` para abrir el modal.

### `MealDetailModal.jsx`

* Modal centrado con detalles del plato:

    * Imagen completa (`object-fit: contain`).
    * Precio, descripción y lista de variantes (si existen).
    * Botones "Anterior" y "Siguiente" con animación `Fade`.
* Controla su propia animación refrescando `fadeKey` en cada cambio de plato.

---

## Módulos de datos y utilidades

### `data.js`

* Array plano con objetos de cada plato:

  ```js
  { nombre, img, descripcion, precio?, variantes?:[], tipo }
  ```

### `menuData.js`

* Agrupa `data` por `tipo` con `reduce`:

  ```js
  { townKitchen: [...], sushiCombinado: [...], ... }
  ```

### `formatTitle.js`

* Función para convertir claves (`sushi-rolls`, `townKitchen`) en títulos legibles.

### `grupoCategorias.js`

* Define qué sub-tipos pertenecen a cada grupo padre:

  ```js
  { 'sushi-rolls': ['rolls','sushiCombinado',...], comida: [...], ... }
  ```

### `useMobile.js`

* Hook que usa `useTheme` y `useMediaQuery` de MUI para detectar pantallas pequeñas.

---

## Puntos de entrada y configuración

* **`main.jsx`**: Monta React, `BrowserRouter` y `ThemeProvider`, e importa `index.css`.
* **`App.jsx`**: Define rutas:

  ```jsx
  <Routes>
    <Route path="/" element={<Menu />} />
    <Route path="/menu" element={<Menu />} />
  </Routes>
  ```
* **`index.html`**: HTML base con `div#root`.
* **`index.css`**: Importa fuentes, configurar Tailwind base/utilities y estilos globales.
* **`vite.config.js`**, **`postcss.config.cjs`**, **`tailwind.config.cjs`**: Configuración del bundler, PostCSS y Tailwind.

---

## Ejecución del proyecto

1. Instalar dependencias:

   ```bash
   npm install
   ```
2. Ejecutar en modo desarrollo:

   ```bash
   npm run dev
   ```
3. Para build de producción:

   ```bash
   npm run build
   ```

---
