const express = require("express");
const upload = require("../utilis/uploadFile");
const router = express.Router();
const productController = require("../controllers/productController");
router.get("/", productController.getAllProducts);
 
router.post("/image",upload.setUploadPath("./public/images/products"), upload.uploadOnMemory.array('file') ,upload.checkUploadingStatus, upload.injectFileNameAndPath(), productController.addProductImage);
router.post("/", upload.setUploadPath("./public/images/products"),upload.uploadOnMemory.array('productImage') , upload.checkUploadingStatus,upload.injectFileNameAndPath(),productController.createProduct);
router.get("/count", productController.getProductsCount);
router.get("/category/:categoryId/count", productController.getProductsCountInCategory);
// router.post("/search", productController.searchForProducts);
router.get("/category/:categoryId", productController.getProductsByCategory);
router.get("/:productId", productController.getProductById);
router.delete("/:productId", productController.deleteProductById);

module.exports = router;