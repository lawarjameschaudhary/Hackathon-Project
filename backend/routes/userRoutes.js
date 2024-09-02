const express = require('express');

const  { registerUser, loginUser, logoutUser, updateProfile, getUser } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateJWT, logoutUser);
router.post('/update-profile', authenticateJWT, upload.single('image'), updateProfile);

router.get('/profile', authenticateJWT, getUser);

module.exports = router;