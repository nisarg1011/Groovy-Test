
const express = require("express");
const orderController = require("../controllers/order");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewware/verifytoken");
const admin = require("../middlewware/admin");

const router = express.Router();

router.post("/", verifyToken, orderController.createOrder);
router.put("/:id", verifyTokenAndAuthorization, orderController.updateOrder);
router.delete("/:id", verifyTokenAndAuthorization, orderController.deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, orderController.getOrdersByUserId);
router.get("/", verifyToken, admin, orderController.getAllOrders);

module.exports = router;


