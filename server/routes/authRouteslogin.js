const User = require('../model/authModellogin'); // Ensure this imports your User model correctly
const express = require('express');
const router = express.Router();


// Route to register a new user
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ errors: { email: "Email is required", password: "Password is required" } });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errors: { email: "User already exists" } });
        }

        // Create a new user
        const newUser = await User.create({ email, password }); // Hash the password before saving in production.
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to login an existing user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ errors: { email: "Email is required", password: "Password is required" } });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: { email: "User not found" } });
        }

        // Check password (you might want to use bcrypt for hashing)
        if (user.password !== password) {
            return res.status(400).json({ errors: { password: "Invalid password" } });
        }

        // Successful login
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
