# Sushi Town - Backend API

API REST desarrollada con Node.js, Express y MongoDB para la aplicación Sushi Town Menu.

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
│   └── Review.js          # Modelo de reseñas
├── routes/                # Rutas de la API
│   ├── auth.js           # Autenticación (login, register, profile)
│   ├── menu.js           # Gestión del menú
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

### Con Docker

```bash
# Desde la raíz del proyecto
docker-compose up --build
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
  variants: [{           // Variantes del plato
    name: String,        // Nombre de la variante
    price: Number        // Precio de la variante
  }],
  isDeleted: Boolean,    // Eliminación lógica
  deletedBy: ObjectId,   // Usuario que eliminó
  deletedAt: Date        // Fecha de eliminación
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
- **user**: Usuario regular (reseñas, ver menú)
- **admin**: Administrador (puede gestionar el menú, los usuarios y las reseñas)

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


### Reseñas (`/api/reviews`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/` | Listar todas las reseñas | No |
| POST | `/` | Crear nueva reseña | Sí |
| GET | `/me` | Mis reseñas | Sí |

### Usuarios/Clientes (`/api/auth/clients`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET    | `/clients`      | Listar todos los usuarios/clientes | Admin |
| POST   | `/clients`      | Crear nuevo usuario/cliente        | Admin |
| PUT    | `/clients/:id`  | Editar usuario/cliente             | Admin |
| DELETE | `/clients/:id`  | Eliminar usuario/cliente           | Admin |

> **Nota:** Solo el admin puede acceder a estos endpoints. El endpoint POST permite crear usuarios con nombre, contacto, avatar, rol y contraseña.

### Documentación interactiva

- Accede a la documentación Swagger en: `http://localhost:5000/api-docs`
- Puedes probar todos los endpoints y ver los esquemas de datos.

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



## 📚 Documentación adicional

- [Swagger/OpenAPI Documentation](./swagger.yaml) - Documentación interactiva de la API
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/) - Información sobre JSON Web Tokens

## 📝 Notas de uso

- El **admin** puede gestionar usuarios/clientes y platos desde el frontend y la API.
- La documentación Swagger está siempre disponible en `/api-docs`.
- Todos los endpoints de admin requieren autenticación y rol adecuado.

Para detalles de frontend y despliegue, revisa los README correspondientes. 