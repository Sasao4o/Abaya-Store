const Model = require("../models");

const catchAsync = require("../utilis/catchAsync");

 exports.getProductById = catchAsync(async (req, res, next) => {
    console.log("Hello");
 });