from fastapi import FastAPI
from backend.model_loader import predict_label
from backend.schemas import InputText, Feedback

app = FastAPI(title="Fake News Detector API")

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