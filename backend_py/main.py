from fastapi import FastAPI, HTTPException, UploadFile, File, Form, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
import uuid
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai import types
import os
from pathlib import Path
from dotenv import load_dotenv
import PyPDF2
import io

# Load environment variables from the backend_py/.env file explicitly
dotenv_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=dotenv_path)

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    raise RuntimeError('Missing GEMINI_API_KEY in backend_py/.env')

app = FastAPI()

client = genai.Client(api_key=GEMINI_API_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        print("ASK ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to connect to AI Engine.")


@app.post("/upload_resume")
async def upload_resume(chat_id: str = Form(...), file: UploadFile = File(...)):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat ID not found.")

    try:
        
        contents = await file.read()
        extracted_text = ""

    
        if file.filename.lower().endswith(".pdf"):
            reader = PyPDF2.PdfReader(io.BytesIO(contents))
            for page in reader.pages:
                extracted_text += page.extract_text() + "\n"
        else:
    
            extracted_text = contents.decode('utf-8', errors='ignore')

        
        if chats[chat_id] is None:
            sys_inst = "You are an expert ATS scanner and technical recruiter. Score resumes out of 100, identify missing keywords, and provide actionable feedback."
            config = types.GenerateContentConfig(system_instruction=sys_inst)
            chats[chat_id] = client.chats.create(model='gemini-2.5-flash', config=config)

        
        prompt = f"Please analyze this uploaded resume. Give it an ATS score out of 100, list missing keywords, and provide brief feedback.\n\nRESUME TEXT:\n{extracted_text}"
        
        response = chats[chat_id].send_message(prompt)
        
        return {"answer": response.text}

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to process document.")
    
class ConnectionManager:
    def __init__(self):
        
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str, sender: WebSocket):
    
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
    
            data = await websocket.receive_text()
            
            await manager.broadcast(data, websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

class DevProfile(BaseModel):
    user_id: str
    name: str
    role: str
    skills: list[str]
    looking_for: list[str]


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
        
    
        score = 0
        
        my_needs_met = set(current_user['looking_for']).intersection(set(user['skills']))
        
        their_needs_met = set(user['looking_for']).intersection(set(current_user['skills']))
        
        score += len(my_needs_met) * 40
        score += len(their_needs_met) * 40
        
        
        if score > 0:
            matches.append({"user_id": uid, "user": user, "match_percentage": min(score + 10, 99)})
            
    
    matches.sort(key=lambda x: x['match_percentage'], reverse=True)
    return {"matches": matches}


class PollCreate(BaseModel):
    question: str
    options: list[str]

class VoteCast(BaseModel):
    poll_id: str
    option_id: str


quickpolls = {
    "demo_poll_1": {
        "id": "demo_poll_1",
        "question": "Which framework should we use for our next hackathon?",
        "options": [
            {"id": "opt_1", "text": "React + Vite", "votes": 12},
            {"id": "opt_2", "text": "Next.js", "votes": 8},
            {"id": "opt_3", "text": "Vue.js", "votes": 3}
        ],
        "total_votes": 23
    }
}

@app.post("/quickpoll/create")
def create_poll(poll: PollCreate):
    poll_id = "poll_" + str(uuid.uuid4())[:8]
    
    
    valid_options = [opt for opt in poll.options if opt.strip() != ""]
    
    quickpolls[poll_id] = {
        "id": poll_id,
        "question": poll.question,
        "options": [{"id": "opt_" + str(uuid.uuid4())[:8], "text": opt, "votes": 0} for opt in valid_options],
        "total_votes": 0
    }
    return {"status": "success", "poll_id": poll_id}

@app.get("/quickpoll/list")
def list_polls():
    
    return {"polls": list(quickpolls.values())[::-1]}

@app.post("/quickpoll/vote")
def cast_vote(vote: VoteCast):
    if vote.poll_id not in quickpolls:
        raise HTTPException(status_code=404, detail="Poll not found")
    
    poll = quickpolls[vote.poll_id]
    for opt in poll["options"]:
        if opt["id"] == vote.option_id:
            opt["votes"] += 1
            poll["total_votes"] += 1
            return {"status": "success", "poll": poll}
    
    raise HTTPException(status_code=404, detail="Option not found")

class FocusSession(BaseModel):
    user_id: str
    name: str
    minutes_focused: int

focus_leaderboard = {
    "gk_1": {"name": "Gurleen Kaur", "minutes": 150, "rank": "Grandmaster"},
    "ag_1": {"name": "Abhinav Garg", "minutes": 125, "rank": "Master"},
    "dummy_1": {"name": "XYZ", "minutes": 45, "rank": "Novice"}
}

def get_rank(minutes):
    if minutes >= 100: return "Grandmaster"
    if minutes >= 50: return "Master"
    if minutes >= 25: return "Scholar"
    return "Novice"

@app.post("/focus/log")
def log_focus_time(session: FocusSession):
    if session.user_id in focus_leaderboard:
        focus_leaderboard[session.user_id]["minutes"] += session.minutes_focused
    else:
        focus_leaderboard[session.user_id] = {
            "name": session.name, 
            "minutes": session.minutes_focused
        }
    

    focus_leaderboard[session.user_id]["rank"] = get_rank(focus_leaderboard[session.user_id]["minutes"])
    
    return {"status": "success", "total": focus_leaderboard[session.user_id]["minutes"]}

@app.get("/focus/leaderboard")
def get_leaderboard():

    sorted_leaders = sorted(focus_leaderboard.values(), key=lambda x: x["minutes"], reverse=True)
    return {"leaderboard": sorted_leaders}