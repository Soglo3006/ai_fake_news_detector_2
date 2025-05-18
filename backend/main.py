from fastapi import FastAPI
from backend.model_loader import predict_label
from backend.schemas      import InputText

app = FastAPI(title="Fake News Detector API")

@app.post("/analyze")
def analyze(req: InputText):
    label, confidence = predict_label(req.content)
    return {"label": label, "confidence": confidence}
