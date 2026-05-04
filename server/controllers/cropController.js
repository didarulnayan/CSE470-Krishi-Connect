const CropListing = require('../models/CropListing');

// ==========================================
// Requirement 1 - Khalid
// MVC ARCHITECTURE: CONTROLLER (The Brains)
// ==========================================
// Controllers contain the business logic. They receive the 'req' (request) from the user,
// process the data, interact with the Database (Model), and send back a 'res' (response).

// --- ADD NEW CROP ---
const addCrop = async (req, res) => {
  try {
    // 1. Extract all the data sent by the React frontend from the 'req.body'
    const { name, category, price, description, imageUrl, farmerName, farmerContact, harvestDate, expiryDate, totalStock, minOrder } = req.body;

    // 2. Backend Validation Logic
    // We check this on the backend for security, so hackers can't bypass the frontend validation.
    if (Number(minOrder) > Number(totalStock)) {
      return res.status(400).json({ error: "Minimum order cannot be greater than Total Stock!" }); // 400 means "Bad Request"
    }

    // 3. Create a new crop object using our Model
    const newCrop = new CropListing({
      name, category, price, description, imageUrl, farmerName, farmerContact, harvestDate, expiryDate, totalStock, minOrder
    });

    // 4. Save it to MongoDB
    await newCrop.save();
    
    // 5. Send back a success message! 201 means "Created successfully"
    res.status(201).json({ message: "Crop added successfully!", data: newCrop });

  } catch (error) {
    // If anything fails (like MongoDB is down), it lands here so the server doesn't crash.
    console.log("🔥 MONGOOSE ERROR:", error.message); 
    res.status(500).json({ error: "Failed to add crop" }); // 500 means "Internal Server Error"
  }
};

// --- GET FARMER'S CROPS (Requirement 1 Follow-up) ---
const getFarmerCrops = async (req, res) => {
  try {
    // Find all crops where the 'farmerName' matches the URL parameter
    const crops = await CropListing.find({ farmerName: req.params.farmerName });
    res.status(200).json({ data: crops }); // 200 means "OK"
  } catch (error) {
    console.log("🔥 MONGOOSE ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch farmer's crops" });
  }
};

// ==========================================
// End of Requirement 1 - Khalid
// ==========================================

module.exports = { addCrop, getFarmerCrops };