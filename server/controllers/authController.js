const User = require('../models/User');

// --- LOGIN LOGIC ---
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password!" });
    }

    res.status(200).json({ 
      message: "Login successful!", 
      user: { id: user._id, name: user.name, role: user.role } 
    });

  } catch (error) {
    console.log("🔥 AUTH ERROR:", error.message);
    res.status(500).json({ error: "Server error during login" });
  }
};

// --- NEW: REGISTRATION LOGIC ---
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered!" });
    }

    // 2. Create the new user
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    // 3. Send back success and instantly log them in
    res.status(201).json({
      message: "Registration successful!",
      user: { id: newUser._id, name: newUser.name, role: newUser.role }
    });

  } catch (error) {
    console.log("🔥 REGISTRATION ERROR:", error.message);
    res.status(500).json({ error: "Server error during registration" });
  }
};

module.exports = { loginUser, registerUser };