# TP2_FinalDic2025
# Proyecto Stock API

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