



function WelcomePage(){

    return(
        <div className="Welcome-page">
            <div className="header">
            <h1>Fake News Detector</h1>
            <div className="header-buttons">
            <button>Connexion</button>
            <button>Inscrire</button>
            </div>
            </div>
            <div className="welcome-message">
                <h1>Détecteur d'infox par IA</h1>
                <p>Analysez et identifier les fausses informations grace a notre detecteur.</p>
                <p>Scanner votre actualite en un seul clic</p>
                <button className="start-button">Commencer l'analyse</button>
            </div>
            <div className="app-features">
                <div className="analyse-rapide">
                    <h2>Analyse Rapide</h2>
                    <p>Obtenez des résultats instantanés sur la véracité des informations.</p>
                </div>
                <div className="Resultats-rapide">
                    <h2>Résultats Rapides</h2>
                    <p>Recevez des analyses détaillées en quelques secondes.</p>
                </div>
                <div className="interface-simple">
                    <h2>Interface Simple</h2>
                    <p>Utilisez notre interface intuitive pour une expérience utilisateur fluide.</p>
                </div>
                <div className="footer">
                    <div className="footer-content">
                        <h3>FakeNewsDetector</h3>
                        <p>Votre outil de confiance pour detecter les fausses informations grave a l'intelligence artificielle</p>
                        <h3>Nous contacter</h3>
                        <p>ablbooh0@gmail.com</p>
                        <br></br>
                    </div>
                    <div className="footer-links">
                        <p>2025 FakeNewsDetector. Tous droits réservés</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default WelcomePage;