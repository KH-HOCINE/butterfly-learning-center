const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rendre le dossier 'uploads' accessible publiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import des routes
const noticeRoutes = require('./routes/noticeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Connexion des routes au serveur
app.use('/api/notices', noticeRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB avec succès'))
  .catch((err) => console.error('Erreur de connexion MongoDB :', err));

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});