import { useState } from 'react'
import './App.css'
import { FaPlus, FaImage,FaRegEdit } from 'react-icons/fa';


function App() {
  const [content,setContent] = useState("")

  return (
    <div className="container">
      <div className='new-analysis-button'>
        <button><FaRegEdit/></button>
      </div>
      <div className='auth-links'>
        <button className="bouton-connexion">Connexion</button>
        <button className="bouton-inscrire">S'incrire</button>
      </div>
      <h3>Fake News Detector</h3>
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
        <button className="analyze-button">Analyser</button>
        <div className='feedback-link'>
          <button className='feeback-button'>feedback</button>
        </div>
        <div className="feedback-popup">
          <h4>Votre retour</h4>
          <textarea placeholder="Décrivez ce qui ne va pas..."></textarea>
          <button className="send-feedback">Envoyer</button>
        </div>
    </div>
  )
}

export default App
