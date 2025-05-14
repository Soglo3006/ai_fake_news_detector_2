import pandas as pd
import re
from sklearn.model_selection import train_test_split
import os

# === 1. Chargement des fichiers ===
fake_df = pd.read_csv("News/Fake.csv")
true_df = pd.read_csv("News/True.csv")

# === 2. Ajout des labels ===
fake_df["label"] = 0
true_df["label"] = 1

# === 3. Fusion des jeux de données ===
data = pd.concat([fake_df, true_df], ignore_index=True)
data = data[["title", "text", "label"]]

# === 4. Nettoyage du texte ===
def clean_text(text):
    text = re.sub(r'<.*?>', '', str(text))              # HTML
    text = re.sub(r'http\S+', '', text)                # URL
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)         # caractères spéciaux
    text = text.lower()                                 # minuscules
    return text.strip()

data["title"] = data["title"].apply(clean_text)
data["text"] = data["text"].apply(clean_text)

# === 5. Fusion titre + texte ===
data["content"] = data["title"] + " " + data["text"]
data = data[["content", "label"]]

# === 6. Découpage en train / val / test ===
train_df, temp_df = train_test_split(data, test_size=0.3, stratify=data["label"], random_state=42)
val_df, test_df = train_test_split(temp_df, test_size=0.5, stratify=temp_df["label"], random_state=42)

# === 7. Sauvegarde des fichiers ===
os.makedirs("prepared_data", exist_ok=True)
train_df.to_csv("prepared_data/fake_news_train.csv", index=False)
val_df.to_csv("prepared_data/fake_news_val.csv", index=False)
test_df.to_csv("prepared_data/fake_news_test.csv", index=False)
data.to_csv("prepared_data/fake_news_all.csv", index=False)

print("Données préparées et sauvegardées dans le dossier 'prepared_data/'")
