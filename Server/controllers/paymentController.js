const Model = require("../models");
const paymentModel = Model.Payment;
//namingconvention problem
const orderModel = Model.order;
const AppError = require("../utilis/AppError");
const catchAsync = require("../utilis/catchAsync");

exports.payOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
    console.log(orderId);
    const order = await orderModel.findOne({
        include: {
            model: Model.orderedProduct,
            required: true,
            include: {
                model: Model.Product,
                required: true
            }
        },
        where: {
            id: orderId
        }
    });
    let orderedProducts = order.dataValues.orderedProducts
    let price = 0;
    for (let i = 0; i < orderedProducts.length; i++) {
        price = price + orderedProducts[i].dataValues.Product.dataValues.price;
    }


});