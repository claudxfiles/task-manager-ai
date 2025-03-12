from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import AsyncOpenAI
import asyncio
from dotenv import load_dotenv
import os

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
        stream = await client.chat.completions.create(
            extra_headers={
                "HTTP-Referer": "https://your-site.com",
                "X-Title": "Your Application",
            },
            model=request.model,
            messages=[
                {
                    "role": "user",
                    "content": request.message
                }
            ],
            stream=True,
            extra_body={
                "provider": {
                    "order": ["Groq","Fireworks"],
                    "allow_fallbacks": False
                }
            }
        )
        
        response_text = ""
        async for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                response_text += chunk.choices[0].delta.content
        
        return {"response": response_text}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Chat con IA"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 