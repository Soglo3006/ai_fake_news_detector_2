import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register(){
    const [name,setName] = useState("")
    const [prenom,setPrenom] = useState("")
    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    const [confirmPassword,SetConfirmPassword] = useState("")
    const [errors, setErrors] = useState({});
    
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
                <div className="error-message">{errors.prenom}</div>
                <p>Nom</p>
                <input
                type="text"
                className="nom-input"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)} 
                ></input>
                <div className="error-message">{errors.name}</div>
            </div>
            <p>Adresse courriel</p>
            <input
                type="email"
                className="mail-input"
                autoComplete="off"
                value={email}
                onChange={(e) => SetEmail(e.target.value)} 
                ></input>
                <div className="error-message">{errors.email}</div>
            <p>Mot de passe</p>
            <input
                type="password"
                className="password-input"
                autoComplete="off"
                value={password}
                onChange={(e) => SetPassword(e.target.value)} 
                ></input>
                <div className="error-message">{errors.password}</div>
            <p>Confirmer le mot de passe</p>
            <input
                type="password"
                className="confirm-passsword-input"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => SetConfirmPassword(e.target.value)} 
                ></input>
                <div className="error-message">{errors.confirmPassword}</div>
            <div className="button-continue">
                <button onClick={()=>{
                    const newErrors = {};

                if (prenom.trim().length < 1 ) {
                    newErrors.prenom = "Saisissez votre prénom";
                }
                if (name.trim().length < 1) {
                    newErrors.name = "Saisissez votre nom";
                }
                if (email.trim().length < 1) {
                    newErrors.email = "Saisissez votre courriel";
                }
                if (password.trim().length < 1) {
                    newErrors.password = "Saisissez un mot de passe";
                } 
                if (confirmPassword.trim().length < 1) {
                    newErrors.confirmPassword = "Confirmez votre mot de passe";
                }
                if (password !== confirmPassword) {
                    newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
                    newErrors.password = "Les mots de passe ne correspondent pas";
                }
                console.log(Object.keys(newErrors));
                if (Object.keys(newErrors).length > 0 ) {
                    setErrors(newErrors);
                }  else{
                    setErrors({});
                }
            }}
                >Continuer</button>
            </div>
            <p>Vous avez déja un compte? <Link to="/login">Connexion</Link></p>
        </div>
        </div>
    );
}

export default Register