//const order = require("../models/order");
//const orderedProduct = require("../models/orderedProduct");
const valid = require("../utilis/validTools");
const QueryStringBuilder = require("../utilis/QueryStringBuilder");
const Model = require("../models");
const test = require("../test");
const util = require('util')
const sequelize = require("../models/index.js").sequelize;
const ProductModel = Model.Product;
const ProductImageModel = Model.ProductImage;
const catchAsync = require("../utilis/catchAsync");
const fs = require("fs");
const AppError = require("../utilis/AppError");
exports.createProduct = catchAsync(async (req, res, next) => {
  //TODO we need to make a utility where it checks that all fields in req.body are there (LOOK IN PREV PROJECTS)
 
  if (!req.files.length) {
 
    res.status(404).json({
      status: "failed",
      message: "You must enter an image",
    });
    return;
  }
  const productData = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    categoryId:req.body.categoryId,
    material:req.body.material
  };

  const result = await sequelize.transaction(async (t) => {

      const product = await ProductModel.create(productData, { transaction: t });
      let imagesResult = [];
      await Promise.all(req.files.map(async (v) => {
      const fileName = v.fileName;
      const filePath = v.filePath;
      imagesResult.push({fileName,filePath});
      const imageToDisk =   util.promisify(fs.writeFile)(`${filePath}/${fileName}`, v.buffer);
      const productImage =  ProductImageModel.create({ productId:product.id, fileName,filePath}, { transaction: t });
      await Promise.all([imageToDisk, productImage]);
    }));
    const result = {
      product,
      imagesResult
    };
    return result;

  });
 
 
  res.status(202).json({
    data: result,
    status: "success",
  });
});
exports.addProductImage = catchAsync(async (req, res, next) => {
 
  if ( !req.files) {
    res.status(404).json({
      status: "failed",
      message: "You must enter an image",
    });
    return;
  }
  let results = [];
  console.log(req.files);
  if (req.files) {
  await Promise.all(req.files.map(async (v) => {
    const fileName = v.fileName;
    const filePath = v.filePath;
    results.push({fileName,filePath});
    const contents =   util.promisify(fs.writeFile)(`${filePath}/${fileName}`, v.buffer);
    const productImage =  ProductImageModel.create({ productId:req.body.productId, fileName,filePath});
    await Promise.all([contents, productImage]);
  }));
}  
   res.status(202).json({
    data: {
      productId:req.body.productId,
      results
    },
    status: "success",
  });
});
exports.getProductById = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await ProductModel.findOne({
    where: {
      id: productId
    },
    include:[
      {
        model:ProductImageModel,
        attributes: { exclude: ['productId'] },
        as:'productImages'
      }
    ]
  });
 
  if (product) {
    res.status(202).json({
      data: product,
      status: "success",
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "No Product found with this id",
    });
  }
});
exports.getAllProducts = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const queryStringBulder = new QueryStringBuilder(req.query).paginate();
  // console.log(queryStringBulder.result);
  queryStringResult = queryStringBulder.result;
 
  const product = await ProductModel.findAll({
    limit: queryStringResult.limit,
    offset: queryStringResult.offset,
    include:[
      {
        model:ProductImageModel,
        attributes: { exclude: ['productId'] },
        as:'productImages'
      }
    ]
  });
  //if name makes conflict and u wanna productId use this
  // product.forEach(v => {
  //   console.log(v);
  //   v.dataValues["productId"] = v.dataValues.id;
  //   delete v.dataValues["id"];
  // });
  if (product) {
    res.status(202).json({
      data: product,
      status: "success",
    });
  } else {
    res.status(404).json({
      status: "success",
      message: "No Products Are Available",
    });
  }
});
exports.searchForProducts = catchAsync(async (req, res, next) => {
  const queryStringBulder = new QueryStringBuilder(req.query).paginate();
  queryStringResult = queryStringBulder.result;
  let isValid = true;
  isValid =
    isValid && valid.validNumber(req.body.id) && valid.validWord(req.body.name);
  console.log(valid.filter(req.body));
  const product = await ProductModel.findAll({
    limit: queryStringResult.limit,
    offset: queryStringResult.offset,
    where: valid.filter(req.body),
  });

  console.log(isValid);
  if (product) {
    res.status(202).json({
      data: product,
      status: "success",
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "No Products Are Avialable",
    });
  }
});
exports.getProductsCount = catchAsync(async (req, res, next) => {
  const productsCount = await ProductModel.count({});
  const data = {
    count: productsCount,
  };
  res.status(202).json({
    data,
    status: "success",
  });
});

exports.getProductsByCategory = catchAsync(async (req,res,next) => {
  const queryStringBulder = new QueryStringBuilder(req.query).paginate();
  queryStringResult = queryStringBulder.result;
  const categoryId = req.params.categoryId;
 
  const product = await ProductModel.findAll({
    limit: queryStringResult.limit,
    offset: queryStringResult.offset,
    where:{
      categoryId
    },
    include:[
      {
        model:ProductImageModel,
        attributes: { exclude: ['productId'] },
        as:'productImages'
      }
    ]
 
  });
 
  if (product) {
    res.status(202).json({
      data: product,
      count:product.length,
      status: "success",
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "No Product found with this id",
    });
  }




});
exports.getProductsCountInCategory = catchAsync(async (req, res, next) => {
  const productsCount = await ProductModel.count({
    where:{
      categoryId:req.params.categoryId
    }
  });
  const data = {
    count: productsCount,
  };
  res.status(202).json({
    data,
    status: "success",
  });
});

exports.deleteProductById = catchAsync(async (req,res,next) => {
   
  const productId = req.params.productId;
  let numberOfProductsDeleted;
  const result = await sequelize.transaction(async (t) => {
  await ProductImageModel.destroy({where:{productId}}, {transaction:t})
   numberOfProductsDeleted = await ProductModel.destroy({where :{id:productId}}, {transaction:t});
  });
  res.status(404).json({
    status: "success",
    message: "deleted",
    deleted:numberOfProductsDeleted
  });
});
