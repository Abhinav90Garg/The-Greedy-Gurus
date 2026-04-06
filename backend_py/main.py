from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

conversation = []
weak_topics = {}

class Query(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "ChatTutor backend running"}

@app.post("/ask")
def ask(query: Query):
    conversation.append({"role": "user", "content": query.question})

    # --- weak topic detection ---
    words = query.question.lower().split()
    for word in words:
        weak_topics[word] = weak_topics.get(word, 0) + 1

    prompt = f"""
You are an intelligent AI tutor.

Student weak topics: {list(weak_topics.keys())}

Rules:
- Teach step-by-step
- If question is unclear, ask 1 clarifying question first
- Guide the student instead of directly giving the answer
- Focus more on weak topics if relevant
- Use simple and clear language
- Ask follow-up questions to engage the student

Student question:
{query.question}
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    answer = response.json()["response"]

    conversation.append({"role": "assistant", "content": answer})

    return {
        "answer": answer,
        "weak_topics": weak_topics,
        "history": conversation
    }