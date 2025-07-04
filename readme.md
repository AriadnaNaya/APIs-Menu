# Town Kitchen APIs (Fullstack)

Este repositorio contiene el frontend (React) y el backend (Node.js + MongoDB) de la aplicación "Town Kitchen Menu", orquestados con Docker Compose.

---

## 📢 Cambios y funcionalidades destacadas 

- **✅ Carrusel de imágenes arreglado**: Se corrigieron las imágenes rotas del HeroSlider utilizando recursos locales en lugar de URLs externas.
- **🎨 Modo claro/oscuro** con diseño moderno y responsivo en todo el frontend.
- **👨‍💼 Gestión completa de admin**:
  - CRUD de platos (menú) y variantes con eliminación lógica.
  - CRUD de usuarios/clientes (solo admin).
  - Panel de control exclusivo para administradores.
- **🖼️ Carrusel superior** (HeroSlider) con imágenes locales optimizadas y bien proporcionadas.
- **📱 Diseño responsive** con imágenes y cards siempre bien proporcionadas.
- **📚 Documentación interactiva Swagger** accesible en `/api-docs` (backend).
- **🔧 Eliminación lógica** de elementos del menú para mantener históricos.
- **⭐ Sistema de reseñas** completo con gestión de comentarios y calificaciones.

---

## 🛠️ Tecnologías utilizadas

### Backend
- **Node.js** con **Express.js** (v4.18.2)
- **MongoDB** con **Mongoose** (v6.8.0) 
- **JWT** para autenticación (jsonwebtoken v9.0.0)
- **bcrypt** para encriptación de contraseñas (v5.1.0)
- **Swagger UI** para documentación de API (v4.6.3)
- **CORS** habilitado para requests cross-origin

### Frontend
- **React 18** con **Vite** como bundler
- **Material-UI (MUI)** v5.15.0 para componentes
- **Tailwind CSS** v3.2.4 para estilos
- **React Router DOM** v6.6.1 para navegación
- **React Slick** para carruseles y sliders
- **Luxon** para manejo de fechas

### Infraestructura
- **Docker** y **Docker Compose** para orquestación
- **Nginx** como servidor web para el frontend en producción

---

## 📁 Estructura del proyecto

```
APIs-Menu/                 # raíz del repositorio
├── docker-compose.yml     # orquesta contenedores Mongo, backend y frontend
│
├── backend/               # servicio Node.js + Express
│   ├── Dockerfile         # build e inicio del servidor
│   ├── package.json       # dependencias y scripts
│   ├── server.js          # configuración de Express y Mongoose
│   ├── swagger.yaml       # documentación OpenAPI 3.0
│   ├── models/            # esquemas de Mongoose
│   │   ├── Client.js      # modelo de usuarios/clientes
│   │   ├── MenuItem.js    # modelo de elementos del menú
│   │   └── Review.js      # modelo de reseñas
│   ├── routes/            # rutas REST de la API
│   │   ├── auth.js        # autenticación y gestión de usuarios
│   │   ├── menu.js        # gestión del menú
│   │   └── reviews.js     # sistema de reseñas
│   ├── middleware/        # middlewares de autenticación
│   │   ├── auth.js        # verificación de JWT
│   │   └── adminOnly.js   # restricción a administradores
│   ├── utils/             # utilidades y helpers
│   └── data/              # datos de seed y ejemplos
│
└── frontend/              # aplicación React con Vite
    ├── Dockerfile         # build con Node y serve con Nginx
    ├── package.json       # dependencias frontend
    ├── vite.config.js     # proxy de API para `/api/...`
    ├── tailwind.config.cjs # configuración de Tailwind
    ├── index.html         # plantilla HTML
    └── src/               # código fuente React
        ├── main.jsx       # punto de entrada
        ├── App.jsx        # componente principal
        ├── theme.js       # tema de Material-UI
        ├── components/    # componentes reutilizables
        ├── pages/         # páginas de la aplicación
        ├── context/       # contextos de React
        └── utils/         # utilidades frontend
```

---

## 🚀 Requisitos previos

* **Docker** (>= 20.x) y **Docker Compose** (>= 1.29.x) instalados y en el `PATH`.
* Puertos libres en tu máquina local:
    * **27017** para MongoDB
    * **5000** para el backend
    * **3000** para el frontend

