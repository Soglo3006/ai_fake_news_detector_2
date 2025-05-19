import { useState } from 'react'
import './App.css'
import { FaPlus, FaImage } from 'react-icons/fa';


function App() {
  const [content,setContent] = useState("")

  return (
    <div className="container">
      <h3>Fake News Detector</h3>
      <div className='input-bar'>
      <form><input 
                type="text" 
                name="article" 
                placeholder="Enter your news article"
                className="text-input"
                value={content}
                onChange={(e) => setContent(e.target.value)} 
        /></form>
        <button className="icon-button">
          <FaImage />
        </button>
        <button className="icon-button">
          <FaPlus />
        </button>
        <button className="analyze-button">Analyser</button>
        </div>
    </div>
  )
}

export default App
