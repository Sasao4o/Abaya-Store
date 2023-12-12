const Model = require("../models");
const AppError = require("../utilis/AppError");
const catchAsync = require("../utilis/catchAsync");
const { Op } = require('sequelize')

const DiscountModel = Model.Discount;
exports.createDiscount = catchAsync(async (req, res, next) => {
    const discountCode = req.body.discountCode;
    const discountPercentage = req.body.discountPercentage;
    const expiryDate = req.body.expiryDate;
    const discount = await DiscountModel.create({
        discountCode: discountCode,
        discountPercentage: parseInt(discountPercentage),
        expiryDate
    });
    if(discount){
        res.status(201).json({
            status:"success",
            data: discount
        });
    }  


});

exports.validateDiscount = catchAsync(async (req,res,next) => {
    const discountCode = req.body.discountCode;
    if (!discountCode) {
          return(next (new AppError("You must enter discount code", 400, true)));
    }
 const result = await   DiscountModel.findAll({
        where: {
            expiryDate:{
        [Op.gte] : new Date()
             }  
        }
      });
       res.json(result);
});