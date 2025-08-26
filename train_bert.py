import pandas as pd
from datasets import Dataset
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments, DataCollatorWithPadding
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.model_selection import train_test_split
import torch
import transformers

print("Fichier transformers importé depuis :", transformers.__file__)

def train(taille):
    # === 1. Chargement des données ===
    print(f"Chargement des données préparées pour {taille}...")
    train_df = pd.read_csv(f"prepared_data/fake_news_{taille}_train.csv")
    val_df = pd.read_csv(f"prepared_data/fake_news_{taille}_val.csv")
    test_df = pd.read_csv(f"prepared_data/fake_news_{taille}_test.csv")

    # === 2. Tokenizer BERT ===
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=2)

    # === 3. Tokenization des données ===
    def tokenize(batch):
        return tokenizer(
            batch["content"],
            padding='max_length', 
            truncation=True,
            max_length=128
        )

    train_dataset = Dataset.from_pandas(train_df).map(tokenize, batched=True)
    val_dataset = Dataset.from_pandas(val_df).map(tokenize, batched=True)
    test_dataset = Dataset.from_pandas(test_df).map(tokenize, batched=True)

    data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

    # === 5. Arguments d'entraînement ===
    training_args = TrainingArguments(
        output_dir=f"./results_{taille}",
        eval_strategy="epoch",
        save_strategy="epoch",
        per_device_train_batch_size=4,  
        per_device_eval_batch_size=4,
        num_train_epochs=2,
        weight_decay=0.01,
        logging_dir=f"./logs_{taille}",   
        logging_steps=10,
        learning_rate=2e-5,
    )

    # === 6. Métriques ===
    def compute_metrics(eval_pred):
        logits, labels = eval_pred
        preds = torch.argmax(torch.tensor(logits), dim=-1)
        precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='binary')
        acc = accuracy_score(labels, preds)
        return {"accuracy": acc, "precision": precision, "recall": recall, "f1": f1}

    # === 7. Trainer ===
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        compute_metrics=compute_metrics,
        data_collator=data_collator
    )

    print(f"Début de l'entraînement pour {taille}...")
    trainer.train()

    # === 8. Évaluation finale ===
    print(f"Évaluation finale sur le test set ({taille})")
    metrics = trainer.evaluate(test_dataset)
    print(metrics)

    model.save_pretrained(f"models/bert_fake_news_{taille}")
    tokenizer.save_pretrained(f"models/bert_fake_news_{taille}")

    print(f"Entraînement terminé et modèle sauvegardé dans 'models/bert_fake_news_{taille}'")


train("long")
train("short")
