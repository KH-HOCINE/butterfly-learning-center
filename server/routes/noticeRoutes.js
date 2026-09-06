const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

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

// POST : Ajouter une nouvelle note (pour l'administration)
router.post('/', async (req, res) => {
  try {
    const { title, content, category, imageUrl } = req.body;
    const newNotice = new Notice({ 
      title, 
      content, 
      category: category || 'Information',
      imageUrl: imageUrl || '' 
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