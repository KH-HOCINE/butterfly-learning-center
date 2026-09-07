const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rendre le dossier 'uploads' accessible publiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration de Multer pour stocker les images (chemin absolu sécurisé)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const Notice = require('./models/Notice');

// Route POST pour créer une note (URL dynamique adaptée pour le local et Render)
app.post('/api/notices', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let imageUrl = '';
    
    if (req.file) {
      // Force le protocole https pour éviter les problèmes de Mixed Content sur Vercel
      const protocol = req.get('x-forwarded-proto') || 'https';
      const host = req.get('host');
      imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const newNotice = new Notice({ 
      title: title || '', 
      content: content || '', 
      category: category || 'Information',
      imageUrl 
    });

    const savedNotice = await newNotice.save();
    res.status(201).json(savedNotice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Import des autres routes et connexion MongoDB...
const noticeRoutes = require('./routes/noticeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/notices', noticeRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB avec succès'))
  .catch((err) => console.error('Erreur de connexion MongoDB :', err));

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});