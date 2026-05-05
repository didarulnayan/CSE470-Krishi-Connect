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

// --- DELETE CROP LISTING ---
const deleteCropListing = async (req, res) => {
  try {
    const deletedCrop = await CropListing.findByIdAndDelete(req.params.id);

    if (!deletedCrop) {
      return res.status(404).json({ error: "Crop listing not found" });
    }

    res.status(200).json({ message: "Crop listing deleted successfully" });
  } catch (error) {
    console.error("ðŸ”¥ Error deleting crop listing:", error.message);
    res.status(500).json({ error: "Server error while deleting crop listing" });
  }
};

module.exports = { getAllUsers, getAllCrops, deleteCropListing };
