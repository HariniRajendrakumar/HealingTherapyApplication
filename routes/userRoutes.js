const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Register User Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create and save a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.json({ message: "User registered successfully!", user: { name, email } });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
});

router.get('/', (req, res) => {
    res.send('Upload API is working');
});

module.exports = router;
