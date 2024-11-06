const express = require('express');
const router = express.Router();
const cors = require('cors')
const checkAuth = require('../middlewares/authMiddlerware');

const { register, login } = require("../controllers/authController");
const { checkUser } = require("../middlewares/authMiddlerware");
//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/register', register);
router.post('/login', login);

module.exports = router