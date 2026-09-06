import React from 'react';
import Header from '../components/Header';
import NoticesBoard from '../components/NoticesBoard';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import eleveImage from '../assets/eleve.png'; // Importation de votre image depuis le dossier assets

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      
      {/* Section Hero moderne en 2 colonnes */}
      <section className="hero-section" id="home">
        <div className="hero-container-split">
          <div className="hero-content">
            
            <h1>Apprenez, développez vos compétences, évoluez avec confiance</h1>
            <p>École de langues et de formations professionnelles pour enfants et adultes. Des programmes sur-mesure pour chaque étape de votre apprentissage.</p>
            <div className="hero-buttons">
              <a href="#notices" className="cta-primary">Voir les annonces</a>
              <a href="#about" className="cta-secondary">En savoir plus</a>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
            {/* Forme décorative rose en arrière-plan */}
            <div className="hero-image-backdrop"></div>
            
            <img 
              src={eleveImage} // Utilisation de la variable importée
              alt="Élève Butterfly Learning Center" 
              className="hero-img-transparent" 
            />
          </div>
        </div>
      </section>

      {/* Notes Importantes */}
      <NoticesBoard />

      {/* Avis des parents */}
      <Reviews />

      <Footer />
    </div>
  );
};

export default Home;