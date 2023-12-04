 

const user = require("../models/user");
const Model = require("../models");
const userModel = Model.User;
const authTools = require("../utilis/authTools");
const test = require("../test");
const catchAsync = require("../utilis/catchAsync");
exports.getCertainUser = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
        const user = await  userModel.findOne({where : {id:userId}});
        if (user) {
            const filteredData = {
                email:user.dataValues.email,
                firstName:user.dataValues.firstName,
                lastName:user.dataValues.lastName,
                gender:user.dataValues.gender,
                phoneNumber:user.dataValues.phoneNumber,
                image:user.dataValues.image
             };
                res.status(202).json({
                    data:filteredData,
                    status:"success"
                })
        } else {
            res.status(404).json({
                status:"failed",
                message:"no user found with this id"
            });
        }
 });
 

 exports.getUserProduct = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
        const user = await  userModel.findOne({where : {id:userId}});
        if (user) {
            const filteredData = {
                email:user.dataValues.email,
                firstName:user.dataValues.firstName,
                lastName:user.dataValues.lastName,
                gender:user.dataValues.gender,
                phoneNumber:user.dataValues.phoneNumber,
                image:user.dataValues.image
             };
                res.status(202).json({
                    data:filteredData,
                    status:"success"
                })
        } else {
            res.status(404).json({
                status:"failed",
                message:"no user found with this id"
            });
        }
 });
 