import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Colonne 1 : Infos & Logo */}
        <div className="footer-col">
          <h3>Butterfly Learning Center</h3>
          <p>
            École de langues et de formations professionnelles pour enfants et adultes. 
            Développez vos compétences et évoluez avec confiance.
          </p>
        </div>

        {/* Colonne 2 : Localisation & Contact */}
        <div className="footer-col">
          <h4>Contact & Localisation</h4>
          <p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Boulevard+du+nord+Tizi+Ouzou+Algeria+15000" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <MapPin size={16} /> Siège principal : Boulevard du nord, Tizi Ouzou, Algeria, 15000
            </a>
          </p>
          <p>
            <a href="tel:0555805807" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} /> 0555 80 58 07
            </a>
          </p>
          <p><Mail size={16} /> butterflylearningcenter.2013@gmail.com</p>
        </div>

        {/* Colonne 3 : Réseaux Sociaux */}
        <div className="footer-col">
          <h4>Suivez-nous</h4>
          <div className="social-icons">
            <a 
              href="https://www.facebook.com/ButterflyLearningCenter?locale=fr_FR" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Facebook"
            >
              <FaFacebook size={18} />
            </a>
            <a 
              href="https://www.instagram.com/ecole.butterfly_cherrak/" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Instagram"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Butterfly Learning Center. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;