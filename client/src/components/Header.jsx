import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo à 70px, texte à gauche sur PC et masqué sur mobile */}
        <div 
          className="logo-container" 
          onClick={(e) => handleNavClick(e, 'home')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}
        >
          <span className="logo-text desktop-only-text">Butterfly Learning Center</span>
          <img 
            src={logoImage} 
            alt="Logo Butterfly" 
            style={{ width: '70px', height: '70px', objectFit: 'contain' }} 
          />
        </div>

        {/* Navigation Desktop alignée à droite */}
        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="nav-link">Accueil</a>
          <a href="#notices" onClick={(e) => handleNavClick(e, 'notices')} className="nav-link">Annonces</a>
          <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className="nav-link">Avis</a>
          <a href="#footer" onClick={(e) => handleNavClick(e, 'footer')} className="nav-link">Contact</a>
        </nav>
        
        <div className="header-actions">
          {/* Bouton menu mobile */}
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;