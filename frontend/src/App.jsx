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
    return (
    <div className="container">
      <div className='new-analysis-button'>
        <button><FaRegEdit/></button>
      </div>
      <div className='auth-links'>
        <Link to="/login"><button className="bouton-connexion">Connexion</button></Link>
        <Link to="/inscrire"><button className="bouton-inscrire">S'incrire</button></Link>
      </div>
      <h3>Fake News Detector</h3>
      {messages.map((msg, index) => (
  <div key={index} style={{ marginTop: "30px" }}>
    <div style={{ textAlign: "right" }}>
      <div style={{
        display: "inline-block",
        backgroundColor: "#2e2e2e",
        color: "white",
        padding: "12px 16px",
        borderRadius: "20px",
        maxWidth: "60%",
        textAlign: "left"
      }}>
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
        <button className="analyze-button" onClick={()=>{
          if (content.trim().length <1){
            alert("Veuillez entrer un article de nouvelles");
          }
          const fakeResult = {
            label: "FAKE",
            confidence: 0.92,
          };
          const newMessage = {
            text: content,
            result: fakeResult
          };
          setMessages((prev) => [...prev, newMessage]);
          setContent("");
        }}
        >Analyser</button>
        <div className='feedback-link'>
          <button className='feeback-button'>feedback</button>
        </div>
        <div className="feedback-popup">
          <h4>Votre retour</h4>
          <textarea placeholder="Décrivez ce qui ne va pas..."></textarea>
          <button className="send-feedback">Envoyer</button>
        </div>
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
