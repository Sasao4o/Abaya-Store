const express = require("express");
const upload = require("../utilis/uploadFile");
const router = express.Router();
const productController = require("../controllers/productController");
router.get("/", productController.getAllProducts);
 
router.post("/image", upload.uploadOnMemory.array('file') ,upload.injectFileNameAndPath(), productController.addProductImage);
router.post("/",upload.uploadOnMemory.array('productImage') ,upload.injectFileNameAndPath(),productController.createProduct);
router.get("/count", productController.getProductsCount);
router.post("/search", productController.searchForProducts);
router.get("/category/:categoryId", productController.getProductsByCategory);
router.get("/:productId", productController.getProductById);
router.delete("/:productId", productController.deleteProductById);

module.exports = router;