const mongoose = require('mongoose');

// 1. Define the shape of the data
const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  farmerName: { type: String, required: true }
});

// 2. Turn the schema into a Model and export it
module.exports = mongoose.model('CropListing', cropSchema);