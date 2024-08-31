const express = require("express");

const  { createService, getAllServices, getServiceById } =require('../controllers/serviceController');

const authenticateJWT = require('../middleware/authMiddleware');


const router = express.Router();


router.post('/', authenticateJWT, createService);

router.get('/', authenticateJWT, getAllServices);
router.get('/:id', authenticateJWT, getServiceById);

module.exports = router;