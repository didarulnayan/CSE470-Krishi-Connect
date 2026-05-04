const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Keeping it plain-text for this prototype sprint
  role: { 
    type: String, 
    enum: ['farmer', 'buyer', 'admin'], 
    required: true 
  },
  contact: { type: String } // Added contact field
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);