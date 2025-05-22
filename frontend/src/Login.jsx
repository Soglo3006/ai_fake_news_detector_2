import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");


    return(
        <div className="Tab-connexion">
            <h2>Fake News Detector</h2>
            <div className="Tab-connexion-form">
                <h3>Connexion</h3>
                <div className="Tab-connexion-form-underline">
                <p>Adresse courriel</p>
                <input 
                type="email" 
                name="mail" 
                className="input-mail"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
                ></input>
                </div>
                <br></br>
                <p>Mot de passe</p>
                <input
                type="password"
                name="mot-passe"
                className="input-mot-passe"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                ></input><br></br>
                <button className="button-connecter">
                    Se connecter
                </button><br></br>
                <p>Aucun compte?</p>
                <Link to="/inscrire">inscrivez-vous</Link>
            </div>
        </div>
    );
}

export default Login;
