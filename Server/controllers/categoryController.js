const Model = require("../models");
const AppError = require("../utilis/AppError");
const QueryStringBuilder = require("../utilis/QueryStringBuilder");
const categoryModel = Model.Category;

const catchAsync = require("../utilis/catchAsync");
exports.createCategory = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return next(new AppError("You must provide an image",400, true));
    }
    const categoryData = {
        name: req.body.name,
        description: req.body.description,
        fileName: req.file.fileName,
        filePath: req.file.filePath
    };
    const category = await categoryModel.create(categoryData);
    res.status(201).json({
        data: category,
        status: "success"
    })
});


exports.getCategories = catchAsync(async (req, res, next) => {
    const response = [];
    const queryStringBulder = new QueryStringBuilder(req.query).paginate();
    queryStringResult = queryStringBulder.result;
    const categories = await categoryModel.findAll({
        limit: queryStringResult.limit,
        offset: queryStringResult.offset
    });
    res.status(202).json({
        data: categories,
        status: "success"
    })
});



exports.getCategoryById = catchAsync(async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const category = await categoryModel.findOne({
        where: {
            id: categoryId
        }
    });
    if (category) {
        res.status(202).json({
            data: category,
            status: "success",
        });
    } else {
        return next(new AppError("No Category Found", 400, true));
    }
});


exports.deleteCategoryById = catchAsync(async (req, res, next) => {

    const categoryId = req.params.categoryId;
    let numberOfProductsDeleted = await categoryModel.destroy({
        where: {
            id: categoryId
        }
    })
    res.status(200).json({
        status: "success",
        deleted:  numberOfProductsDeleted + " categories is deleted "
    });
});