const CropListing = require('../models/CropListing');

const addCrop = async (req, res) => {
  try {
    const { name, category, price, description, imageUrl, farmerName, harvestDate, expiryDate, totalStock, minOrder } = req.body;

    // Backend Validation Logic
    if (Number(minOrder) > Number(totalStock)) {
      return res.status(400).json({ error: "Minimum order cannot be greater than Total Stock!" });
    }

    const newCrop = new CropListing({
      name, 
      category, 
      price, 
      description, 
      imageUrl, 
      farmerName,
      harvestDate,
      expiryDate,
      totalStock,
      minOrder
    });

    await newCrop.save();
    res.status(201).json({ message: "Crop added successfully!", data: newCrop });

  } catch (error) {
    // This logs the exact reason if MongoDB rejects the data
    console.log("🔥 MONGOOSE ERROR:", error.message); 
    res.status(500).json({ error: "Failed to add crop" });
  }
};

module.exports = { addCrop };