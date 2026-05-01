const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Vegetable', 'Fruit', 'Grain', 'Spice'], required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true, maxlength: 100 },
  imageUrl: { type: String, required: true },
  farmerName: { type: String, required: true },
  harvestDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  totalStock: { type: Number, required: true },
  minOrder: { type: Number, required: true }
}, { versionKey: false });

module.exports = mongoose.model('CropListing', cropSchema);