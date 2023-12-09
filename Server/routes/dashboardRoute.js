const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
 
router.get("/", dashboardController.getProductById);
module.exports = router;