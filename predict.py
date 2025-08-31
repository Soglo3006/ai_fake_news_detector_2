from transformers import BertTokenizer, BertForSequenceClassification
import torch
from prepare_data import clean_text


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
    clean_txt = clean_text(text)
    model_type = "long" if len(clean_txt.split()) > 30 else "short"
    tokenizer = tokenizers[model_type]
    model = models[model_type]

    inputs = tokenizer(clean_txt, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=1)[0] 
        predicted_class = torch.argmax(probs).item()

    label = "REAL" if predicted_class == 1 else "FAKE"
    return label, probs.tolist(), model_type


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
    "On February 18, 2021, NASA successfully set the Perseverance rover down on Mars. Its mission includes searching for traces of past life, gathering samples of rocks and soil, and testing technologies that could support human exploration in the future.",

    "The U.S. Congress ratified the 2020 presidential election results in January 2021, officially confirming Joe Biden's win. Despite some objections raised during the session, no attempt to overturn the results succeeded, ensuring a constitutional transfer of power.",

    "Italy emerged victorious at the UEFA Euro 2020, defeating England in a penalty shootout after a 1-1 draw in extra time. This triumph marks Italy's second European Championship title and triggered nationwide celebrations.",

    "Healthcare workers and senior citizens were the first to receive the newly approved COVID-19 vaccines in the United States in December 2020. Clinical trials of Pfizer-BioNTech and Moderna vaccines indicated over 90% efficacy in preventing symptomatic cases."
]



    predictions = predict_batch(examples)

    for i, pred in enumerate(predictions):
        print(f"\nTexte {i+1}: {pred['text']}")
        print(f"Modèle utilisé : {pred['model_used']}")
        print(f"Prédiction : {pred['label']}")
        print(f"Probabilités -> FAKE: {pred['confidence'][0]:.2f}, REAL: {pred['confidence'][1]:.2f}")

