from fastapi import FastAPI
from pydantic import BaseModel
import requests
import uuid

app = FastAPI()

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
    chat_id = query.chat_id

    if chat_id not in chats:
        chats[chat_id] = []

    chats[chat_id].append(query.question)
    chats[chat_id] = chats[chat_id][-3:]  # keep last 3

    context = "\n".join(chats[chat_id])

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": context,
            "stream": False
        }
    )

    result = response.json()

    return {"answer": result["response"]}