import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Star, Send, PlusCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Reviews.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ parentName: '', comment: '', rating: 5 });
  const [msg, setMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef(null);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des avis :', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const SHORT_COMMENT_THRESHOLD = 220;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 500 + 24; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/reviews`, newReview);
      setMsg('Merci ! Votre avis a été publié avec succès.');
      setNewReview({ parentName: '', comment: '', rating: 5 });
      fetchReviews();
      setIsModalOpen(false);
      setTimeout(() => setMsg(''), 4000);
    } catch (err) {
      setMsg("Erreur lors de l'envoi de l'avis.");
    }
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-container">
        <h2>Témoignages </h2>
        <p className="section-subtitle">Découvrez les retours d'expérience des familles ou partagez le vôtre.</p>

        {msg && <p className="review-success-msg">{msg}</p>}

        <div className="review-action-bar">
          <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
            <PlusCircle size={18} /> Ajouter un avis
          </button>
        </div>

        {isModalOpen && (
          <div className="review-modal-backdrop" onClick={() => setIsModalOpen(false)}>
            <form onSubmit={handleSubmit} className="parent-review-modal" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="modal-close-x" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
              <h3>Partagez votre expérience</h3>
              <div className="form-row">
                <input 
                  type="text" 
                  placeholder="Votre nom / Prénom " 
                  value={newReview.parentName} 
                  onChange={(e) => setNewReview({ ...newReview, parentName: e.target.value })} 
                  required 
                />
                <select 
                  value={newReview.rating} 
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  <option value={3}>⭐⭐⭐ (3/5)</option>
                  <option value={2}>⭐⭐ (2/5)</option>
                  <option value={1}>⭐ (1/5)</option>
                </select>
              </div>
              <textarea 
                placeholder="Votre commentaire sur l'école..." 
                value={newReview.comment} 
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} 
                required 
              />
              <button type="submit" className="submit-review-btn"><Send size={16} /> Envoyer mon avis</button>
            </form>
          </div>
        )}

        <div className="reviews-carousel-wrapper">
          {reviews.length > 0 && (
            <button onClick={() => scroll('left')} className="scroll-btn scroll-btn-left" title="Précédent">
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="reviews-slider-wrapper">
            {/* Désactivation du défilement tactile/souris direct */}
            <div 
              className="reviews-slider-container" 
              ref={scrollRef}
              style={{ overflowX: 'hidden', pointerEvents: 'none' }}
            >
              <div className="reviews-track" style={{ pointerEvents: 'auto' }}>
                {reviews.length > 0 ? (
                  reviews.map((review) => {
                    const isShortComment = review.comment.length <= SHORT_COMMENT_THRESHOLD;
                    return (
                      <div
                        key={review._id}
                        className={`review-card${isShortComment ? ' review-card-centered' : ''}`}
                      >
                        <div>
                          <div className="stars">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                            ))}
                          </div>
                          <p className="review-comment">"{review.comment}"</p>
                        </div>
                        <h4 className="review-author">- {review.parentName}</h4>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-reviews">Aucun avis pour le moment. Soyez le premier à en laisser un !</p>
                )}
              </div>
            </div>
          </div>

          {reviews.length > 0 && (
            <button onClick={() => scroll('right')} className="scroll-btn scroll-btn-right" title="Suivant">
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;