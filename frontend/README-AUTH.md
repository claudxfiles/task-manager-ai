# Configuración de Autenticación con Google

Este documento explica cómo configurar la autenticación con Google en la aplicación SoulDream.

## Requisitos Previos

1. Una cuenta de Google
2. Acceso a [Google Cloud Console](https://console.cloud.google.com/)

## Pasos para Configurar Google OAuth

### 1. Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el ID del proyecto, lo necesitarás más adelante

### 2. Configurar la Pantalla de Consentimiento OAuth

1. En el menú lateral, ve a "APIs y Servicios" > "Pantalla de consentimiento de OAuth"
2. Selecciona el tipo de usuario (Externo o Interno)
3. Completa la información requerida:
   - Nombre de la aplicación: "SoulDream"
   - Correo electrónico de soporte
   - Dominio autorizado (tu dominio de producción)
   - Enlaces a la política de privacidad y términos de servicio
4. Guarda y continúa

### 3. Crear Credenciales OAuth

1. En el menú lateral, ve a "APIs y Servicios" > "Credenciales"
2. Haz clic en "Crear Credenciales" > "ID de cliente de OAuth"
3. Selecciona "Aplicación Web" como tipo de aplicación
4. Asigna un nombre a tu cliente OAuth (por ejemplo, "SoulDream Web Client")
5. Añade los URIs de redirección autorizados:
   - Para desarrollo local: `http://localhost:3000/api/auth/callback/google`
   - Para producción: `https://tu-dominio.com/api/auth/callback/google`
6. Haz clic en "Crear"
7. Guarda el ID de cliente y el secreto de cliente que se generan

### 4. Configurar Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Actualiza las siguientes variables con tus credenciales:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_seguro_para_nextauth

GOOGLE_CLIENT_ID=tu_client_id_de_google
GOOGLE_CLIENT_SECRET=tu_client_secret_de_google
```

Para producción, asegúrate de actualizar `NEXTAUTH_URL` con tu dominio de producción.

### 5. Generar un Secreto Seguro para NextAuth

Puedes generar un secreto seguro para `NEXTAUTH_SECRET` utilizando el siguiente comando:

```bash
openssl rand -base64 32
```

## Verificación

Para verificar que la autenticación con Google está funcionando correctamente:

1. Inicia el servidor de desarrollo: `npm run dev`
2. Navega a `http://localhost:3000`
3. Haz clic en "Comienza Gratis con Google" o "Iniciar Sesión con Google"
4. Deberías ser redirigido a la pantalla de inicio de sesión de Google
5. Después de iniciar sesión, deberías ser redirigido de vuelta a la aplicación

## Solución de Problemas

### Error: "client_id is required"

Este error ocurre cuando las variables de entorno `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` no están configuradas correctamente. Asegúrate de:

1. Haber creado el archivo `.env.local` en la raíz del proyecto
2. Haber copiado correctamente el ID de cliente y el secreto de cliente de Google Cloud Console
3. Reiniciar el servidor de desarrollo después de actualizar las variables de entorno

### Error: "Error de Redirección"

Este error puede ocurrir si los URIs de redirección no están configurados correctamente en Google Cloud Console. Asegúrate de:

1. Haber añadido `http://localhost:3000/api/auth/callback/google` como URI de redirección autorizado para desarrollo local
2. Haber añadido `https://tu-dominio.com/api/auth/callback/google` como URI de redirección autorizado para producción

## Recursos Adicionales

- [Documentación de NextAuth.js](https://next-auth.js.org/providers/google)
- [Documentación de Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/) 