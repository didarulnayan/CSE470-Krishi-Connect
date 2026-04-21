const CropListing = require('../models/CropListing');

// @desc    Fetch all crops
// @route   GET /api/crops
// @access  Public
const getCrops = async (req, res) => {
  try {
    const { search, district, division } = req.query;
    
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (district && district !== 'All') {
      query.district = district;
    }
    if (division && division !== 'All') {
      query.division = division;
    }

    const crops = await CropListing.find(query);
    res.json(crops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching crops' });
  }
};

// @desc    Fetch single crop
// @route   GET /api/crops/:id
// @access  Public
const getCropById = async (req, res) => {
  try {
    const crop = await CropListing.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    res.json(crop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching crop' });
  }
};

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
    console.log("🔥 MONGOOSE ERROR:", error.message); 
    res.status(500).json({ error: "Failed to add crop" });
  }
};

module.exports = {
  getCrops,
  getCropById,
  addCrop
};
