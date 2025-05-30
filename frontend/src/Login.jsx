import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


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
                autoComplete="off"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
                ></input>
                </div>
                <div className="error-message">{errors.email}</div>
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
                <div className="error-message">{errors.password}</div>
                <button className="button-connecter"
                onClick={async ()=>{
                    const errorsLogin ={};
                    if(email === ""){
                        errorsLogin.email = "Veuillez entrer votre adresse courriel";
                    }
                    if(password === ""){
                        errorsLogin.password = "Veuillez entrer votre mot de passe";
                    }
                    console.log((errorsLogin));
                    if (Object.keys(errorsLogin).length > 0){
                        setErrors(errorsLogin);
                    } else {
                        const response = await fetch("http://127.0.0.1:8000/login",{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email,
                                password,
                            }),
                        });
                        const data = await response.json();
                        if (response.ok){
                            alert(data.message)
                            navigate("/homepage")
                        } else {
                            alert(data.error);
                        }
                    } 
                }}>
                    Se connecter
                </button>
                <div className="form-register">
                <p>Vous n'avez pas de compte?</p>
                <Link to="/inscrire">Inscrivez-vous</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
