from fastapi import FastAPI
from model_loader import predict_label
from schemas import InputText, Feedback
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Fake News Detector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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