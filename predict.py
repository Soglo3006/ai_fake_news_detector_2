from transformers import BertTokenizer, BertForSequenceClassification
import torch

# === 1. Charger le modèle fine-tuné ===
model_path = "models/bert_fake_news"  # le dossier contenant le modèle sauvegardé après l'entraînement
print(f"Chargement du modèle depuis : {model_path}")
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
    "Le gouvernement canadien a annoncé un plan pour réduire les émissions de gaz à effet de serre d'ici 2030.",
    "NASA successfully landed the Perseverance rover on Mars in February 2021.",
    "WHO reports a decrease in global malaria deaths over the last five years.",
    "Louvre Museum in Paris reopened to visitors after months of COVID-19 closure.",
    "UNICEF launches a global initiative to provide access to clean water for 100 million children."
]


    for i, text in enumerate(examples):
        label, confidence = predict(text)
        print(f"\n Texte {i+1}: {text}")
        print(f"Prédiction : {label} (confiance : {confidence:.2f})")
