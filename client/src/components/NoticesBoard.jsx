import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './NoticesBoard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const NoticesBoard = () => {
  const [notices, setNotices] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/notices`)
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des annonces :', error);
      });
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 350 + 24; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="notices-section" id="notices">
      <div className="notices-container">
        <div className="notices-title-wrapper">
          <h2>Actualités & Événements</h2>
        </div>
        <p className="section-subtitle">Restez informés des actualités et des événements de l'école.</p>
        
        <div className="notices-carousel-wrapper">
          {notices.length > 0 && (
            <button onClick={() => scroll('left')} className="scroll-btn scroll-btn-left" title="Précédent">
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="notices-slider-wrapper">
            <div className="notices-slider-container" ref={scrollRef}>
              <div className="notices-track">
                {notices.length > 0 ? (
                  notices.map((notice) => (
                    <div 
                      key={notice._id} 
                      className={`notice-card ${notice.category ? notice.category.toLowerCase() : 'information'}`}
                      onClick={() => navigate(`/notice/${notice._id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="notice-header">
                        <span className="notice-category">{notice.category || 'Information'}</span>
                        <span className="notice-date">{new Date(notice.createdAt).toLocaleDateString()}</span>
                      </div>
                      {notice.title && <h3>{notice.title}</h3>}
                      {notice.content && <p>{notice.content.substring(0, 100)}...</p>}
                      {notice.imageUrl && (
                        <div className="notice-image-container">
                          {/* Force l'URL en HTTPS */}
                          <img src={notice.imageUrl.replace('http://', 'https://')} alt="Annonce illustration" className="notice-img" />
                          <div className="image-overlay-hint">Cliquez pour lire plus</div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no-notices">
                    <AlertCircle size={24} />
                    <p>Aucune actualité pour le moment.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {notices.length > 0 && (
            <button onClick={() => scroll('right')} className="scroll-btn scroll-btn-right" title="Suivant">
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoticesBoard;