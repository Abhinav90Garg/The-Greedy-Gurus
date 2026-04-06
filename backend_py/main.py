from fastapi import FastAPI
from pydantic import BaseModel
import requests
import uuid
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# store chats: {chat_id: [messages]}
chats = {}

class Query(BaseModel):
    chat_id: str
    question: str

@app.post("/new_chat")
def new_chat():
    chat_id = str(uuid.uuid4())
    chats[chat_id] = []
    return {"chat_id": chat_id}

@app.get("/chats")
def get_chats():
    return {"chats": list(chats.keys())}

@app.post("/ask")
def ask(query: Query):
    print("REQUEST RECEIVED:", query.question)

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": query.question,
            "stream": False
        }
    )

    print("OLLAMA RESPONSE:", response.text)

    return {"answer": response.json().get("response", "No response")}