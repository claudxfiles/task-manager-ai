# Configuración de Google Identity Platform para SoulDream

Este documento explica cómo configurar Google Identity Platform para el servicio SaaS SoulDream.

## ¿Qué es Google Identity Platform?

Google Identity Platform es un servicio de autenticación de usuarios que permite a los desarrolladores agregar fácilmente el inicio de sesión a sus aplicaciones. Proporciona:

- Autenticación segura y fácil de usar
- Soporte para múltiples métodos de autenticación (Google, Facebook, correo electrónico, etc.)
- Integración con servicios de Google Cloud
- Componentes de UI predefinidos que simplifican la implementación

## Configuración para Administradores del Servicio

Como administrador del servicio SaaS, debes configurar Google Identity Platform para todos los usuarios. Los usuarios finales no necesitan configurar sus propias credenciales.

### 1. Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto para SoulDream
3. Anota el ID del proyecto

### 2. Habilitar Identity Platform

1. En el menú lateral, ve a "Identity Platform"
2. Haz clic en "Habilitar Identity Platform"
3. Configura los proveedores de identidad que deseas utilizar (Google, Facebook, etc.)

### 3. Configurar el Proveedor de Google

1. En la sección "Proveedores", haz clic en "Agregar proveedor"
2. Selecciona "Google" como proveedor
3. Configura el ID de cliente de OAuth y el secreto de cliente
   - Puedes crear estas credenciales en la sección "APIs y Servicios" > "Credenciales"
   - Asegúrate de agregar los dominios autorizados y las URLs de redirección

### 4. Configurar Variables de Entorno

#### Desarrollo Local

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
# Identity Platform (GCP)
NEXT_PUBLIC_GCP_API_KEY=tu_api_key_de_gcp
NEXT_PUBLIC_GCP_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_GCP_PROJECT_ID=tu_proyecto_id
```

#### Producción

Configura las siguientes variables de entorno en tu proveedor de hosting (Vercel, Netlify, etc.):

```
NEXT_PUBLIC_GCP_API_KEY=tu_api_key_de_gcp
NEXT_PUBLIC_GCP_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_GCP_PROJECT_ID=tu_proyecto_id
```

## Ventajas de Google Identity Platform

### 1. Seguridad Mejorada

- Autenticación de dos factores
- Protección contra ataques de fuerza bruta
- Detección de actividades sospechosas

### 2. Experiencia de Usuario Mejorada

- Inicio de sesión con un solo clic
- Múltiples opciones de autenticación
- Interfaz de usuario personalizable

### 3. Escalabilidad

- Soporte para millones de usuarios
- Alta disponibilidad
- Rendimiento global

### 4. Cumplimiento Normativo

- Cumplimiento con GDPR
- Cumplimiento con CCPA
- Auditorías de seguridad regulares

## Solución de Problemas Comunes

### Error: "API key not valid"

Este error ocurre cuando la clave API de Google Cloud no está configurada correctamente. Asegúrate de:

1. Haber copiado correctamente la clave API de Google Cloud Console
2. Haber habilitado Identity Platform en tu proyecto
3. Haber configurado correctamente los dominios autorizados

### Error: "Domain not authorized"

Este error ocurre cuando el dominio desde el que se realiza la solicitud no está autorizado. Asegúrate de:

1. Haber agregado el dominio a la lista de dominios autorizados en Google Cloud Console
2. Incluir tanto el dominio de desarrollo (localhost) como el de producción

## Recursos Adicionales

- [Documentación de Google Identity Platform](https://cloud.google.com/identity-platform/docs)
- [Documentación de Firebase Authentication](https://firebase.google.com/docs/auth)
- [Google Cloud Console](https://console.cloud.google.com/) 