import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Lock, Unlock, Trash2, PlusCircle, ArrowLeft, Edit3, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png';
import './AdminPage.css';

// ==========================================
// FORCE PUSH: Synchronisation Vercel UI
// ==========================================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [notices, setNotices] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [notice, setNotice] = useState({ title: '', content: '', category: 'Information' });
  const [imageFile, setImageFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  
  // État pour suivre l'ID de l'annonce en cours de modification
  const [editingId, setEditingId] = useState(null);
  // État pour la modale d'affichage d'image en grand dans l'admin
  const [previewImage, setPreviewImage] = useState(null);

  const ADMIN_SECRET = "butterfly2026";

  const handleLogin = (e) => {
    e.preventDefault();
    if (secretCode === ADMIN_SECRET) {
      setIsAuthenticated(true);
      setErrorMsg('');
      fetchData();
    } else {
      setErrorMsg('Code secret incorrect.');
    }
  };

  const fetchData = async () => {
    try {
      const noticesRes = await axios.get(`${API_URL}/api/notices`);
      setNotices(noticesRes.data);
      const reviewsRes = await axios.get(`${API_URL}/api/reviews`);
      setReviews(reviewsRes.data);
    } catch (err) {
      console.error('Erreur lors du chargement des données admin', err);
    }
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', notice.title || '');
    formData.append('content', notice.content || '');
    formData.append('category', notice.category);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingId) {
        // Mode Modification (PUT)
        await axios.put(`${API_URL}/api/notices/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccessMsg('Note mise à jour avec succès !');
      } else {
        // Mode Création (POST)
        await axios.post(`${API_URL}/api/notices`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSuccessMsg('Note importante publiée avec succès !');
      }

      // Réinitialisation du formulaire
      setNotice({ title: '', content: '', category: 'Information' });
      setImageFile(null);
      setEditingId(null);
      const fileInput = document.getElementById('notice-image-input');
      if (fileInput) fileInput.value = '';

      fetchData();
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setSuccessMsg("Erreur lors de l'enregistrement.");
    }
  };

  // Charger une annonce dans le formulaire pour modification
  const handleEditClick = (n) => {
    setEditingId(n._id);
    setNotice({
      title: n.title || '',
      content: n.content || '',
      category: n.category || 'Information'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNotice({ title: '', content: '', category: 'Information' });
    setImageFile(null);
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette note ?')) {
      try {
        await axios.delete(`${API_URL}/api/notices/${id}`);
        fetchData();
      } catch (err) {
        console.error('Erreur suppression notice', err);
      }
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet avis ?')) {
      try {
        await axios.delete(`${API_URL}/api/reviews/${id}`);
        fetchData();
      } catch (err) {
        console.error('Erreur suppression review', err);
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-top-bar">
        <Link to="/" className="back-home-btn"><ArrowLeft size={18} /> Retour au site</Link>
      </div>

      <div className="admin-container">
        {!isAuthenticated ? (
          <div className="admin-login-box">
            <div className="admin-logo-wrapper">
              <img src={logoImage} alt="Logo Butterfly" className="admin-login-logo" />
            </div>
            <h2><Lock size={22} /> Espace Administration</h2>
            <form onSubmit={handleLogin} className="login-form">
              <input 
                type="password" 
                placeholder="Entrez le code secret..." 
                value={secretCode} 
                onChange={(e) => setSecretCode(e.target.value)} 
                required 
              />
              <button type="submit">Connexion</button>
            </form>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
          </div>
        ) : (
          <div className="admin-dashboard">
            <div className="admin-header-title">
              <h2><Unlock size={24} /> Gestion du Butterfly Learning Center</h2>
              <button className="logout-btn" onClick={() => setIsAuthenticated(false)}>Se déconnecter</button>
            </div>

            {successMsg && <p className="admin-success">{successMsg}</p>}

            <div className="admin-grid-forms">
              <form onSubmit={handleNoticeSubmit} className="admin-form">
                <h3>
                  <PlusCircle size={18} /> 
                  {editingId ? "Modifier l'annonce" : "Publier une note importante (Champs optionnels)"}
                </h3>
                
                <input 
                  type="text" 
                  placeholder="Titre de l'annonce (optionnel)" 
                  value={notice.title} 
                  onChange={(e) => setNotice({ ...notice, title: e.target.value })} 
                />
                <textarea 
                  placeholder="Contenu de la note (optionnel)..." 
                  value={notice.content} 
                  onChange={(e) => setNotice({ ...notice, content: e.target.value })} 
                />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <label style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {editingId ? "Remplacer l'image (optionnel) :" : "Ajouter une image depuis l'ordinateur (optionnel) :"}
                  </label>
                  <input 
                    id="notice-image-input"
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])} 
                    style={{ border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '8px', background: '#fff' }}
                  />
                </div>

                <select 
                  value={notice.category} 
                  onChange={(e) => setNotice({ ...notice, category: e.target.value })}
                >
                  <option value="Information">Information</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Inscription">Inscription</option>
                  <option value="Événement">Événement</option>
                </select>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" style={{ flex: 1 }}>
                    {editingId ? "Mettre à jour l'annonce" : "Publier l'annonce"}
                  </button>
                  {editingId && (
                    <button type="button" onClick={handleCancelEdit} style={{ background: '#64748b', flex: 1 }}>
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="management-section">
              <h3>Notes importantes publiées</h3>
              <div className="manage-list">
                {notices.length > 0 ? (
                  notices.map((n) => (
                    <div key={n._id} className="manage-item" style={{ alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', flex: 1 }}>
                        {/* Miniature cliquable pour visionner l'image */}
                        {n.imageUrl && (
                          <img 
                            src={n.imageUrl} 
                            alt="Miniature" 
                            onClick={() => setPreviewImage(n.imageUrl)}
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: '1px solid #cbd5e1' }}
                            title="Cliquez pour ouvrir l'image"
                          />
                        )}
                        <div>
                          <strong>{n.title || '(Sans titre)'}</strong> <span className="badge">{n.category}</span>
                          <p style={{ marginTop: '5px', color: '#475569' }}>{n.content}</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEditClick(n)} className="edit-btn" title="Modifier" style={{ background: '#e0f2fe', color: '#0284c7', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDeleteNotice(n._id)} className="delete-btn" title="Supprimer">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#64748b' }}>Aucune note publiée.</p>
                )}
              </div>

              <h3>Avis des parents affichés</h3>
              <div className="manage-list">
                {reviews.length > 0 ? (
                  reviews.map((r) => (
                    <div key={r._id} className="manage-item">
                      <div>
                        <strong>{r.parentName}</strong> ({r.rating} ⭐)
                        <p>"{r.comment}"</p>
                      </div>
                      <button onClick={() => handleDeleteReview(r._id)} className="delete-btn" title="Supprimer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#64748b' }}>Aucun avis enregistré.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modale d'agrandissement d'image pour l'admin */}
      {previewImage && (
        <div className="image-modal-backdrop" onClick={() => setPreviewImage(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '2rem' }}>
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewImage(null)} style={{ position: 'absolute', top: '-40px', right: '0', background: 'white', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>
            <img src={previewImage} alt="Agrandissement" style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;