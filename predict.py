from transformers import BertTokenizer, BertForSequenceClassification
import torch


model_paths = {
    "short": "models/bert_fake_news_short",
    "long": "models/bert_fake_news_long"
}

models = {}
tokenizers = {}

for key, path in model_paths.items():
    print(f"Chargement du modèle {key} depuis : {path}")
    tokenizers[key] = BertTokenizer.from_pretrained(path)
    models[key] = BertForSequenceClassification.from_pretrained(path)
    models[key].eval()

def predict_single(text):
    model_type = "short" if len(text.split()) < 50 else "long"  
    tokenizer = tokenizers[model_type]
    model = models[model_type]

    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class = torch.argmax(logits, dim=1).item()
        confidence = torch.softmax(logits, dim=1)[0][predicted_class].item()

    label = "REAL" if predicted_class == 1 else "FAKE"
    return label, confidence, model_type

def predict_batch(texts):
    results = []
    for text in texts:
        label, confidence, model_used = predict_single(text)
        results.append({
            "text": text,
            "model_used": model_used,
            "label": label,
            "confidence": confidence
        })
    return results

if __name__ == "__main__":
    examples = [
        "NASA successfully landed the Perseverance rover on Mars in February 2021.",
        "WHO reports a decrease in global malaria deaths over the last five years.",
        "Louvre Museum in Paris reopened to visitors after months of COVID-19 closure.",
        "UNICEF launches a global initiative to provide access to clean water for 100 million children."
    ]

    predictions = predict_batch(examples)

    for i, pred in enumerate(predictions):
        print(f"\nTexte {i+1}: {pred['text']}")
        print(f"Modèle utilisé : {pred['model_used']}")
        print(f"Prédiction : {pred['label']} (confiance : {pred['confidence']:.2f})")
