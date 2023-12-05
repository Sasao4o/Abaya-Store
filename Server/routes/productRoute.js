const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
router.get("/", productController.getAllProducts);
router.post("/image",productController.addProductImage);
router.post("/",productController.createProduct)
router.get("/count", productController.getProductsCount);
router.post("/search", productController.searchForProducts);
router.get("/:productId", productController.getProductById);
module.exports = router;