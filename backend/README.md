# Town Kitchen - Backend API

API REST desarrollada con Node.js, Express y MongoDB para la aplicación Town Kitchen Menu.

## 🚀 Tecnologías

- **Node.js** (v18+)
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación por tokens
- **bcrypt** - Hash de contraseñas
- **CORS** - Cross-Origin Resource Sharing

## 📁 Estructura del proyecto

```
backend/
├── models/                 # Modelos de Mongoose
│   ├── Client.js          # Modelo de usuarios/clientes
│   ├── MenuItem.js        # Modelo de elementos del menú
│   ├── Reservation.js     # Modelo de reservaciones
│   └── Review.js          # Modelo de reseñas
├── routes/                # Rutas de la API
│   ├── auth.js           # Autenticación (login, register, profile)
│   ├── menu.js           # Gestión del menú
│   ├── reservations.js   # Sistema de reservaciones
│   └── reviews.js        # Sistema de reseñas
├── middleware/           # Middlewares personalizados
│   ├── auth.js          # Verificación de JWT
│   └── adminOnly.js     # Verificación de permisos de admin
├── utils/               # Utilidades
│   └── grupoCategorias.js
├── data/               # Datos de inicialización
├── server.js          # Configuración principal del servidor
├── seed.js           # Script para poblar la base de datos
├── seed-items.js     # Datos de ejemplo para el menú
├── package.json      # Dependencias y scripts
└── Dockerfile        # Configuración de Docker
```

## 🔧 Instalación y configuración

### Desarrollo local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Crear archivo `.env` en la raíz del backend:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/townkitchen
   JWT_SECRET=miSecretoMuySeguro123!
   ```

3. **Iniciar MongoDB:**
   ```bash
   # Con Docker
   docker run -d -p 27017:27017 --name mongo mongo:latest
   
   # O usar MongoDB local
   mongod
   ```

4. **Ejecutar el servidor:**
   ```bash
   # Desarrollo (con nodemon)
   npm run dev
   
   # Producción
   npm start
   ```

5. **Poblar la base de datos (opcional):**
   ```bash
   node seed.js
   node seed-items.js
   ```

### Con Docker

```bash
# Desde la raíz del proyecto
docker-compose up -d
```

## 📊 Base de datos

### Modelos

#### Client (Usuario)
```javascript
{
  name: String,          // Nombre del usuario
  contact: String,       // Email/teléfono (único)
  password: String,      // Hash de la contraseña
  avatar: String,        // URL del avatar
  role: String          // 'user' | 'admin'
}
```

#### MenuItem (Elemento del menú)
```javascript
{
  name: String,          // Nombre del plato
  description: String,   // Descripción
  price: Number,         // Precio
  image: String,         // URL de la imagen
  category: String,      // Categoría específica
  mainCategory: String,  // Categoría principal
  variants: [String],    // Variantes del plato
  isDeleted: Boolean,    // Eliminación lógica
  deletedBy: ObjectId,   // Usuario que eliminó
  deletedAt: Date        // Fecha de eliminación
}
```

#### Reservation (Reservación)
```javascript
{
  client: ObjectId,      // Referencia al cliente
  datetime: Date,        // Fecha y hora de la reserva
  people: Number,        // Número de personas
  state: String         // 'pending' | 'confirmed' | 'canceled'
}
```

#### Review (Reseña)
```javascript
{
  client: ObjectId,      // Referencia al cliente
  rating: Number,        // Calificación (1-5)
  comment: String,       // Comentario
  date: Date            // Fecha de la reseña
}
```

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación. Cada token tiene una duración de 24 horas.

### Headers requeridos para rutas protegidas:
```
Authorization: Bearer <token>
```

### Roles de usuario:
- **user**: Usuario regular (puede hacer reservas, reseñas, ver menú)
- **admin**: Administrador (puede gestionar el menú, ver todas las reservas)

## 🛣️ Endpoints de la API

### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Registro de usuario | No |
| POST | `/login` | Inicio de sesión | No |
| GET | `/me` | Perfil del usuario actual | Sí |
| PUT | `/me` | Actualizar perfil | Sí |

### Menú (`/api/items`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/` | Listar elementos del menú | No |
| GET | `/grouped` | Menú agrupado por categoría | No |
| GET | `/:id` | Obtener elemento específico | No |
| POST | `/` | Crear nuevo elemento | Admin |
| POST | `/bulk` | Crear múltiples elementos | Admin |
| PUT | `/:id` | Actualizar elemento | Admin |
| DELETE | `/:id` | Eliminar elemento (lógico) | Admin |

### Reservaciones (`/api/reservations`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/` | Listar todas las reservas | No |
| POST | `/` | Crear nueva reserva | Sí |
| GET | `/me` | Mis reservas | Sí |
| PATCH | `/:id/cancel` | Cancelar reserva | Sí |

### Reseñas (`/api/reviews`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/` | Listar todas las reseñas | No |
| POST | `/` | Crear nueva reseña | Sí |
| GET | `/me` | Mis reseñas | Sí |

## 📝 Ejemplos de uso

### Registro de usuario
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "contact": "juan@email.com",
    "password": "123456"
  }'
```

### Obtener menú agrupado
```bash
curl http://localhost:5000/api/items/grouped
```

### Crear reserva (requiere autenticación)
```bash
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "datetime": "2024-12-25T20:00:00Z",
    "people": 4
  }'
```

### Filtrar menú por precio
```bash
curl "http://localhost:5000/api/items?priceMin=10&priceMax=25"
```

## 🔍 Funcionalidades

### Filtros de menú
- **Por nombre**: `?name=pizza`
- **Por categoría**: `?category=principal`
- **Por categoría principal**: `?mainCategory=comidas`
- **Por rango de precios**: `?priceMin=10&priceMax=30`

### Eliminación lógica
Los elementos del menú no se eliminan físicamente de la base de datos. Se marcan como `isDeleted: true` junto con información de auditoría.

### Logging
Todas las operaciones importantes se registran en la consola con timestamps para facilitar el debugging y monitoreo.

## 🐛 Troubleshooting

### Error de conexión a MongoDB
```
Error MongoDB: MongoNetworkError: failed to connect to server
```
**Solución**: Verificar que MongoDB esté ejecutándose y la URI de conexión sea correcta.

### Error de token JWT
```
401 Unauthorized: Token inválido
```
**Solución**: Verificar que el token no haya expirado y esté correctamente formateado en el header Authorization.

### Error de permisos admin
```
403 Forbidden: Acceso denegado
```
**Solución**: Verificar que el usuario tenga role 'admin' para operaciones administrativas.

## 🚀 Deployment

### Variables de entorno para producción
```env
PORT=5000
MONGO_URI=mongodb://usuario:password@host:puerto/basedatos
JWT_SECRET=UnSecretoMuySeguroYComplejo123!
NODE_ENV=production
```

### Scripts disponibles
```bash
npm start          # Iniciar servidor
npm run dev        # Desarrollo con nodemon
npm run seed       # Poblar base de datos
```

## 📚 Documentación adicional

- [Swagger/OpenAPI Documentation](./swagger.yaml) - Documentación interactiva de la API
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/) - Información sobre JSON Web Tokens 