# test_api.py
import requests

API_URL = "http://127.0.0.1:8000"

def test_analyze():
    text = "NASA successfully landed the Perseverance rover on Mars in February 2021."
    response = requests.post(f"{API_URL}/analyze", json={"content": text})
    print("Analyse:", response.json())

def test_feedback():
    feedback = {
        "content": "Some fake article content",
        "expected_label": "FAKE",
        "comment": "The system misclassified this."
    }
    response = requests.post(f"{API_URL}/feedback", json=feedback)
    print("Feedback:", response.json())

if __name__ == "__main__":
    test_analyze()
    test_feedback()
