const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET : Récupérer les avis des parents
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST : Ajouter un nouvel avis
router.post('/', async (req, res) => {
  try {
    const { parentName, comment, rating } = req.body;
    const newReview = new Review({ parentName, comment, rating });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// DELETE : Supprimer un avis
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Avis supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;