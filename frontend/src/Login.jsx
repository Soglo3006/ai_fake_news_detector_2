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
                <div className="Tab-connexion-form-underline-mail">
                <p>Adresse courriel</p>
                <input 
                type="email" 
                name="mail" 
                className="input-mail"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
                ></input>
                </div>
                <div className="Tab-connexion-form-underline-mot-passe">
                <p>Mot de passe</p>
                <input
                type="password"
                name="mot-passe"
                className="input-mot-passe"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                ></input>
                </div>
                <Link to="/homepage"><button className="button-connecter">
                    Se connecter
                </button></Link>
                <div className="form-register">
                <p>Vous n'avez pas de compte?</p>
                <Link to="/inscrire">Inscrivez-vous</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
