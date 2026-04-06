from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

conversation = []

class Query(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "ChatTutor backend running"}

@app.post("/ask")
def ask(query: Query):
    conversation.append({"role": "user", "content": query.question})

    return {
        "answer": "Backend working",
        "history": conversation
    }