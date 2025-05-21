import { useState } from "react";

function Login() {
    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");


    return(
        <div>
            <h2>Fake News Detector</h2>
            <h3>Connexion à votre compte</h3>
            <input 
            type="text" 
            name="mail" 
            placeholder="Entrer votre courriel"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            ></input><br></br>
            <input
            type="text"
            name="mot-passe"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            ></input><br></br>
            <button>
                Continuer
            </button><br></br>
            <p>Aucun compte</p>
        </div>
    );
}

export default Login;
