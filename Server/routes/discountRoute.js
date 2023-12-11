const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountController");
 
router.post("/", discountController.createDiscount);
module.exports = router;