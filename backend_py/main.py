from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

conversation = []
weak_topics = {}
level = "beginner"

class Query(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "ChatTutor backend running"}

@app.post("/ask")
def ask(query: Query):
    global level

    # store conversation
    conversation.append({"role": "user", "content": query.question})

    # --- weak topic detection ---
    words = query.question.lower().split()
    for word in words:
        weak_topics[word] = weak_topics.get(word, 0) + 1

    # --- level detection ---
    if any(word in query.question.lower() for word in ["class", "basic", "simple"]):
        level = "beginner"
    elif any(word in query.question.lower() for word in ["code", "implement", "algorithm"]):
        level = "advanced"
    else:
        level = "intermediate"

    # --- prompt ---
    prompt = f"""
You are an intelligent AI tutor.

Student level: {level}
Student weak topics: {list(weak_topics.keys())}

Rules:
- Teach step-by-step
- Adjust explanation based on level:
  - beginner → very simple with examples
  - intermediate → balanced explanation
  - advanced → technical and detailed
- If question is unclear, ask 1 clarifying question first
- Guide instead of directly giving answers
- Focus more on weak topics if relevant
- Ask follow-up questions to engage the student

Student question:
{query.question}
"""

    # --- call ollama ---
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    answer = response.json()["response"]

    # store AI response
    conversation.append({"role": "assistant", "content": answer})

    return {
        "answer": answer,
        "level": level,
        "weak_topics": weak_topics,
        "history": conversation
    }