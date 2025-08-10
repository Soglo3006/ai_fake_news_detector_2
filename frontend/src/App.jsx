import { useState } from 'react'
import { FaPlus, FaImage,FaRegEdit } from 'react-icons/fa';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Login from "./Login.jsx";
import WelcomePage from "./WelcomePage.jsx";
import Register from './Register.jsx';
import { useRef } from 'react';
import Header from "./Header";
import './index.css';


function HomePage({content,setContent}){
    const [messages, setMessages] = useState([]);
    const[feedbackContent, setFeedbackContent] = useState("");
    const [showFeedback,SetshowFeedback] = useState(false);
    const [expectedLabel, setExpectedLabel] = useState("FAKE");
    const inputRef = useRef(null);
    const [feedbackComment, setFeedbackComment] = useState("");


    const analyzeText = async() => {
        if (content.trim().length < 1) {
            alert("Veuillez entrer un article de nouvelles");
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });
            const data = await response.json();

            const newMessage = {
            text: content,
            result: data,
            };
            setMessages((prev) => [...prev, newMessage]);
            setContent("");
        } catch (error) {
            console.error("Erreur lors de l'analyse :", error);
        }
    };

    const sendFeedback = async () => {
  if (feedbackContent.trim().length < 1) {
    alert("Veuillez entrer un commentaire.");
    return;
  }
  try {
    const response = await fetch('http://127.0.0.1:8000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: feedbackContent,               
        expected_label: expectedLabel, 
        comment: feedbackComment,       
      }),
    });
    const data = await response.json();
    alert(data.message);
    setFeedbackContent(""); 
    setFeedbackComment("");
    SetshowFeedback(false);
  } catch (error) {
    console.error("Erreur lors de l'envoi du feedback :", error);
    alert("Échec de l'envoi du feedback.");
  }
};

    return (
    <div className="+">
      <div className='new-analysis-button'>
        <button onClick={()=>{
          setMessages([]);
          setContent("");
          setExpectedLabel("FAKE");
        }}><FaRegEdit/></button>
      </div>
      <div className='section-page'>
      <h3>Fake News Detector</h3>
      {messages.map((msg, index) => (
  <div key={index} style={{ marginTop: "30px" }}>
    <div style={{ display: "flex", justifyContent: "flex-end",marginTop: "20px" }}>
      <div className='bulle-droite'>
        {msg.text}
      </div>
    </div>
    <div style={{ marginTop: "10px" }}>
      <h3 style={{ fontSize: "22px", color: msg.result.label === "FAKE" ? "red" : "green" }}>
        {msg.result.label} – {Math.round(msg.result.confidence * 100)}%
      </h3>
      <p>Ce texte présente des éléments typiques de {msg.result.label === "FAKE" ? "désinformation" : "contenu fiable"}.</p>
    </div>
  </div>
))}

      <div className='input-bar'>
        <textarea
                name="article" 
                placeholder="Enter your news article"
                className="text-input"
                autoComplete='off'
                value={content}
                ref={inputRef}
                onChange={(e) => setContent(e.target.value)} 
                rows={1}
          />
          <button
  style={{
    position: "fixed",
    bottom: "120px",
    right: "50px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#2e2e2e",
    color: "white",
    border: "none",
    cursor: "pointer"
  }}
  onClick={() => inputRef.current?.scrollIntoView({ behavior: 'smooth' })}
>
  ↓
</button>

        <button className="icon-button" title="Ajouter Une image">
          <FaImage />
        </button>
        <button className="icon-button" title="Ajouter un fichier">
          <FaPlus />
        </button>
        </div>
        </div>
        <button className="analyze-button" onClick={analyzeText}
        >Analyser</button>
        <div className='feedback-link'>
          <button className='feeback-button' onClick={() => {
          if (showFeedback === false){
            SetshowFeedback(true);
          } else {
            SetshowFeedback(false);
          }
          }}>feedback</button>
        </div>
        {showFeedback && (
          <div className="feedback-popup">
          <h4>Votre retour</h4>
          <textarea placeholder="Écrivez le news article que vous avez analysé ici..."
          value={feedbackContent}
          onChange={(e) => setFeedbackContent(e.target.value)}
          ></textarea>
          <label>Étiquette attendue : </label>
          <select
          value={expectedLabel}
          onChange={(e) => setExpectedLabel(e.target.value)}>
            <option value="FAKE">Fake</option>
            <option value="REAL">True</option>
          </select>
          <textarea placeholder="Décrivez ce qui ne va pas..."
          value={feedbackComment}
          onChange={(e) => setFeedbackComment(e.target.value)}
          ></textarea>
          <div className="feedback-button">
          <button className="send-feedback" onClick={()=> sendFeedback()}>Envoyer</button>
          <button className="close-feedback" onClick={() => SetshowFeedback(false)}>Annuler</button>
          
          
          </div>
        </div>
        )}
    </div>
  );
}


function AppContent() {
  const [content, setContent] = useState("");
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/inscrire";

  return (
    <>
      <Routes>
        <Route path="/homepage" element={<HomePage content={content} setContent={setContent} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscrire" element={<Register />} />
        <Route path='/Welcomepage' element={<WelcomePage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
