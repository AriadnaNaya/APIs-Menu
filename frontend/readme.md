# Town Kitchen - Frontend

Aplicación web moderna desarrollada con React y Vite para el sistema de menú digital del restaurante Town Kitchen. Incluye gestión de menú, reseñas y sistema de autenticación.

## 🆕 Novedades y mejoras 

- **Modo claro/oscuro** con paleta moderna y coherente.
- **Cards y modales** con imágenes siempre proporcionadas y diseño atractivo.
- **Carrusel superior** rectangular, sin bordes redondeados y con imágenes bien proporcionadas.
- **Gestión admin**:
  - CRUD de platos (menú) y variantes.
  - CRUD de usuarios/clientes (agregar, editar, eliminar).
  - Panel de control exclusivo para admin.
- **Responsividad real** en todas las vistas y componentes.
- **Limpieza de code smells** y mejoras de legibilidad.

## 🚀 Tecnologías

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **Vite** - Herramienta de build rápida para desarrollo frontend
- **Material-UI (MUI)** - Biblioteca de componentes React
- **Tailwind CSS** - Framework de CSS utility-first
- **React Router DOM** - Enrutamiento para aplicaciones React
- **React Slick** - Componente de carrusel/slider
- **Emotion** - Librería de CSS-in-JS

## 📁 Estructura del proyecto

```
frontend/
├── public/                 # Archivos estáticos
│   ├── images/            # Imágenes del proyecto
│   └── favicon.ico
├── src/                   # Código fuente
│   ├── components/        # Componentes reutilizables
│   │   ├── home/         # Componentes específicos del home
│   │   ├── Header.jsx    # Barra de navegación
│   │   ├── Footer.jsx    # Pie de página
│   │   ├── HeroSlider.jsx # Slider principal
│   │   ├── MenuList.jsx  # Lista de elementos del menú
│   │   ├── MenuItemCard.jsx # Tarjeta individual de plato
│   │   ├── MealDetailModal.jsx # Modal de detalles del plato
│   │   └── BackToTop.jsx # Botón de volver arriba
│   ├── pages/            # Páginas principales
│   │   ├── Home.jsx      # Página principal
│   │   ├── Menu.jsx      # Página del menú
│   │   ├── Login.jsx     # Página de inicio de sesión
│   │   ├── Register.jsx  # Página de registro
│   │   ├── Profile.jsx   # Perfil de usuario
│   │   ├── Reserva.jsx   # Página de reservas
│   │   ├── MyReservations.jsx # Mis reservas
│   │   ├── ReviewForm.jsx # Formulario de reseñas
│   │   ├── MyReviews.jsx # Mis reseñas
│   │   ├── AdminPanel.jsx # Panel de administración
│   │   └── About.jsx     # Página acerca de
│   ├── context/          # Contextos de React
│   │   └── AuthContext.jsx # Contexto de autenticación
│   ├── utils/            # Utilidades y helpers
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   ├── theme.js          # Configuración de tema MUI
│   └── index.css         # Estilos globales
├── index.html            # Plantilla HTML principal
├── vite.config.js        # Configuración de Vite
├── tailwind.config.cjs   # Configuración de Tailwind
├── postcss.config.cjs    # Configuración de PostCSS
├── package.json          # Dependencias y scripts
├── nginx.conf            # Configuración de Nginx para Docker
└── Dockerfile            # Configuración de Docker
```

## 🎨 Características

### 🏠 Página Principal
- Hero slider con imágenes del restaurante
- Navegación intuitiva
- Diseño responsive

### 🍽️ Sistema de Menú
- Visualización de platos agrupados por categorías
- Filtrado por nombre, categoría y precio
- Modal con detalles completos de cada plato
- Imágenes optimizadas y diseño atractivo

### 👤 Sistema de Usuarios
- Registro e inicio de sesión
- Perfil de usuario editable
- Autenticación con JWT
- Roles de usuario (user/admin)

### ⭐ Sistema de Reseñas
- Crear reseñas con calificación de 1-5 estrellas
- Ver todas las reseñas del restaurante
- Gestionar mis reseñas

