import React from 'react';
import { Link } from 'react-router-dom'; // <-- Importation de Link
import Header from '../components/Header';
import NoticesBoard from '../components/NoticesBoard';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import eleveImage from '../assets/eleve.png'; 

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      
      <section className="hero-section" id="home">
        <div className="hero-container-split">
          <div className="hero-content">
            
            <h1>Apprenez, développez vos compétences, évoluez avec confiance</h1>
            <p>École de langues et de formations professionnelles pour enfants et adultes. Des programmes sur-mesure pour chaque étape de votre apprentissage.</p>
            <div className="hero-buttons">
              <a href="#notices" className="cta-primary">Voir les annonces</a>
              {/* Utilisation de <Link> au lieu de <a> pour changer de page */}
              <Link to="/about" className="cta-secondary">En savoir plus</Link>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
            <div className="hero-image-backdrop"></div>
            
            <img 
              src={eleveImage} 
              alt="Élève Butterfly Learning Center" 
              className="hero-img-transparent" 
            />
          </div>
        </div>
      </section>

      <NoticesBoard />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;