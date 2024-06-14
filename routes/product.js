
const express = require("express");
const productController = require("../controllers/product");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewware/verifytoken");
const admin = require("../middlewware/admin");

const router = express.Router();

router.post("/", verifyToken, admin, productController.createProduct);
router.put("/:id", verifyToken, admin, productController.updateProduct);
router.delete("/:id", verifyToken, admin, productController.deleteProduct);
router.get("/find/:id", verifyToken, productController.getProductById);
router.get("/", verifyToken, productController.getAllProducts);

module.exports = router;

