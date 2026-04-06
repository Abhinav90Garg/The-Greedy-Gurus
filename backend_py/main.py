from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
import uuid
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
import PyPDF2
import io

# Load the API key from your .env file
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client()

# Store active Gemini chat sessions: {chat_id: session_object}
chats = {}

class Query(BaseModel):
    chat_id: str
    question: str
    feature_type: str = "chat" 

@app.post("/new_chat")
def new_chat():
    chat_id = str(uuid.uuid4())
    chats[chat_id] = None 
    return {"chat_id": chat_id}

@app.get("/chats")
def get_chats():
    return {"chats": list(chats.keys())}

@app.post("/ask")
def ask(query: Query):
    if query.chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat ID not found.")

    if query.feature_type == "resume":
        sys_inst = "You are an expert ATS scanner and technical recruiter. Score resumes out of 100, identify missing keywords, and provide actionable feedback to developers."
    else:
        sys_inst = "You are a highly intelligent Chat Tutor. Provide personalized learning assistance. Do not just give the answer; guide the student to understand the concept."

    if chats[query.chat_id] is None:
        config = types.GenerateContentConfig(system_instruction=sys_inst)
        chats[query.chat_id] = client.chats.create(model='gemini-2.5-flash', config=config)

    try:
        response = chats[query.chat_id].send_message(query.question)
        return {"answer": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to connect to AI Engine.")

# --- NEW ENDPOINT FOR RESUME UPLOADS ---
@app.post("/upload_resume")
async def upload_resume(chat_id: str = Form(...), file: UploadFile = File(...)):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat ID not found.")

    try:
        # 1. Read the uploaded file into memory
        contents = await file.read()
        extracted_text = ""

        # 2. Extract text if it's a PDF
        if file.filename.lower().endswith(".pdf"):
            reader = PyPDF2.PdfReader(io.BytesIO(contents))
            for page in reader.pages:
                extracted_text += page.extract_text() + "\n"
        else:
            # For simplicity, if it's a docx/txt, we decode it raw (you can add docx support later)
            extracted_text = contents.decode('utf-8', errors='ignore')

        # 3. Ensure the AI session is initialized as an ATS scanner
        if chats[chat_id] is None:
            sys_inst = "You are an expert ATS scanner and technical recruiter. Score resumes out of 100, identify missing keywords, and provide actionable feedback."
            config = types.GenerateContentConfig(system_instruction=sys_inst)
            chats[chat_id] = client.chats.create(model='gemini-2.5-flash', config=config)

        # 4. Send the extracted text to Gemini
        prompt = f"Please analyze this uploaded resume. Give it an ATS score out of 100, list missing keywords, and provide brief feedback.\n\nRESUME TEXT:\n{extracted_text}"
        
        response = chats[chat_id].send_message(prompt)
        
        return {"answer": response.text}

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to process document.")