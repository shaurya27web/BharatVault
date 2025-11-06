const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  phone: String,
  passwordHash: { type: String, required: true },
  upiId: { type: String, default: '' },       // e.g. user@bank (mock)
  language: { type: String, default: 'en' },   // for i18n
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
