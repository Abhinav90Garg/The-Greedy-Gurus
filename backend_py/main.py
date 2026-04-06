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
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, WebSocket, WebSocketDisconnect # <-- Added WebSocket imports


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
    
class ConnectionManager:
    def __init__(self):
        # Store all active websocket connections
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str, sender: WebSocket):
        # Send the drawing data to everyone EXCEPT the person who drew it
        for connection in self.active_connections:
            if connection != sender:
                try:
                    await connection.send_text(message)
                except:
                    pass

manager = ConnectionManager()

@app.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(websocket)
    try:
        while True:
            # Wait for drawing data from a frontend client
            data = await websocket.receive_text()
            # Broadcast it to all other clients in the room
            await manager.broadcast(data, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

class DevProfile(BaseModel):
    user_id: str
    name: str
    role: str
    skills: list[str]
    looking_for: list[str]

# In-memory DB pre-populated with some dummy users so your demo looks good instantly
devmatch_users = {
    "dummy_1": {
        "user_id": "dummy_1", "name": "RAMU", "role": "UI/UX Designer",
        "skills": ["Figma", "Tailwind", "React"], "looking_for": ["Python", "FastAPI", "Node"]
    },
    "dummy_2": {
        "user_id": "dummy_2", "name": "SHAMU", "role": "Backend Engineer",
        "skills": ["Python", "Django", "PostgreSQL"], "looking_for": ["React", "Next.js", "Figma"]
    },
    "dummy_3": {
        "user_id": "dummy_3", "name": "RAVI", "role": "Fullstack Ninja",
        "skills": ["Node", "React", "MongoDB"], "looking_for": ["UI/UX", "Marketing", "Figma"]
    }
}

@app.post("/devmatch/profile")
def create_profile(profile: DevProfile):
    devmatch_users[profile.user_id] = profile.dict()
    return {"status": "success", "message": "Profile synced to mainframe."}

@app.get("/devmatch/match/{user_id}")
def get_matches(user_id: str):
    if user_id not in devmatch_users:
        raise HTTPException(status_code=404, detail="User not found")
    
    current_user = devmatch_users[user_id]
    matches = []
    
    for uid, user in devmatch_users.items():
        if uid == user_id:
            continue
        
        # Calculate Match Score
        score = 0
        # What they have that I need
        my_needs_met = set(current_user['looking_for']).intersection(set(user['skills']))
        # What I have that they need
        their_needs_met = set(user['looking_for']).intersection(set(current_user['skills']))
        
        score += len(my_needs_met) * 40
        score += len(their_needs_met) * 40
        
        # Add slight randomness to break ties in scoring
        if score > 0:
            matches.append({"user_id": uid, "user": user, "match_percentage": min(score + 10, 99)})
            
    # Sort highest match first
    matches.sort(key=lambda x: x['match_percentage'], reverse=True)
    return {"matches": matches}