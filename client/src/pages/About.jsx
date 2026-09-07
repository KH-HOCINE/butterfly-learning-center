import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './About.css'; // Le fichier de style qu'on va créer juste après

const About = () => {
  return (
    <div className="about-page">
      <Header />
      
      <main className="about-container">
        <div className="about-header">
          <Link to="/" className="back-home-btn">
            <ArrowLeft size={18} /> Retour à l'accueil
          </Link>
          <h1>À propos de nous</h1>
          <p className="about-subtitle">Découvrez l'histoire, la mission et les valeurs de Butterfly Learning Center.</p>
        </div>

        <div className="about-content">
          <section className="about-section text-section">
            <h2>Notre Mission</h2>
            <p>
              Au <strong>Butterfly Learning Center</strong>, notre mission est de fournir un environnement éducatif stimulant, inclusif et bienveillant. 
              Nous croyons que l'apprentissage est un voyage continu. C'est pourquoi nous offrons des programmes sur-mesure, adaptés aussi bien 
              aux enfants qu'aux adultes, pour les aider à développer leurs compétences linguistiques et professionnelles avec confiance.
            </p>
          </section>

          <section className="about-features">
            <div className="feature-card">
              <div className="feature-icon"><BookOpen size={28} /></div>
              <h3>Pédagogie Moderne</h3>
              <p>Des méthodes d'apprentissage interactives et adaptées au rythme de chaque élève pour garantir une assimilation optimale.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><Users size={28} /></div>
              <h3>Équipe Dévouée</h3>
              <p>Nos enseignants et notre personnel administratif, dont Madame Khelifa et Nedjma, sont là pour accompagner chaque élève avec écoute et bienveillance.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><Star size={28} /></div>
              <h3>Excellence</h3>
              <p>Nous visons l'excellence dans toutes nos formations, pour préparer au mieux nos élèves aux défis de demain (BEM, examens linguistiques, etc.).</p>
            </div>
          </section>

          <section className="about-section text-section">
            <h2>Notre Histoire</h2>
            <p>
              Fondée avec la volonté de créer un véritable cocon d'apprentissage, notre école s'est rapidement imposée comme une référence de confiance 
              pour de nombreuses familles. Comme un papillon (Butterfly) qui prend son envol, nous aidons nos élèves à déployer leurs ailes, 
              à surmonter leurs difficultés et à atteindre de nouveaux sommets professionnels et personnels.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;