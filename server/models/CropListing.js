const mongoose = require('mongoose');

const cropListingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  farmerName: { type: String, required: true },
  harvestDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  totalStock: { type: Number, required: true },
  minOrder: { type: Number, required: true },
  district: { type: String, default: 'Dhaka' },
  division: { type: String, default: 'Dhaka Division' },
  batchId: { type: String, default: () => new mongoose.Types.ObjectId().toString() }
}, {
  timestamps: true
});

module.exports = mongoose.model('CropListing', cropListingSchema);
