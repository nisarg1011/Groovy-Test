
const express = require("express");
const userController = require("../controllers/user");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewware/verifytoken");
const admin = require("../middlewware/admin");

const router = express.Router();

router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);
router.delete("/:id", verifyTokenAndAuthorization, userController.deleteUser);
router.get("/find/:id", admin, userController.getUserById);
router.get("/", admin, userController.getAllUsers);

module.exports = router;
