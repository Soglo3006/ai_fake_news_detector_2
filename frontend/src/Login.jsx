import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"

function Login() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          Fake News Detector
        </div>
        <LoginForm 
        email={email}
        password={password}
        errors={errors}
        SetEmail={SetEmail}
        SetPassword={SetPassword}
        onSubmit={async (e) => {
          e.preventDefault();
          const errorsLogin = {};
          if (email === "") {
            errorsLogin.email = "Veuillez entrer votre adresse courriel";
          }
          if (password === "") {
            errorsLogin.password = "Veuillez entrer votre mot de passe";
          }
          if (Object.keys(errorsLogin).length > 0) {
            setErrors(errorsLogin);
          } else {
            const response = await fetch("http://127.0.0.1:8000/login", {
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
            if (response.ok) {
              alert(data.message);
              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data.user));
              navigate("/analyse");
            } else {
              alert(data.error);
            }
          }
        }}
        />
      </div>
    </div>
  );
}

export default Login;