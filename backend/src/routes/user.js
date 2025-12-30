const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");
const { validateUpdateProfile, validateChangePassword } = require("../middleware/validation");

router.get("/profile", authenticate, userController.getProfile);
router.put("/profile", authenticate, validateUpdateProfile, userController.updateProfile);
router.put("/change-password", authenticate, validateChangePassword, userController.changePassword);

module.exports = router;
