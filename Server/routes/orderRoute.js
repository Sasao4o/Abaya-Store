const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const paymentController = require("../controllers/paymentController");
const authController = require("../controllers/authController");
router.get("/:orderId", orderController.getOrderById);
router.post("/:orderId", orderController.changeOrderStatusById);
router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);
 
router.delete("/:orderId",orderController.deleteOrder);
router.post("/:orderId/pay", paymentController.payOrder);
module.exports = router;