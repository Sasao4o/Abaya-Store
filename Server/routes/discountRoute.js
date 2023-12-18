const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountController");
 
router.post("/", discountController.createDiscount);
router.post("/validate", discountController.validateDiscount);

module.exports = router;