# Town Kitchen APIs (Fullstack)

Este repositorio contiene el frontend (React) y el backend (Node.js + MongoDB) de la aplicación "Town Kitchen Menu", orquestados con Docker Compose.

---

## 📢 Cambios y funcionalidades destacadas (2024)

- **Modo claro/oscuro** con diseño moderno y responsivo en todo el frontend.
- **Gestión completa de admin**:
  - CRUD de platos (menú) y variantes.
  - CRUD de usuarios/clientes (solo admin).
  - Panel de control exclusivo para admin.
- **Carrusel superior** (HeroSlider) mejorado, rectangular y con imágenes proporcionadas.
- **Imágenes y cards** siempre bien proporcionadas y con estilos modernos.
- **Documentación interactiva Swagger** accesible en `/api-docs` (backend).
- **Limpieza de code smells** y mejoras de responsividad en todas las vistas.

---

## 📁 Estructura del proyecto

```
APIs/                      # raíz del repositorio
├── docker-compose.yml     # orquesta contenedores Mongo, backend y frontend
│
├── backend/               # servicio Node.js + Express
│   ├── Dockerfile         # build e inicio del servidor
│   ├── .env               # variables de entorno (no versionar credenciales)
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js          # configuración de Express y Mongoose
│   ├── models/            # esquemas de Mongoose
│   └── routes/            # rutas REST (/api/items)
│
└── frontend/              # aplicación React con Vite
    ├── Dockerfile         # build con Node y serve estáticos con Nginx
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js     # proxy de API para `/api/...`
    ├── postcss.config.cjs
    ├── tailwind.config.cjs
    ├── index.html         # plantilla HTML
    └── src/               # código fuente React
        ├── main.jsx
        ├── App.jsx
        ├── theme.js
        ├── index.css
        ├── utils/
        └── components/
```

---

## 🚀 Requisitos previos

* **Docker** (>= 20.x) y **Docker Compose** (>= 1.29.x) instalados y en el `PATH`.
* Puerto libre en tu máquina local:

    * **27017** para MongoDB
    * **5000** para el backend
    * **3000** para el frontend

> **Nota:** Si cambias estos puertos en el `docker-compose.yml`, ajusta los accesos en los siguientes pasos.

---

## ⚙️ Levantar la aplicación con Docker Compose

1. **Clona el repositorio** (si aún no lo tienes):

   ```bash
   git clone https://github.com/tu-usuario/APIs-Menu.git
   cd APIs-Menu/APIs
   ```

2. **Configura variables de entorno del backend**:

    * Duplica `backend/.env.example` como `backend/.env` y ajusta si fuera necesario:

      ```dotenv
      PORT=5000
      MONGO_URI=mongodb://mongo:27017/townkitchen
      ```

3. **Inicia todos los servicios**:

   ```bash
   docker-compose up -d
   ```

    * Esto descargará/buildará las imágenes y levantará:

        * **MongoDB** en `localhost:27017`
        * **Backend** en `localhost:5000`
        * **Frontend** (React + Nginx) en `localhost:3000`

4. **Verifica los logs** (opcional):

   ```bash
   # Logs combinados:
   docker-compose logs -f

   # O logs de un servicio en particular:
   docker-compose logs -f backend
   ```

5. **Accede a la aplicación**:

    * Navega a 👉 `http://localhost:3000` para ver el frontend.
    * Haz peticiones REST a `http://localhost:5000/api/items` para probar el backend.

---

## 🛠️ Parar y eliminar contenedores

```bash
# Detener sin borrar datos
docker-compose down

# Parar y eliminar volumen de MongoDB (pierdes datos)
docker-compose down -v
```

---

## 🔍 Troubleshooting

* **Error de CORS**: el backend ya incluye `cors()`. Si persiste, revisa la URL de fetch en `src/components/Menu.jsx` (`/api/items`).
* **Frontend 404**: asegúrate de que el build se creó con éxito y que Nginx copia la carpeta `dist/`.
* **Mongo no arranca**: verifica permisos del volumen `mongo_data`.

---

## 📖 Más información

- **Frontend**: documentación de Vite, React, MUI y Tailwind. 
  - Modo claro/oscuro, cards modernas, gestión admin, responsive real.
- **Backend**: Express y Mongoose.
  - Endpoints RESTful, gestión de usuarios y menú, documentación Swagger en `/api-docs`.
- **Dockers**: consulta la configuración en `docker-compose.yml` y los Dockerfiles en cada carpeta.

---

## 📝 Funcionalidades principales

- **Usuarios**: registro, login, perfil, reservas, reseñas.
- **Admin**: panel exclusivo, gestión de platos y usuarios, acceso restringido.
- **Menú**: visualización, filtrado, detalles y variantes.
- **Reservas**: crear, ver, cancelar (usuario y admin).
- **Reseñas**: crear, ver, gestionar propias.
- **Visual**: dark/light mode, imágenes proporcionadas, diseño moderno y responsivo.
- **Swagger**: documentación interactiva en `/api-docs`.

---

Para detalles específicos de frontend y backend, revisa los README en cada carpeta.
