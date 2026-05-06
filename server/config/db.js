const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected successfully to KrishiConnect!");

    // Seed admin user
    const adminEmail = process.env.admin_mail;
    const adminPass = process.env.admin_pass;
    
    if (adminEmail && adminPass) {
      const existingAdmin = await User.findOne({ email: adminEmail });
      if (!existingAdmin) {
        const adminUser = new User({
          name: 'System Admin',
          email: adminEmail,
          password: adminPass,
          role: 'admin',
          contact: 'N/A'
        });
        await adminUser.save();
        console.log("Admin user seeded successfully from .env credentials!");
      }
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;