import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (e) => {
    setCurrentLang(e.target.value);
  };

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
        {/* Logo */}
        <div className="logo-container" onClick={(e) => handleNavClick(e, 'home')} style={{ cursor: 'pointer' }}>
          <span className="logo-text">Butterfly Learning Center</span>
        </div>

        {/* Navigation Desktop */}
        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="nav-link">Accueil</a>
          <a href="#notices" onClick={(e) => handleNavClick(e, 'notices')} className="nav-link">Annonces</a>
          <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className="nav-link">Avis</a>
        </nav>

        {/* Sélecteur de langues (3 langues) */}
        <div className="header-actions">
          <div className="lang-selector">
            <Globe size={18} />
            <select value={currentLang} onChange={handleLanguageChange}>
              <option value="FR">Français</option>
              <option value="EN">English</option>
              <option value="AR">العربية</option>
            </select>
          </div>

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