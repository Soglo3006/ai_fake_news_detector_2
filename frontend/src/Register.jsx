import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Fake News Detector
        </h2>
        <h3 className="text-lg text-gray-600 text-center mb-6">
          Créez votre compte
        </h3>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Prénom</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          {errors.prenom && (
            <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nom</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Adresse courriel</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={confirmPassword}
            onChange={(e) => SetConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
          onClick={async () => {
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
                navigate("/homepage");
              } else {
                alert("Erreur d'inscription");
              }
            }
          }}
        >
          Continuer
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