### 🔧 Panel de Administración
- Gestión del menú (CRUD completo)
- Gestión de usuarios/clientes (CRUD completo, incluyendo agregar usuario)
- Vista de todas las reservas
- Herramientas administrativas

## 🛠️ Instalación y desarrollo

### Con Docker

```bash
# Desde la raíz del proyecto
docker-compose up --build
```
  La aplicación estará disponible en `http://localhost:3000`


## 🔧 Configuración


### Tema personalizado
El archivo `theme.js` contiene la configuración del tema de Material-UI con colores personalizados para el restaurante.

### Tailwind CSS
Configurado para trabajar junto con Material-UI, proporcionando utilidades adicionales de CSS.

## 🎨 Componentes principales

### Header.jsx
- Barra de navegación responsiva
- Menú hamburguesa para móviles
- Links de autenticación dinámicos
- Logo y branding del restaurante

### HeroSlider.jsx
- Carrusel de imágenes principal
- Transiciones suaves
- Navegación por puntos
- Autoplay configurable

### MenuItemCard.jsx
- Tarjeta de producto individual
- Imagen, nombre, descripción y precio
- Botón de ver detalles
- Diseño responsive

### MealDetailModal.jsx
- Modal con información completa del plato
- Galería de imágenes
- Variantes disponibles
- Información nutricional

## 🔒 Autenticación

### Contexto de autenticación
- Estado global del usuario
- Funciones de login/logout
- Protección de rutas
- Persistencia en localStorage

### Rutas protegidas
Algunas páginas requieren autenticación:
- Perfil de usuario
- Crear reservas
- Panel de administración
- Mis reseñas y reservas

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

Utiliza breakpoints de Tailwind y Material-UI para garantizar una experiencia óptima en todos los dispositivos.

## 🎯 Funcionalidades por página

### Home (`/`)
- Hero slider con imágenes destacadas
- Navegación a secciones principales
- Información básica del restaurante

### Menu (`/menu`)
- Lista completa de platos
- Filtros por categoría y precio
- Búsqueda por nombre
- Vista agrupada por categorías

### Login/Register (`/login`, `/register`)
- Formularios de autenticación
- Validación de campos
- Manejo de errores
- Redirección automática

### Profile (`/profile`)
- Información del usuario
- Edición de datos personales
- Cambio de contraseña
- Avatar personalizable

### Reviews (`/reviews`, `/my-reviews`)
- Formulario de nueva reseña
- Sistema de calificación con estrellas
- Lista de reseñas propias
- Vista de todas las reseñas

### Admin Panel (`/admin`)
- CRUD completo del menú
- Gestión de categorías
- CRUD de usuarios/clientes (agregar, editar, eliminar)
- Vista de reservas
- Herramientas administrativas

## 🔧 Personalización

### Colores y tema
Modificar `src/theme.js` para cambiar la paleta de colores:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Marrón principal
    },
    secondary: {
      main: '#D2691E', // Naranja
    }
  }
});
```

### Estilos globales
Editar `src/index.css` para modificar estilos base y variables CSS.

### Configuración de Tailwind
Modificar `tailwind.config.cjs` para agregar colores, fuentes o utilidades personalizadas.

## 🐛 Troubleshooting

### Error de conexión con el backend
```
Failed to fetch API data
```
**Solución**: Verificar que el backend esté ejecutándose en `http://localhost:5000` y que el proxy esté configurado correctamente.

### Problemas con imágenes
```
Image not loading
```
**Solución**: Verificar que las imágenes estén en la carpeta `public/images/` y que las rutas sean correctas.

### Error de autenticación
```
Token expired or invalid
```
**Solución**: Hacer logout y login nuevamente para obtener un nuevo token JWT.

### Problemas de build
```
Build failed with Vite
```
**Solución**: Limpiar `node_modules` y reinstalar dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Recursos adicionales

- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Material-UI Documentation](https://mui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/)

## 📝 Notas de uso

- El **admin** puede agregar, editar y eliminar tanto platos como usuarios/clientes desde el panel de administración.
- El **modo claro/oscuro** se puede alternar desde el header y afecta toda la app.
- Todas las imágenes y cards mantienen proporciones y diseño moderno.

Para detalles de endpoints y backend, revisa el README correspondiente.
