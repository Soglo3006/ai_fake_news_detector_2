from fastapi import FastAPI
from model_loader import predict_label
from schemas import InputText, Feedback, RegisterRequest, LoginRequest
from fastapi.middleware.cors import CORSMiddleware
import hashlib
import json

app = FastAPI(title="Fake News Detector API")
user_file = "user.json"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()

@app.post("/analyze")
def analyze(req: InputText):
    label, confidence = predict_label(req.content)
    return {"label": label, "confidence": confidence}

@app.post("/feedback")
def feedback(data: Feedback):
    print(f"[FEEDBACK] Texte: {data.content}")
    print(f"Attendu: {data.expected_label}")
    print(f"Commentaire: {data.comment}")
    return {"message": "Feedback reçu. Merci !"}

@app.post("/register")
def register_user(request: RegisterRequest):
    try:
        with open(user_file, "r") as f:
            users = json.load(f)
    except FileNotFoundError:
        users = []
    for i in users:
        if i["email"] == request.email:
            return {"message": "Email déjà utilisé."}
        
    i = {
        "firstname": request.firstname,
        "lastname": request.lastname,
        "email": request.email,
        "password": hash_password(request.password)
    }
    users.append(i)
    with open(user_file, "w") as f:
        json.dump(users, f)
    return {"message": "Utilisateur enregistré avec succès."}

@app.post("/login")
def login_user(request:LoginRequest):
    try:
        with open(user_file, "r") as f:
            content = f.read().strip()
            if not content:
                return {"error": "Aucun utilisateur enregistré."}
            users = json.loads(content)
    except FileNotFoundError:
        return{"error: Aucun utilisateur enregistré."}
    
    for i in users:
        if i["email"] == request.email and i["password"]== hash_password(request.password):
            return {"message": "Connexion réussie."}
