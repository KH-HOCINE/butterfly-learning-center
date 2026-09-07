import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Calendar, Tag, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './NoticeDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/notices/${id}`)
      .then((response) => {
        setNotice(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement de l'annonce :", err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="notice-detail-page">
      <Header />
      
      <main className="notice-detail-container">
        <Link to="/" className="back-home-btn">
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>

        {loading ? (
          <div className="notice-status-box">Chargement de l'annonce...</div>
        ) : error || !notice ? (
          <div className="notice-status-box error">
            <AlertCircle size={24} />
            <p>Impossible de charger cette annonce ou elle n'existe plus.</p>
          </div>
        ) : (
          <article className="notice-full-card">
            <div className="notice-full-header">
              <span className={`notice-badge-cat ${notice.category ? notice.category.toLowerCase() : 'information'}`}>
                <Tag size={14} /> {notice.category || 'Information'}
              </span>
              <span className="notice-full-date">
                <Calendar size={14} /> {new Date(notice.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1>{notice.title}</h1>
            
            <div className="notice-full-content">
              <p>{notice.content}</p>
            </div>

            {notice.imageUrl && (
              <div className="notice-full-image-wrapper">
                {/* Force l'URL en HTTPS */}
                <img src={notice.imageUrl.replace('http://', 'https://')} alt={notice.title} className="notice-full-img" />
              </div>
            )}
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NoticeDetail;