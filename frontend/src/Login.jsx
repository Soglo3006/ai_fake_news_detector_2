import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Fake News Detector
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Connectez-vous pour analyser vos actualités
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Adresse courriel</label>
          <input
            type="email"
            name="mail"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            autoComplete="email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            name="mot-passe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          onClick={async () => {
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
                navigate("/homepage");
              } else {
                alert(data.error);
              }
            }
          }}
        >
          Se connecter
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <Link
              to="/inscrire"
              className="text-blue-600 hover:underline font-medium"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
