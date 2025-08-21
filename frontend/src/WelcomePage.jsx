import { FaSearch, FaBolt, FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col">
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">Fake News Detector</h1>
            <div className="space-x-4">
                <Link to="/login">
            <button className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Connexion
            </button></Link>
            <Link to="/inscrire">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                S'inscrire
            </button>
            </Link>
            </div>
        </header>
        <section className="flex flex-col items-center text-center px-6 py-16">
            <h1 className="font-extrabold text-5xl sm:text-6xl text-gray-800 mb-6">
            Détectez les nouvelles fausses
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Analysez et identifiez les fausses informations grâce à notre outil intelligent. 
            Scannez vos actualités en un seul clic et obtenez des résultats fiables.
            </p>
            <Link to="/login">
            <button className="rounded-full px-6 py-3 bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all">
            Commencer l'analyse
            </button>
            </Link>
        </section>
        <section className="flex flex-wrap justify-center gap-6 px-6 py-10">
            <FeatureCard
            icon={<FaSearch className="text-blue-500 text-4xl" />}
            title="Analyse Rapide"
            description="Obtenez des résultats instantanés sur la véracité des informations."
            />
            <FeatureCard
            icon={<FaBolt className="text-yellow-500 text-4xl" />}
            title="Résultats Rapides"
            description="Recevez des analyses détaillées en quelques secondes."
            />
            <FeatureCard
            icon={<FaLaptopCode className="text-purple-500 text-4xl" />}
            title="Interface Simple"
            description="Profitez d'une interface intuitive et agréable à utiliser."
            />
        </section>
        <footer className="bg-gray-900 text-gray-300 mt-auto py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <a href="mailto:ablbooh0@gmail.com" className="mb-4">ablbooh0@gmail.com</a>
            <hr className="my-6 border-gray-700" />
            <p className="text-sm">
                &copy; {new Date().getFullYear()} FakeNewsDetector. Tous droits réservés.
            </p>
            </div>
        </footer>
        </div>
    );
    }

function FeatureCard({ icon, title, description }) {
    return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center hover:shadow-2xl transition-shadow">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h2 className="font-bold text-2xl mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default WelcomePage;
