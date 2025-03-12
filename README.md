# Task Manager AI

Un gestor de tareas moderno potenciado por Inteligencia Artificial, construido con FastAPI y Next.js.

## Características

- ✨ Interfaz moderna y responsive con Next.js y Tailwind CSS
- 🤖 Sugerencias de IA para optimizar tareas
- 📊 Tablero Kanban para gestión visual de tareas
- 🔒 Autenticación y autorización de usuarios
- 💳 Sistema de suscripción con Stripe
- 🚀 API RESTful con FastAPI
- 📝 Gestión completa de tareas (CRUD)

## Requisitos Previos

- Python 3.11 o superior
- Node.js 18 o superior
- Redis
- Cuenta de OpenRouter para IA
- Cuenta de Stripe para pagos

## Configuración del Entorno

1. **Backend (FastAPI)**

```bash
# Crear entorno virtual
conda create -n task-manager python=3.11
conda activate task-manager

# Instalar dependencias
cd backend
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

2. **Frontend (Next.js)**

```bash
# Instalar dependencias
cd frontend
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales
```

## Ejecutar el Proyecto

1. **Backend**

```bash
cd backend
uvicorn app.main:app --reload
```

2. **Frontend**

```bash
cd frontend
npm run dev
```

## Estructura del Proyecto

```
.
├── backend/
│   ├── app/
│   │   ├── models.py
│   │   ├── main.py
│   │   ├── auth.py
│   │   └── task_router.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── lib/
    │   └── types/
    ├── package.json
    └── tailwind.config.js
```

## API Endpoints

- `POST /register` - Registro de usuarios
- `POST /token` - Login de usuarios
- `POST /chat` - Interacción con IA
- `GET /tasks` - Listar tareas
- `POST /tasks` - Crear tarea
- `PUT /tasks/{id}` - Actualizar tarea
- `DELETE /tasks/{id}` - Eliminar tarea

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

[MIT](LICENSE) 