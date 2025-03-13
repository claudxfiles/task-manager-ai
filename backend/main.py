from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from openai import AsyncOpenAI
import asyncio
from dotenv import load_dotenv
import os
from datetime import datetime

# Cargar variables de entorno
load_dotenv()

app = FastAPI(
    title="AI Chat API",
    description="API para servicios de chat con IA",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in-progress"
    DONE = "done"

class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class Task(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    status: TaskStatus = TaskStatus.TODO
    priority: TaskPriority = TaskPriority.MEDIUM
    tags: List[str] = []
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())

# Almacenamiento temporal de tareas
tasks: List[Task] = []
task_counter = 1

# Modelo de datos para la solicitud
class ChatRequest(BaseModel):
    message: str
    model: str = "qwen/qwq-32b:online"

# Cliente OpenAI global
client = AsyncOpenAI(
    base_url=os.getenv("BASE_URL"),
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        print(f"Enviando mensaje: {request.message}")  # Debug
        print(f"Usando modelo: {request.model}")  # Debug
        print(f"API Key: {os.getenv('OPENROUTER_API_KEY')[:10]}...")  # Debug parcial de la API key
        
        completion = await client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "http://localhost:3001",  # Actualizado al puerto correcto
                "X-Title": "Task Manager AI",
            },
            model=request.model,
            messages=[
                {
                    "role": "system",
                    "content": "Eres un asistente de productividad que ayuda a las personas a alcanzar sus metas. Cuando sugieras tareas, formátealas así: 'TASK: [título de la tarea]\nDESCRIPTION: [descripción detallada]'"
                },
                {
                    "role": "user",
                    "content": request.message
                }
            ],
            temperature=0.7,
            stream=True,
            extra_body={
                "provider": {
                    "order": ["Groq","Fireworks"],
                    "allow_fallbacks": True  # Permitimos fallbacks por si acaso
                }
            }
        )
        
        response_text = ""
        try:
            async for chunk in completion:
                if chunk.choices[0].delta.content is not None:
                    response_text += chunk.choices[0].delta.content
                    print("Chunk recibido:", chunk.choices[0].delta.content[:50])  # Debug
        except Exception as stream_error:
            print(f"Error en el streaming: {str(stream_error)}")
            raise HTTPException(status_code=500, detail=f"Error en el streaming: {str(stream_error)}")
        
        print(f"Respuesta completa: {response_text[:100]}...")  # Debug
        return {"response": response_text}
    
    except Exception as e:
        error_detail = str(e)
        print(f"Error en el chat: {error_detail}")
        
        if "API key" in error_detail.lower():
            raise HTTPException(status_code=500, detail="Error de autenticación con OpenRouter. Verifica tu API key.")
        elif "model" in error_detail.lower():
            raise HTTPException(status_code=500, detail="Error con el modelo especificado. El modelo podría no estar disponible.")
        else:
            raise HTTPException(status_code=500, detail=f"Error en el chat: {error_detail}")

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Chat con IA"}

@app.get("/tasks", response_model=List[Task])
async def get_tasks():
    return tasks

@app.post("/tasks", response_model=Task)
async def create_task(task: Task):
    global task_counter
    task.id = task_counter
    task_counter += 1
    tasks.append(task)
    return task

@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, updated_task: Task):
    task_index = next((index for index, task in enumerate(tasks) if task.id == task_id), None)
    if task_index is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    updated_task.id = task_id
    tasks[task_index] = updated_task
    return updated_task

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    task_index = next((index for index, task in enumerate(tasks) if task.id == task_id), None)
    if task_index is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    tasks.pop(task_index)
    return {"message": "Task deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 