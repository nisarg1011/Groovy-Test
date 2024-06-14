
const express = require("express");
const cartController = require("../controllers/cart");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewware/verifytoken");
const admin = require("../middlewware/admin");

const router = express.Router();

router.post("/", verifyToken, cartController.createCart);
router.put("/:id", verifyTokenAndAuthorization, cartController.updateCart);
router.delete("/:id", verifyTokenAndAuthorization, cartController.deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, cartController.getCartByUserId);
router.get("/", verifyToken, admin, cartController.getAllCarts);

module.exports = router;
