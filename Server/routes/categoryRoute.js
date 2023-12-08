const express = require("express");
const router = express.Router();
const upload = require("../utilis/uploadFile");
const categoryController = require("../controllers/categoryController");
 
 
router.post("/",upload.uploadOnDisk.single("categoryImage") ,upload.injectFileNameAndPath(), categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/:categoryId", categoryController.getCategoryById);
router.delete("/:categoryId", categoryController.deleteCategoryById);
module.exports = router;