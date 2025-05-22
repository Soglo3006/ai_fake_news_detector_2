import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register(){
    const [name,setName] = useState("")
    const [prenom,setPrenom] = useState("")
    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    const [confirmPassword,SetConfirmPassword] = useState("")
    return(
        <div className="Tab-inscrire">
        <h2>Fake News Detector</h2>
        <div className="Tab-inscrire-form">
            <h3>S'inscrire</h3>
            <div className="nom-prenom">
                <p>Prénom</p><input
                type="text"
                className="prénom-input"
                autoComplete="off"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)} 
                ></input>
                <p>Nom</p>
                <input
                type="text"
                className="nom-input"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)} 
                ></input>
            </div>
            <p>Adresse courriel</p>
            <input
                type="email"
                className="mail-input"
                autoComplete="off"
                value={email}
                onChange={(e) => SetEmail(e.target.value)} 
                ></input>
            <p>Mot de passe</p>
            <input
                type="password"
                className="password-input"
                autoComplete="off"
                value={password}
                onChange={(e) => SetPassword(e.target.value)} 
                ></input>
            <p>Confirmer le mot de passe</p>
            <input
                type="password"
                className="confirm-passsword-input"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => SetConfirmPassword(e.target.value)} 
                ></input>
            <Link to="/homepage">
            <div className="button-continue">
                <br></br><button>Continuer</button>
            </div>
            </Link>
            <p>Vous avez déja un compte? <Link to="/login">Connexion</Link></p>
        </div>
        </div>
    );
}

export default Register