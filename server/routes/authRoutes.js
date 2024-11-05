const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test,registerUser,LoginUser,getProfile,logoutUser } = require('../controllers/authController');


//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', LoginUser)
router.post('/profile', getProfile)
router.post('/logout', logoutUser);

module.exports = router