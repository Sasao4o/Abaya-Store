const express = require("express");
const AppError = require("./utilis/AppError");
const globalErrorHandler = require("./controllers/errorController");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config({ path: "./config.env" });
var cors = require("cors");
process.on("uncaughtException", (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);

});
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
const app = express();
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const discountRoute = require("./routes/discountRoute");

const orderController = require("./controllers/orderController");
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  orderController.stripeWebhookController
);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/discount", discountRoute);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(3006, () => {
  console.log("Connected To Server...");
});
