const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 1. Configuration de Cloudinary avec vos variables d'environnement
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configuration de Multer pour envoyer directement sur Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'butterfly_notices', // Le dossier qui sera créé dans votre Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});
const upload = multer({ storage: storage });

// GET : Récupérer toutes les notes importantes
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET : Récupérer une seule note par son ID
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ error: "Annonce non trouvée" });
    }
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST : Ajouter une nouvelle note
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let imageUrl = '';

    if (req.file) {
      // Cloudinary renvoie directement un lien HTTPS sécurisé dans req.file.path !
      imageUrl = req.file.path; 
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

// PUT : Modifier une note existante
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const updateData = { 
      title: title || '', 
      content: content || '', 
      category: category || 'Information' 
    };

    if (req.file) {
      // Si une nouvelle image est envoyée, on récupère le nouveau lien Cloudinary
      updateData.imageUrl = req.file.path;
    }

    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );

    if (!updatedNotice) {
      return res.status(404).json({ error: "Annonce non trouvée" });
    }

    res.json(updatedNotice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE : Supprimer une note importante
router.delete('/:id', async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;