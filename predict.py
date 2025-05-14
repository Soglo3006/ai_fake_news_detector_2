from transformers import BertTokenizer, BertForSequenceClassification
import torch

# === 1. Charger le modèle fine-tuné ===
model_path = "models/bert_fake_news"  # le dossier contenant le modèle sauvegardé après l'entraînement
print(f"📦 Chargement du modèle depuis : {model_path}")
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertForSequenceClassification.from_pretrained(model_path)
model.eval() 

# === 2. Fonction de prédiction ===
def predict(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class = torch.argmax(logits, dim=1).item()
        confidence = torch.softmax(logits, dim=1)[0][predicted_class].item()

    label = "REAL" if predicted_class == 1 else "FAKE"
    return label, confidence

# === 3. Exemple d'utilisation ===
if __name__ == "__main__":
    examples = [
        "NASA confirms discovery of water on the moon's surface.",
        "BREAKING: Alien spaceship lands in Times Square, NYC."
    ]

    for i, text in enumerate(examples):
        label, confidence = predict(text)
        print(f"\n Texte {i+1}: {text}")
        print(f"Prédiction : {label} (confiance : {confidence:.2f})")
