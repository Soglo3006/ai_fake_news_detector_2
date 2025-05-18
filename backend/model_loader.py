from transformers import BertTokenizer, BertForSequenceClassification
import torch
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "bert_fake_news")

tokenizer = BertTokenizer.from_pretrained(MODEL_PATH)
model     = BertForSequenceClassification.from_pretrained(MODEL_PATH)
model.eval()

def predict_label(text: str):
    inputs = tokenizer(
        text, 
        return_tensors="pt", 
        truncation=True, 
        padding=True, 
        max_length=512
    )
    with torch.no_grad():
        outputs = model(**inputs)
        logits  = outputs.logits
        idx     = torch.argmax(logits, dim=1).item()
        score   = torch.softmax(logits, dim=1)[0][idx].item()
    label = "REAL" if idx == 1 else "FAKE"
    return label, round(score, 2)
