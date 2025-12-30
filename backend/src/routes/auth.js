const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateSignup, validateLogin } = require("../middleware/validation");
const { authenticate } = require("../middleware/auth");

router.post("/signup", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login);
router.get("/me", authenticate, authController.getCurrentUser);
router.post("/logout", authenticate, authController.logout);

module.exports = router;
