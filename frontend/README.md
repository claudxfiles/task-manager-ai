# Task Manager AI - Frontend

## Configuración de Google Calendar

Para integrar Google Calendar en la aplicación, sigue estos pasos:

1. Ve a la [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Calendar:
   - Ve a "APIs y servicios" > "Biblioteca"
   - Busca "Google Calendar API"
   - Haz clic en "Habilitar"

4. Configura las credenciales de OAuth:
   - Ve a "APIs y servicios" > "Credenciales"
   - Haz clic en "Crear credenciales" > "ID de cliente de OAuth"
   - Selecciona "Aplicación web"
   - Añade los URIs de redirección autorizados:
     - `http://localhost:3000/api/auth/callback/google` (desarrollo)
     - `https://tu-dominio.com/api/auth/callback/google` (producción)

5. Configura la pantalla de consentimiento:
   - Ve a "APIs y servicios" > "Pantalla de consentimiento de OAuth"
   - Selecciona "Externo"
   - Completa la información requerida
   - Añade los siguientes scopes:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`

6. Copia las credenciales:
   - ID de cliente
   - Secreto de cliente

7. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env.local`
   - Completa las variables con tus credenciales:
     ```
     GOOGLE_CLIENT_ID=tu_client_id
     GOOGLE_CLIENT_SECRET=tu_client_secret
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=tu_secret_aleatorio
     ```

## Seguridad

- Las credenciales de OAuth se almacenan de forma segura en variables de entorno
- Los tokens de acceso se manejan del lado del servidor
- Solo se solicitan los permisos necesarios para la funcionalidad del calendario
- Los datos del usuario están protegidos y no se comparten con terceros

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Producción

```bash
# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
