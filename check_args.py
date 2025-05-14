from transformers import TrainingArguments
import inspect

print("Fichier d'origine :", inspect.getfile(TrainingArguments))
print("Source du module :", TrainingArguments.__module__)