> **Nota:** Si cambias estos puertos en el `docker-compose.yml`, ajusta los accesos en los siguientes pasos.

---

## ⚙️ Levantar la aplicación con Docker Compose

1. **Clona el repositorio** (si aún no lo tienes):

   ```bash
   git clone https://github.com/tu-usuario/APIs-Menu.git
   cd APIs-Menu
   ```

2. **Inicia todos los servicios**:

   ```bash
   docker-compose up --build
   ```

    * Esto descargará/buildará las imágenes y levantará:
        * **MongoDB** en `localhost:27017`
        * **Backend** en `localhost:5000`
        * **Frontend** (React + Nginx) en `localhost:3000`

3. **Verifica los logs** (opcional):

   ```bash
   # Logs combinados:
   docker-compose logs -f

   # O logs de un servicio en particular:
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

4. **Accede a la aplicación**:

    * **Frontend**: 👉 `http://localhost:3000`
    * **API Backend**: `http://localhost:5000/api`
    * **Documentación Swagger**: `http://localhost:5000/api-docs`

---

## 📚 API Endpoints principales

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Perfil del usuario actual
- `PUT /api/auth/me` - Actualizar perfil

### Gestión de usuarios (Solo Admin)
- `GET /api/auth/clients` - Listar todos los usuarios
- `PUT /api/auth/clients/:id` - Editar usuario
- `DELETE /api/auth/clients/:id` - Eliminar usuario

### Menú
- `GET /api/items` - Obtener elementos del menú (con filtros)
- `GET /api/items/grouped` - Obtener menú agrupado por categorías
- `GET /api/items/:id` - Obtener elemento específico
- `POST /api/items` - Crear nuevo elemento (Solo Admin)
- `PUT /api/items/:id` - Actualizar elemento (Solo Admin)
- `DELETE /api/items/:id` - Eliminación lógica (Solo Admin)

### Reseñas
- `GET /api/reviews` - Obtener todas las reseñas
- `POST /api/reviews` - Crear nueva reseña
- `GET /api/reviews/me` - Obtener mis reseñas

---

## 🛠️ Parar y eliminar contenedores

```bash
# Detener sin borrar datos
docker-compose down

# Parar y eliminar volumen de MongoDB (pierdes datos)
docker-compose down -v

# Reconstruir las imágenes
docker-compose up --build -d
```

---

## 🔍 Troubleshooting

* **Error de CORS**: el backend ya incluye `cors()`. Si persiste, revisa la URL de fetch en el frontend.
* **Frontend 404**: asegúrate de que el build se creó con éxito y que Nginx copia la carpeta `dist/`.
* **Mongo no arranca**: verifica permisos del volumen `mongo_data`.
* **PowerShell && error**: En Windows PowerShell, usa `;` en lugar de `&&`:
  ```powershell
  cd frontend; npm run dev
  ```
* **Imágenes rotas en carrusel**: Las imágenes ahora son locales (`/img/heroNuevo1.png`, etc.)

---

## 📝 Funcionalidades principales

### 👤 Para usuarios
- **Registro y autenticación** con JWT
- **Navegación del menú** con filtros por categoría y precio
- **Visualización detallada** de platos con variantes
- **Sistema de reseñas** para calificar la experiencia
- **Perfil personal** con gestión de datos

### 👨‍💼 Para administradores
- **Panel de control exclusivo** con gestión completa
- **CRUD de platos** con eliminación lógica para mantener históricos
- **Gestión de usuarios** (crear, editar, eliminar)
- **Control de variantes** de platos
- **Monitoreo de reseñas** del sistema

### 🎨 Características técnicas
- **Modo claro/oscuro** persistente
- **Diseño responsive** para todos los dispositivos
- **Carrusel de imágenes** optimizado con recursos locales
- **Documentación interactiva** con Swagger UI
- **Eliminación lógica** para mantener integridad de datos
- **Autenticación segura** con JWT y bcrypt

---

## 📖 Más información

- **Documentación completa de API**: Visita `http://localhost:5000/api-docs` una vez que la aplicación esté ejecutándose
- **Frontend**: Construido con React 18, Material-UI y Tailwind CSS
- **Backend**: Express.js con MongoDB y documentación OpenAPI 3.0
- **Deployment**: Configurado para Docker con nginx en producción

---

Para detalles específicos de implementación, revisa los archivos de configuración en cada carpeta y la documentación Swagger interactiva.
