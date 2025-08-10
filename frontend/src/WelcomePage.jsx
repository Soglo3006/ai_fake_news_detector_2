function WelcomePage(){

    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">Fake News Detector</h1>
            <div className="space-x-4">
            <button className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            Connexion
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            S'inscrire
          </button>
            </div>
            </div>
            <div className="">
                <h1>Détecteur d'infox par IA</h1>
                <p>Analysez et identifier les fausses informations grace a notre detecteur.</p>
                <p>Scanner votre actualite en un seul clic</p>
                <button className="">Commencer l'analyse</button>
            </div>
            <div className="">
                <div className="">
                    <h2>Analyse Rapide</h2>
                    <p>Obtenez des résultats instantanés sur la véracité des informations.</p>
                </div>
                <div className="">
                    <h2>Résultats Rapides</h2>
                    <p>Recevez des analyses détaillées en quelques secondes.</p>
                </div>
                <div className="">
                    <h2>Interface Simple</h2>
                    <p>Utilisez notre interface intuitive pour une expérience utilisateur fluide.</p>
                </div>
                <div className="">
                    <div className="">
                        <h3>FakeNewsDetector</h3>
                        <p>Votre outil de confiance pour detecter les fausses informations grave a l'intelligence artificielle</p>
                        <h3>Nous contacter</h3>
                        <p>ablbooh0@gmail.com</p>
                        <br></br>
                    </div>
                    <div className="">
                        <p>2025 FakeNewsDetector. Tous droits réservés</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default WelcomePage;