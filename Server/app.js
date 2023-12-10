const express = require("express");
 
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config({ path: "./config.env" });
var cors = require("cors");
process.on("uncaughtException", (err) => {
  console.log("From the app.js");
  console.log(err);
});

const app = express();
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const orderController = require("./controllers/orderController");
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  orderController.stripeWebhookController
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use((err, req, res, next) => {
  console.log("I CATCHED IT WHILE EXPECTING");
  console.log(err);
  res.json(err);
});
app.listen(3006, () => {
  console.log("Connected To Server...");
});
