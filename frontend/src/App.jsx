import { useState } from 'react'
import './App.css'
import { FaPlus, FaImage,FaRegEdit } from 'react-icons/fa';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import Login from "./Login.jsx";
import Register from './Register.jsx';

function HomePage({content,setContent}){
    const [messages, setMessages] = useState([]);
    const [result, setResult] = useState(null);
    const[feedbackContent, setFeedbackContent] = useState("");
    const [showFeedback,SetshowFeedback] = useState(false);

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
    return (
    <div className="container">
      <div className='new-analysis-button'>
        <button><FaRegEdit/></button>
      </div>
      <div className='auth-links'>
        <Link to="/login"><button className="bouton-connexion">Connexion</button></Link>
        <Link to="/inscrire"><button className="bouton-inscrire">S'incrire</button></Link>
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
                onChange={(e) => setContent(e.target.value)} 
                rows={1}
          />
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
          <textarea placeholder="Décrivez ce qui ne va pas..."
          value={feedbackContent}
          onChange={(e) => setFeedbackContent(e.target.value)}
          ></textarea>
          <div className="feedback-button">
          <button className="send-feedback" onClick={()=> 
            { if (feedbackContent.trim().length<1) {
              alert("Veuillez entrer un feedback");
            } else {
              setFeedbackContent("");
              SetshowFeedback(false);
            }}
          }>Envoyer</button>
          <button className="close-feedback" onClick={() => SetshowFeedback(false)}>Annuler</button>
          
          </div>
        </div>
        )}
    </div>
  );
}
function App() {
  const [content, setContent] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage content={content} setContent={setContent} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscrire" element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
