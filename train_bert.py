import pandas as pd
from datasets import Dataset
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
import torch
import transformers
print("Fichier transformers importé depuis :", transformers.__file__)


# === 1. Chargement des données ===
print("Chargement des données préparées...")
train_df = pd.read_csv("prepared_data/fake_news_train.csv")
val_df = pd.read_csv("prepared_data/fake_news_val.csv")
test_df = pd.read_csv("prepared_data/fake_news_test.csv")

train_df = train_df.sample(1000, random_state=42)
val_df = val_df.sample(200, random_state=42)
test_df = test_df.sample(200, random_state=42)

# === 2. Tokenizer BERT ===
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# === 3. Tokenization des données ===
def tokenize(batch):
    return tokenizer(batch["content"], padding=True, truncation=True, max_length=512)

train_dataset = Dataset.from_pandas(train_df).map(tokenize, batched=True)
val_dataset = Dataset.from_pandas(val_df).map(tokenize, batched=True)
test_dataset = Dataset.from_pandas(test_df).map(tokenize, batched=True)

train_dataset.set_format("torch", columns=["input_ids", "attention_mask", "label"])
val_dataset.set_format("torch", columns=["input_ids", "attention_mask", "label"])
test_dataset.set_format("torch", columns=["input_ids", "attention_mask", "label"])

# === 4. Chargement du modèle BERT ===
model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=2)

# === 5. Entraînement avec Trainer ===
training_args = TrainingArguments(
    output_dir="./results",
    eval_strategy="epoch",
    save_strategy="epoch",
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    num_train_epochs=1,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
)

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = torch.argmax(torch.tensor(logits), dim=-1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='binary')
    acc = accuracy_score(labels, preds)
    return {"accuracy": acc, "precision": precision, "recall": recall, "f1": f1}

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    compute_metrics=compute_metrics,
)

print("Début de l'entraînement")
trainer.train()

# === 6. Évaluation finale ===
print("Évaluation finale sur le test set")
metrics = trainer.evaluate(test_dataset)
print(metrics)

# === 7. Sauvegarde du modèle ===
model.save_pretrained("models/bert_fake_news")
tokenizer.save_pretrained("models/bert_fake_news")

print("Entraînement terminé et modèle sauvegardé dans 'models/bert_fake_news'")