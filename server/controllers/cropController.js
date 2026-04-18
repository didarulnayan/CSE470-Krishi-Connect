// Import the Model we just created
const CropListing = require('../models/CropListing');

// The logic to add a new crop
const addCrop = async (req, res) => {
  try {
    // 1. Get the data that React sent in the request body
    const { name, price, description, farmerName } = req.body;

    // 2. Create a new crop using our Model
    const newCrop = new CropListing({
      name: name,
      price: price,
      description: description,
      farmerName: farmerName
    });

    // 3. Save it to MongoDB
    await newCrop.save();

    // 4. Send a success message back to React
    res.status(201).json({ message: "Crop added successfully!", data: newCrop });

  } catch (error) {
    // If anything goes wrong, send an error back
    res.status(500).json({ error: "Failed to add crop" });
  }
};

module.exports = { addCrop };