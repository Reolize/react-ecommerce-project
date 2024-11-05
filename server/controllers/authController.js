const User = require('../model/model-user');
const { comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

// Register Endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            });
        }
        // Check if password is valid
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            });
        }
        // Check email
        

        // Create user in the database without hashing the password
        const user = await User.create({
            name,
            email,
            password, // Store the plain password
        });

        return res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login Endpoint
const LoginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ name });
        if (!user) { // Check if user was found
            return res.json({
                error: 'No user found'
            });
        }

        // Check if password matches (you might want to change this logic)
        const match = password === user.password; // Direct comparison
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, '12345678', {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        } else {
            res.json({
                error: "Password does not match"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Logout Endpoint
const logoutUser = (req, res) => {
    res.clearCookie('token'); // Assuming 'token' is the cookie name
    res.json({ message: 'Logged out successfully' });
  };

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, '12345678', {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

module.exports = {
    logoutUser,
    test,
    registerUser,
    LoginUser,
    getProfile
};
