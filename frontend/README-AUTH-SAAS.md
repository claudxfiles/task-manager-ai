# Configuración de Autenticación con Google para SoulDream SaaS

Este documento explica cómo configurar la autenticación con Google para el servicio SaaS SoulDream.

## Configuración para Administradores del Servicio

Como administrador del servicio SaaS, debes configurar las credenciales de Google OAuth para todos los usuarios. Los usuarios finales no necesitan configurar sus propias credenciales.

### 1. Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto para SoulDream
3. Anota el ID del proyecto

### 2. Configurar la Pantalla de Consentimiento OAuth

1. En el menú lateral, ve a "APIs y Servicios" > "Pantalla de consentimiento de OAuth"
2. Selecciona "Externo" como tipo de usuario (para permitir que cualquier usuario de Google pueda iniciar sesión)
3. Completa la información requerida:
   - Nombre de la aplicación: "SoulDream"
   - Correo electrónico de soporte: tu correo de soporte
   - Dominio autorizado: tu dominio de producción (ej. souldream.ai)
   - Enlaces a la política de privacidad y términos de servicio
4. En la sección de permisos, añade los siguientes scopes:
   - `email`
   - `profile`
   - `openid`
5. Guarda y publica la aplicación

### 3. Crear Credenciales OAuth

1. En el menú lateral, ve a "APIs y Servicios" > "Credenciales"
2. Haz clic en "Crear Credenciales" > "ID de cliente de OAuth"
3. Selecciona "Aplicación Web" como tipo de aplicación
4. Asigna un nombre a tu cliente OAuth (por ejemplo, "SoulDream Web Client")
5. Añade los URIs de redirección autorizados:
   - Para desarrollo: `http://localhost:3000/api/auth/callback/google`
   - Para producción: `https://souldream.ai/api/auth/callback/google`
6. Haz clic en "Crear"
7. Guarda el ID de cliente y el secreto de cliente que se generan

### 4. Configurar Variables de Entorno

#### Desarrollo Local

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_seguro_para_nextauth

# Google OAuth (Credenciales del servicio SaaS)
GOOGLE_CLIENT_ID=tu_client_id_de_google
GOOGLE_CLIENT_SECRET=tu_client_secret_de_google
```

#### Producción

Configura las siguientes variables de entorno en tu proveedor de hosting (Vercel, Netlify, etc.):

```
NEXTAUTH_URL=https://souldream.ai
NEXTAUTH_SECRET=tu_secreto_seguro_para_nextauth

GOOGLE_CLIENT_ID=tu_client_id_de_google
GOOGLE_CLIENT_SECRET=tu_client_secret_de_google
```

### 5. Generar un Secreto Seguro para NextAuth

Puedes generar un secreto seguro para `NEXTAUTH_SECRET` utilizando el siguiente comando:

```bash
openssl rand -base64 32
```

## Mantenimiento y Seguridad

### Rotación de Credenciales

Es recomendable rotar las credenciales de Google OAuth periódicamente:

1. Crea nuevas credenciales en Google Cloud Console
2. Actualiza las variables de entorno en tu entorno de producción
3. Revoca las credenciales antiguas después de confirmar que las nuevas funcionan correctamente

### Monitoreo

Configura alertas para detectar problemas de autenticación:

1. Implementa un sistema de registro para errores de autenticación
2. Configura alertas para notificar al equipo de soporte cuando ocurran errores frecuentes
3. Monitorea el uso de la API de Google OAuth para detectar patrones inusuales

## Solución de Problemas Comunes

### Error: "client_id is required"

Este error ocurre cuando las variables de entorno `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` no están configuradas correctamente. Asegúrate de:

1. Haber configurado correctamente las variables de entorno
2. Reiniciar el servidor después de actualizar las variables de entorno
3. Verificar que no haya espacios o caracteres especiales en los valores

### Error: "Error de Redirección"

Este error puede ocurrir si los URIs de redirección no están configurados correctamente en Google Cloud Console. Asegúrate de:

1. Haber añadido el URI de redirección exacto en Google Cloud Console
2. Verificar que `NEXTAUTH_URL` esté configurado correctamente

## Recursos Adicionales

- [Documentación de NextAuth.js](https://next-auth.js.org/providers/google)
- [Documentación de Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/) 