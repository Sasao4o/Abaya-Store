const Model = require("../models");
const catchAsync = require("../utilis/catchAsync");
const DiscountModel = Model.Discount;
exports.createDiscount = catchAsync(async (req, res, next) => {
    const discountCode = req.body.discountCode;
    const discountPercentage = req.body.discountPercentage;
    const expiryDate = req.body.expiryDate;
    if (!discountCode || !discountPercentage){ 
        res.status(400).json({
            msg : "Bad discount Create Request"
         });
        return;
    }
    const discount = await DiscountModel.create({
        discountCode: discountCode,
        discountPercentage: parseInt(discountPercentage),
        expiryDate : expiryDate
    });
    if(discount){
        res.status(202).json({
            data: discount
        });
    } else {
        res.status(500).json({msg:"Server Error!"});
    }


});