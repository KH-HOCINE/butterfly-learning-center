const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false, // Rendu non obligatoire
    trim: true,
    default: ''
  },
  content: {
    type: String,
    required: false, // Rendu non obligatoire
    default: ''
  },
  category: {
    type: String,
    enum: ['Urgent', 'Inscription', 'Événement', 'Information'],
    default: 'Information'
  },
  imageUrl: {
    type: String,
    required: false,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notice', noticeSchema);