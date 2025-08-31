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

# === 2. Ajout du champ type ===
liar_df["type"] = "short"   
fake_df["type"] = "long"    
true_df["type"] = "long"
BuzzFeedFake_df["type"] = "long"
BuzzFeedTrue_df["type"] = "long"
PolitiFactFake_df["type"] = "long"
PolitiFactTrue_df["type"] = "long"

# === 3. Ajout des labels ===
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

# === 4. Nettoyage du texte ===
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

# === 5. Fusion et séparation par type ===
data = pd.concat([
    fake_df[["content","label","type"]],
    true_df[["content","label","type"]],
    liar_df[["content","label","type"]],
    BuzzFeedFake_df[["content","label","type"]],
    BuzzFeedTrue_df[["content","label","type"]],
    PolitiFactFake_df[["content","label","type"]],
    PolitiFactTrue_df[["content","label","type"]]
], ignore_index=True)

print(data)

data_short = data[data["type"]=="short"]
data_long = data[data["type"]=="long"]

print("\n=== Distribution FAKE/REAL par type ===")
print("SHORT :")
print(data_short["label"].value_counts(), "\n")
print(data_short["label"].value_counts(normalize=True), "\n")

print("LONG :")
print(data_long["label"].value_counts(), "\n")
print(data_long["label"].value_counts(normalize=True), "\n")

# === 6. Découpage train/val/test pour chaque type ===
def split_and_save(df, prefix):
    train_df, temp_df = train_test_split(df, test_size=0.3, stratify=df["label"], random_state=42)
    val_df, test_df = train_test_split(temp_df, test_size=0.5, stratify=temp_df["label"], random_state=42)

    os.makedirs("prepared_data", exist_ok=True)
    train_df.to_csv(f"prepared_data/{prefix}_train.csv", index=False)
    val_df.to_csv(f"prepared_data/{prefix}_val.csv", index=False)
    test_df.to_csv(f"prepared_data/{prefix}_test.csv", index=False)
    df.to_csv(f"prepared_data/{prefix}_all.csv", index=False)

split_and_save(data_short, "fake_news_short")
split_and_save(data_long, "fake_news_long")

print("Données préparées et sauvegardées (short et long séparés) dans 'prepared_data/'")
