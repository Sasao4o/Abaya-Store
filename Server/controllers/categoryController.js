const Model = require("../models");
 
const categoryModel = Model.Category;
 
const catchAsync = require("../utilis/catchAsync");
exports.createCategory = catchAsync(async (req, res, next) => {
    
    const categoryData ={
         name : req.body.name,
         description : req.body.description,
         image : req.body.image,
        };
      
        const category = await  categoryModel.create(categoryData);
        
   
            res.status(202).json({
                    data:category,
                    status:"success"
                })
 });