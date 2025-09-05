import shap
from predict import models, tokenizers

def explain_text(text, top_k=20):
    model = models["long"]  
    tokenizer = tokenizers["long"]
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    explainer = shap.Explainer(model, tokenizer)
    shap_values = explainer([text])

    token_importance = sorted(
        zip(inputs["input_ids"][0].tolist(), shap_values.values[0]),
        key=lambda x: abs(x[1]),
        reverse=True
    )[:top_k]

    words = [tokenizer.decode([tok_id]) for tok_id, _ in token_importance]
    weights = [weight for _, weight in token_importance]

    return [{"word": w, "importance": float(i)} for w, i in zip(words, weights)]
