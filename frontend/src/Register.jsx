import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterForm } from "@/components/register-form"

function Register() {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();



  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <div className="flex items-center gap-2 self-center font-medium">
              Fake News Detector
            </div>
            <RegisterForm 
            name={name}
            prenom={prenom}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            errors={errors}
            SetName={setName}
            SetPrenom={setPrenom}
            SetConfirmPassword={SetConfirmPassword}
            SetEmail={SetEmail}
            SetPassword={SetPassword}
            onSubmit={async (e) => {
              e.preventDefault();
              const newErrors = {};
              if (prenom.trim().length < 1) {
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
              newErrors.confirmPassword =
                "Les mots de passe ne correspondent pas";
              newErrors.password = "Les mots de passe ne correspondent pas";
            }
            if (Object.keys(newErrors).length > 0) {
              setErrors(newErrors);
            } else {
              const response = await fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  firstname: prenom,
                  lastname: name,
                  email,
                  password,
                }),
              });
              const data = await response.json();
              if (response.ok) {
                alert(data.message);
                navigate("/analyse");
              } else {
                alert("Erreur d'inscription");
              }
            }
          }}
            />
          </div>
        </div>
  );
}

export default Register;
