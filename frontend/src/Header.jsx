import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/homepage");
  };

  return (
    <div>
      {user ? (
        <div
          className="auth-links"
          title="Se déconnecter"
          onClick={logout}
        >
          {user.firstname.charAt(0).toUpperCase()}
        </div>
      ) : (
        <div className="auth-links">
          <Link to="/login"><button className="bouton-connexion">Connexion</button></Link>
          <Link to="/inscrire"><button className="bouton-inscrire">S'inscrire</button></Link>
        </div>
      )}
    </div>
  );
}

export default Header;
