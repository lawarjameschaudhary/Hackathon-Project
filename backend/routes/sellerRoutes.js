const express = require("express");

const {updateUserToSeller} = require('../controllers/sellerController');

const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/become-seller', authenticateJWT, updateUserToSeller);


module.exports = router;