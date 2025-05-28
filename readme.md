# Town Kitchen APIs (Fullstack)

Este repositorio contiene el frontend (React) y el backend (Node.js + MongoDB) de la aplicación "Town Kitchen Menu", orquestados con Docker Compose.

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

* **Frontend**: documentación de Vite, React, MUI y Tailwind.
* **Backend**: Express y Mongoose.
* **Dockers**: consulta la configuración en `docker-compose.yml` y los Dockerfiles en cada carpeta.
