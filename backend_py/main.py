from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

conversation = []

class Query(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "ChatTutor backend running"}

import requests

@app.post("/ask")
def ask(query: Query):
    conversation.append({"role": "user", "content": query.question})

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": query.question,
            "stream": False
        }
    )

    answer = response.json()["response"]

    conversation.append({"role": "assistant", "content": answer})

    return {
        "answer": answer,
        "history": conversation
    }