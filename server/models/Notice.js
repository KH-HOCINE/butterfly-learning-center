const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  content: {
    type: String,
    required: false,
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