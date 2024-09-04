const express = require("express");

const { approveSeller, declineSeller, adminLogin, adminRegister, getSellersApplication } = require("../controllers/adminController");

const authenticateJWT = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/admin-login", adminLogin);
router.post("/admin-register", adminRegister);

router.put("/approve-seller/:id", authenticateJWT, approveSeller);
router.put("/decline-seller/:id", authenticateJWT, declineSeller);

router.get("/sellers-application", authenticateJWT, getSellersApplication);


module.exports = router;    