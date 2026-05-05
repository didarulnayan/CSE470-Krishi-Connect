const User = require('../models/User');
const CropListing = require('../models/CropListing');

// --- GET ALL USERS ---
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from the response
    res.status(200).json(users);
  } catch (error) {
    console.error("🔥 Error fetching users for admin:", error.message);
    res.status(500).json({ error: "Server error while fetching users" });
  }
};

// --- GET ALL CROPS ---
const getAllCrops = async (req, res) => {
  try {
    const crops = await CropListing.find();
    res.status(200).json(crops);
  } catch (error) {
    console.error("🔥 Error fetching crops for admin:", error.message);
    res.status(500).json({ error: "Server error while fetching crops" });
  }
};

module.exports = { getAllUsers, getAllCrops };
