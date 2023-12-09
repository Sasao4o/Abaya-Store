//const order = require("../models/order");
//const orderedProduct = require("../models/orderedProduct");
const QueryStringBuilder = require("../utilis/QueryStringBuilder");
const Model = require("../models");
const test = require("../test");
const OrderModel = Model.Order;
const ShipmentModel = Model.Shipment;
const OrderProductModel = Model.OrderedProduct;
const ProductImageModel = Model.ProductImage;
const ProductModel = Model.Product;
const sequelize = require("../models/index.js").sequelize;
const catchAsync = require("../utilis/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
    const addressInfo = req.body.addressInfo;
    const shipmentData = {

        address: addressInfo.address,
        city: addressInfo.city,
        shippingDate: addressInfo.shippingDate,
        zipCode: addressInfo.zipCode,
        country: addressInfo.country
    };
    const orderedProductsData = [];
    const productsId = [];
    req.body.productsInfo.forEach(v => {
        let obj = {};
        obj.productId = v.productId;
        productsId.push(obj.productId);
        obj.quantity = v.quantity;
        obj.size = v.size;
        obj.length = v.length;
 
        orderedProductsData.push(obj);
    });
 
    const totalPrice = await ProductModel.findOne({
        attributes: [
            [sequelize.fn('SUM', sequelize.col('price')), 'totalPrice']
        ],
        where: {
            id: productsId
        }
    });

    const createdOrder = await sequelize.transaction(async (t) => {
        const order = await OrderModel.create({
            orderDate: (new Date(Date.now())).toISOString(),
            totalPrice: totalPrice.dataValues.totalPrice
        });
        orderedProductsData.forEach(v => {
            v.orderId = order.id;
        });
        shipmentData.orderId = order.id;
        const orderedProducts = OrderProductModel.bulkCreate(orderedProductsData);
        const shipment = ShipmentModel.create(shipmentData);
        await Promise.all([orderedProducts, shipment]);
        return order;
    });
 

            res.status(202).json({
                    data:createdOrder,
 
                    status:"success"
                })

 
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
    const deletedOrderedProduct = await orderProductModel.destroy({
        where: {
            orderid: orderId
        }
    });
    const deletedOrder = await orderModel.destroy({
        where: {
            id: orderId
        }
    });
    res.status(202).json({
        status: "success"
    })

});
exports.getOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;

    const order = await orderModel.findOne({
        include: {
            model: Model.orderedProduct,
            // attributes: ["orderDate"],
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
    let orderInfo = {};
    const fields = ["name", "price", "image"];
    orderInfo = test.FilterOneObject(order["orderedProducts"][0]["Product"], fields);
    orderInfo["orderDate"] = order["orderDate"];
    //console.log(order[0]["Product"]["name"]);

    if (order) {
        res.status(202).json({
            orderInfo: orderInfo,
            status: "success"
        })
    } else {
        res.status(404).json({
            status: "failed",
            message: "no order found with this id"
        });
    }
});
exports.getAllOrders = catchAsync(async (req, res, next) => {
    const response = [];
    const queryStringBulder = new QueryStringBuilder(req.query).paginate();
    queryStringResult = queryStringBulder.result;
    const order = await OrderModel.findAll({
        limit: queryStringResult.limit,
        offset: queryStringResult.offset
    });
    // for (let i = 0; i < order.length; i++) {
    // let orderedProductsData = await order[i].getOrderedProducts();
    //       let ordereMetaData = {};
    //       ordereMetaData.orderData = order[i].dataValues;
    //       ordereMetaData.productsData = orderedProductsData;
    //       response.push(ordereMetaData);
    // }

    if (order) {
        res.status(202).json({
            data: order,
            status: "success"
        })
    } else {
        res.status(404).json({
            status: "failed",
            message: "no orders where found"
        });
    }
});

exports.getOrderById = catchAsync(async (req, res, next) => {
 
    const orderId = req.params.orderId;

    const order = await OrderModel.findOne({
        include: {
            model: Model.OrderedProduct,
            // attributes: ["orderDate"],
            required: true,
            include: {
                model: Model.Product,
                required: true,
                include:{
                    model:ProductImageModel,
                    required:true,
                    as:"productImages"
                }
            }
        },
        where: {
            id: orderId
        }
    });
 

    if (order) {
        res.status(202).json({
            orderInfo: order,
            status: "success"
        })
    } else {
        res.status(404).json({
            status: "failed",
            message: "no order found with this id"
        });
    }
});

exports.changeOrderStatusById = catchAsync(async (req, res,next) => {
    const orderId = req.params.orderId;
    console.log(orderId);
    const order = await OrderModel.findOne({
            where :{
                id:orderId
            }
    });

 
    const updatedOrder = await order.update({orderStatus:req.body.status});
    await order.save();
    res.status(202).json({
        data:updatedOrder,

        status:"success"
    })
   
});