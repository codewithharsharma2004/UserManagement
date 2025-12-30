const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticate, isAdmin } = require("../middleware/auth");

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

router.get("/users", adminController.getAllUsers);
router.put("/users/:userId/activate", adminController.activateUser);
router.put("/users/:userId/deactivate", adminController.deactivateUser);

module.exports = router;
