const mongoose = require('mongoose');

// ==========================================
// Requirement 1 - Khalid
// MVC ARCHITECTURE: MODEL (The Data Blueprint)
// ==========================================
// This schema defines what a "Crop" looks like in our MongoDB database.
// It ensures that any crop added to the database strictly follows these rules.
const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  // 'enum' means the category MUST be one of these exact words. It prevents bad data!
  category: { type: String, enum: ['Vegetable', 'Fruit', 'Grain', 'Spice'], required: true },
  
  price: { type: Number, required: true },
  
  // 'maxlength' ensures the farmer doesn't write an essay in the description.
  description: { type: String, required: true, maxlength: 100 },
  
  imageUrl: { type: String, required: true }, // Storing image as a simple URL string for this prototype
  farmerName: { type: String, required: true },
  farmerContact: { type: String, required: true }, // Added contact number so buyers can reach them
  harvestDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  totalStock: { type: Number, required: true },
  minOrder: { type: Number, required: true }
}, { versionKey: false }); // versionKey: false removes the annoying default __v field from MongoDB documents

// ==========================================
// End of Requirement 1 - Khalid
// ==========================================

module.exports = mongoose.model('CropListing', cropSchema);