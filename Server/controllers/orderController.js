//const order = require("../models/order");
//const orderedProduct = require("../models/orderedProduct");
const QueryStringBuilder = require("../utilis/QueryStringBuilder");
const Model = require("../models");
const test = require("../test");
const OrderModel = Model.Order;
const ShipmentModel = Model.Shipment;
const OrderProductModel = Model.OrderedProduct;
const ProductModel = Model.Product;
const sequelize = require("../models/index.js").sequelize;
const catchAsync = require("../utilis/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
    const addressInfo = req.body.addressInfo;
    const shipmentData  = {

        address:addressInfo.address,
        city:addressInfo.city,
        shippingDate:addressInfo.shippingDate,
        zipCode:addressInfo.zipCode,
        country:addressInfo.country
     };
    const orderedProductsData = [];
     
    req.body.productsInfo.forEach(v => {
        let obj = {};
        obj.productId = v.productId;
        obj.quantity = v.quantity;
        obj.size = v.size;
        obj.length = v.length;
        orderedProductsData.push(obj);
    });
    const productIds = [1, 2, 3];
    const totalPrice = await ProductModel.findOne({
        attributes: [
          [sequelize.fn('SUM', sequelize.col('price')), 'totalPrice']
        ],
        where: {
          id: productIds
        }
      });
     
      await sequelize.transaction(async (t) => { 
     const order =   await OrderModel.create({orderDate:(new Date(Date.now())).toISOString(), totalPrice:totalPrice.dataValues.totalPrice});
     orderedProductsData.forEach(v => {
        v.orderId = order.id;
     });
     shipmentData.orderId = order.id;
     const orderedProducts =  OrderProductModel.bulkCreate(orderedProductsData);
     console.log(shipmentData)
     const shipment =  ShipmentModel.create(shipmentData);
     await Promise.all([orderedProducts, shipment]);
      });
    // shipmentModel.create({
    //     orderId:orders[j].id,
    //     address:faker.commerce.productName() ,
    //     city:faker.commerce.productName(),
    //     zipCode:faker.commerce.productName(),
    //     shippingDate: (new Date(Date.now())).toISOString(),
    //     country :faker.commerce.productName()
    // });



      return;

    // const orderData ={
    //      userId : req.body.userId,
    //      orderDate : (new Date(Date.now())).toISOString()
    //     };
      
    //     const order = await  orderModel.create(orderData);
    // const orderedProductData = {
    //      orderId : order.id,
    //      productId : req.body.productId
    // };
    // const orderProduct = await  orderProductModel.create(orderedProductData);

    //         res.status(202).json({
    //                 data:orderData,
    //               //  productInfo:orderedProductData.productId,
    //                 status:"success"
    //             })
 });
 
 exports.deleteOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
        const deletedOrderedProduct = await  orderProductModel.destroy({
            where : {
                orderid : orderId 
            }
        });
        const deletedOrder = await  orderModel.destroy({
            where : {
                id : orderId 
            }
        });
                res.status(202).json({
                    status:"success"
                })
       
 });
exports.getOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
    
        const order = await  orderModel.findOne({
                include:{
                    model: Model.orderedProduct,
                    // attributes: ["orderDate"],
                    required : true,
                    include : {
                        model: Model.Product, 
                        required: true 
                        }},
            where : {
                id : orderId 
            }
        });
        let orderInfo = {};
         const fields = ["name","price","image"];
               orderInfo = test.FilterOneObject(order["orderedProducts"][0]["Product"], fields);
               orderInfo["orderDate"] = order["orderDate"];
               //console.log(order[0]["Product"]["name"]);

        if (order) {
                res.status(202).json({
                    orderInfo : orderInfo,
                    status:"success"
                })
        } else {
            res.status(404).json({
                status:"failed",
                message:"no order found with this id"
            });
        }
 });
 exports.getAllOrders = catchAsync(async (req, res, next) => {
        const response = [];
        const queryStringBulder = new QueryStringBuilder(req.query).paginate();
        queryStringResult = queryStringBulder.result;
        console.log(queryStringResult)
        const order = await orderModel.findAll({limit:queryStringResult.limit, offset:queryStringResult.offset});
        for (let i = 0; i < order.length; i++) {
        let orderedProductsData = await order[i].getOrderedProducts();
              let ordereMetaData = {};
              ordereMetaData.orderData = order[i].dataValues;
              ordereMetaData.productDate = orderedProductsData;
              response.push(ordereMetaData);
        }
 
        if (order) {
                res.status(202).json({
                    data:response ,
                    status:"success"
                })
        } else {
            res.status(404).json({
                status:"failed",
                message:"no orders where found"
            });
        }
 });
 exports.getUserOrders = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
        const order = await  orderModel.findAll({
            include : { 
                model: Model.orderedProduct, 
                required: true, 
                include : {
                     model: Model.Product, 
                     required: true 
                    }},
            where : {
                userid : userId 
            }
        });
        let orders =[];
            const fields = ["name","price","image"];
            for(let i = 0 ; i< order.length;i++){
                 orders[i] = test.FilterOneObject(order[i]["orderedProducts"][0]["Product"], fields);
                 orders[i]["orderDate"] = order[i]["orderDate"];
            }
        if (order) {
                res.status(202).json({
                    data:orders,
                    status:"success"
                })
        } else {
            res.status(404).json({
                status:"failed",
                message:"no user found with this id"
            });
        }
 });

 