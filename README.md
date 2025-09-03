# AI Fake News Detector 

## Présentation  
AI Fake News Detector est une application web conçue pour analyser des articles et identifier s'ils sont vrais ou faux à l'aide de modèles de traitement automatique du langage (NLP). Le projet combine intelligence artificielle et développement full-stack afin de créer un outil pratique, moderne et robuste.  

## Fonctionnalités  
* Classification automatique des textes en deux catégories : Fake ou Réel.  
* Gestion aussi bien des textes courts que des articles longs.  
* Interface utilisateur intuitive, responsive et moderne.  
* Système d'authentification et d'historique des analyses.  
* Amélioration continue des modèles selon les besoins et les données.  

## Technologies principales 

### Frontend  
* React.js pour la structure de l'interface  
* Tailwind CSS pour le design responsive  
* Shadcn UI pour l'intégration de composants réutilisables  

### Backend  
* FastAPI pour l'API rapide et performante  
* PostgreSQL pour la gestion des utilisateurs et de l'historique  

### Machine Learning  
* PyTorch pour l'entraînement des modèles  
* Hugging Face Transformers pour le fine-tuning des modèles NLP  
* BERT comme baseline pour les textes ≤ 512 tokens  
* RoBERTa pour améliorer la précision sur les textes courts/moyens  
* Longformer pour la prise en charge des textes longs (> 512 tokens)  
* Google Colab (GPU T4) pour l'entraînement des modèles  

## Jeux de données  
* FakeNewsNet : base d'articles variés (fake et réels)  
* Fake.csv & True.csv (Kaggle) : premier dataset utilisé pour l'entraînement  
* LIAR dataset : testé mais abandonné car trop limité  

## Méthodologie  
1. Préparation et nettoyage des données  
2. Entraînement et comparaison de plusieurs modèles NLP  
3. Fine-tuning adapté à la longueur des textes  
4. Développement d'une interface React connectée au backend FastAPI  
5. Mise en place d'une base de données pour gérer les utilisateurs et leurs analyses  
6. Intégration progressive du système complet (frontend ↔ backend ↔ IA)  

## État du projet  
* Interface React terminée  
* Backend FastAPI opérationnel  
* Base PostgreSQL intégrée  
* Modèle BERT fine-tuné  
* Longformer prévu pour la gestion des textes longs  
* Système d'historique utilisateur en développement  

## Objectif final  
L'objectif de ce projet est de proposer un outil fiable et accessible pour détecter les fake news dans des articles de toute taille. Au-delà de l'application, ce projet met en valeur ma capacité à :  
* travailler sur des projets IA/NLP concrets,  
* développer une application web complète full-stack,  
* utiliser une méthodologie scientifique et expérimentale pour tester et comparer plusieurs approches.
