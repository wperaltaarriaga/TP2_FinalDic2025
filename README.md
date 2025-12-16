# TP2_FinalDic2025
# Proyecto Stock API

# Proyecto Stock API

## Descripción
Este proyecto es una API RESTful construida con Node.js, Express y MongoDB. Proporciona endpoints para la gestión de productos y álbumes, incluyendo autenticación con JWT.

## Requisitos
- Node.js >= 14.0.0
- npm >= 6.0.0
- MongoDB

## Instalación
1. Clona este repositorio:
   ```bash
   git clone <Uhttps://github.com/wperaltaarriaga/TP2_FinalDic2025>

2. Navega el directorio del proyecto
    cd TP2_FinalDic2025

3. Instala las dependencias:
    npm install

4. Crea un archivo .env en la raíz del proyecto con las siguientes variables:

MONGO_URI=<TU_URI_DE_MONGODB>
DATABASE=ort-database
SERVER_PORT=3003
SERVER_HOST=localhost
JWT_SECRET=<TU_SECRETO_JWT>

## Endpoints principales
Productos: 

POST /api/v1/productos: Crear un producto.
GET /api/v1/productos: Listar todos los productos.
GET /api/v1/productos/:id: Obtener un producto por ID.
PUT /api/v1/productos/:id: Actualizar un producto (requiere autenticación).
DELETE /api/v1/productos/:id: Eliminar un producto (requiere autenticación).

Álbumes:

GET /api/v1/albums/csv: Generar y descargar un archivo CSV con los primeros 15 álbumes.


## Cómo obtener el token JWT

Para utilizar esta API, es necesario autenticarse y obtener un token JWT. Sigue los pasos a continuación:

1. **Registrar un nuevo usuario**  
   Envía una solicitud `POST` al endpoint `@host/api/user/create` con el siguiente cuerpo en formato JSON:

   {
     "username": "tu-nombre-de-usuario",
     "password": "tu-contraseña"
   }

2. **Iniciar sesión**
    Envía una solicitud `POST` al endpoint `@host/api/user/login` con el mismo cuerpo en formato JSON:

    {
     "username": "tu-nombre-de-usuario",
     "password": "tu-contraseña"
    }

3. **Recibir el token JWT**
    La respuesta incluirá un token JWT. Este token debe ser utilizado para acceder a los endpoints protegidos de la API.

4. **Usar el token en las solicitudes**
    Incluye el token en el encabezado Authorization de tus solicitudes de la siguiente manera:

    Authorization: Bearer tu-token-jwt