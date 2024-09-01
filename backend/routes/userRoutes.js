const express = require('express');

const  { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateJWT, logoutUser);


module.exports = router;