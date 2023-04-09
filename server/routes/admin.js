const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/users", adminController.getAllUsers);
router.get("/user/:id", adminController.getUserById);
router.put("/user/:id", adminController.updateUser);
router.delete("/user/:id", adminController.deleteUser);

module.exports = router;
