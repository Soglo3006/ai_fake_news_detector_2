import pandas as pd
import re
from sklearn.model_selection import train_test_split
import os

# === 1. Chargement des fichiers ===
fake_df = pd.read_csv("News/Fake.csv")
true_df = pd.read_csv("News/True.csv")

liar_df = pd.read_csv("News/LIAR/train.tsv", sep='\t', header=None, on_bad_lines='skip')
liar_df = liar_df[[2,1]] 
liar_df.columns = ["content","label"]

BuzzFeedTrue_df = pd.read_csv("News/FakeNewsNet/BuzzFeed_real_news_content.csv")
BuzzFeedFake_df = pd.read_csv("News/FakeNewsNet/BuzzFeed_fake_news_content.csv")

PolitiFactTrue_df = pd.read_csv("News/FakeNewsNet/PolitiFact_real_news_content.csv")
PolitiFactFake_df = pd.read_csv("News/FakeNewsNet/PolitiFact_fake_news_content.csv")

# === 2. Ajout des labels ===
fake_df["label"] = 0
true_df["label"] = 1


BuzzFeedFake_df["label"] = 0
BuzzFeedTrue_df["label"] = 1

PolitiFactFake_df["label"] = 0
PolitiFactTrue_df["label"] = 1

liar_label_map = {
    "true":1,
    "mostly-true":1,
    "half-true":0,
    "false":0,
    "barely-true":0,
    "pants-fire":0
}
liar_df["label"] = liar_df["label"].map(liar_label_map)

# === 3. Nettoyage du texte ===
def clean_text(text):
    text = re.sub(r'<.*?>', '', str(text))              # HTML
    text = re.sub(r'http\S+', '', text)                # URL
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)         # caractères spéciaux
    text = text.lower()                                 # minuscules
    return text.strip()

fake_df["content"] = fake_df["title"].apply(clean_text) + " " + fake_df["text"].apply(clean_text)
true_df["content"] = true_df["title"].apply(clean_text) + " " + true_df["text"].apply(clean_text)

for df in [BuzzFeedFake_df, BuzzFeedTrue_df, PolitiFactFake_df, PolitiFactTrue_df]:
    if "title" in df.columns and "text" in df.columns:
        df["content"] = df["title"].apply(clean_text) + " " + df["text"].apply(clean_text)
    elif "text" in df.columns:
        df["content"] = df["text"].apply(clean_text)
    else:
        df["content"] = df.iloc[:,0].apply(clean_text)

liar_df["content"] = liar_df["content"].apply(clean_text)


# === 4. Fusion ===
data = pd.concat([
    fake_df[["content","label"]],
    true_df[["content","label"]],
    liar_df[["content","label"]],
    BuzzFeedFake_df[["content","label"]],
    BuzzFeedTrue_df[["content","label"]],
    PolitiFactFake_df[["content","label"]],
    PolitiFactTrue_df[["content","label"]]
], ignore_index=True)

# === 5. Découpage en train / val / test ===
train_df, temp_df = train_test_split(data, test_size=0.3, stratify=data["label"], random_state=42)
val_df, test_df = train_test_split(temp_df, test_size=0.5, stratify=temp_df["label"], random_state=42)

# === 6. Sauvegarde des fichiers ===
os.makedirs("prepared_data", exist_ok=True)
train_df.to_csv("prepared_data/fake_news_train.csv", index=False)
val_df.to_csv("prepared_data/fake_news_val.csv", index=False)
test_df.to_csv("prepared_data/fake_news_test.csv", index=False)
data.to_csv("prepared_data/fake_news_all.csv", index=False)

print("Données préparées et sauvegardées dans le dossier 'prepared_data/'")
