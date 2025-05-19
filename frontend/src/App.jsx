import { useState } from 'react'
import './App.css'

function App() {
  const [content,setContent] = useState("")

  return (
    <div>
      <h3>Fake News Detector</h3>
      <form><input 
                type="text" 
                name="article" 
                placeholder="Enter your news article"
                value={content}
                onChange={(e) => setContent(e.target.value)} 
        /></form>
        <button className="icon-button">
        </button>
        <button className="icon-button">
        </button>
    </div>
  )
}

export default App
