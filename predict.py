from transformers import BertTokenizer, BertForSequenceClassification
import torch
from prepare_data import clean_text


model_paths = {
    "long": "models/bert_fake_news_long"
}

models = {}
tokenizers = {}

for key, path in model_paths.items():
    print(f"Chargement du modèle {key} depuis : {path}")
    tokenizers[key] = BertTokenizer.from_pretrained(path)
    models[key] = BertForSequenceClassification.from_pretrained(path)
    models[key].eval()

def predict_single(text, max_length=1024):
    clean_txt = clean_text(text)
    tokenizer = tokenizers["long"]
    model = models["long"]

    inputs = tokenizer(clean_txt, return_tensors="pt", truncation=False, padding=False)
    input_ids = inputs["input_ids"][0]

    # Segmentation si le texte est trop long
    if len(input_ids) <= max_length:
        segments = [input_ids]
    else:
        segments = [input_ids[i:i+max_length] for i in range(0, len(input_ids), max_length)]

    all_logits = []

    for segment in segments:
        seg_inputs = {
            "input_ids": segment.unsqueeze(0),
            "attention_mask": torch.ones_like(segment).unsqueeze(0)
        }

        with torch.no_grad():
            outputs = model(**seg_inputs)
            all_logits.append(outputs.logits)

    # Moyenne des résultats sur tous les segments
    avg_logits = torch.mean(torch.stack(all_logits), dim=0)
    probs = torch.softmax(avg_logits, dim=1)[0]
    predicted_class = torch.argmax(probs).item()

    label = "REAL" if predicted_class == 1 else "FAKE"
    return label, probs.tolist(), "longformer"



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
    examples_fake_long = [

    "In March 2021, NASA allegedly discovered an alien civilization on Mars, claiming to have found fully grown organisms and signs of advanced technology. According to the reports, these Martian beings communicated using radio waves and have already built structures similar to Earth cities. While NASA refused to provide any official evidence, multiple media outlets circulated images supposedly showing alien cities, sparking global excitement and disbelief.",

    "During the January 2021 certification of the 2020 U.S. presidential election, several major news outlets reported that Congress had secretly voted to cancel the results due to alleged widespread voter fraud. The articles described lengthy closed-door sessions where lawmakers allegedly planned to install a provisional government. Numerous photos and documents were circulated on social media as proof, but none were verified, causing widespread confusion and debate across the country.",

    "In July 2021, Italy was reported to have won the UEFA Euro 2020 championship in a stunningly lopsided match, with a final score of 10-0 against England in the penalty shootout. According to these claims, the match broke all records in football history, leading to nationwide celebrations and international headlines. Fans shared countless videos online showing players celebrating wildly, although no official match records confirmed such a result.",

    "In December 2020, a series of online reports claimed that the newly approved COVID-19 vaccines not only failed to prevent infections but also increased the risk of contracting the virus by 50%. These articles cited anonymous internal studies from Pfizer and Moderna, and included fabricated charts showing rising infection rates among vaccinated populations. Despite the sensational headlines, no peer-reviewed studies or official health agencies have ever confirmed these claims."
]

    predictions = predict_batch(examples_fake_long)

    for i, pred in enumerate(predictions):
        print(f"\nTexte {i+1}: {pred['text']}")
        print(f"Modèle utilisé : {pred['model_used']}")
        print(f"Prédiction : {pred['label']}")
        print(f"Probabilités -> FAKE: {pred['confidence'][0]:.2f}, REAL: {pred['confidence'][1]:.2f}")

