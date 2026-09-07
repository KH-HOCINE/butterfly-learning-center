const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration de Multer pour cette route également
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
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

// POST : Ajouter une nouvelle note avec gestion sécurisée de l'image (HTTPS)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let imageUrl = '';

    if (req.file) {
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