const express = require("express");

const { approveSeller, declineSeller, adminLogin, adminRegister } = require("../controllers/adminController");

const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/admin-login", adminLogin);
router.post("/admin-register", adminRegister);

router.post("/approve-seller/:id", authenticateJWT, approveSeller);
router.post("/decline-seller/:id", authenticateJWT, declineSeller);

module.exports = router;