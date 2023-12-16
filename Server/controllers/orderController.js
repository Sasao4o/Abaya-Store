//const order = require("../models/order");
//const orderedProduct = require("../models/orderedProduct");
const QueryStringBuilder = require("../utilis/QueryStringBuilder");
const Model = require("../models");
const test = require("../test");
const OrderModel = Model.Order;
const ShipmentModel = Model.Shipment;
const OrderProductModel = Model.OrderedProduct;
const ProductImageModel = Model.ProductImage;
const DiscountModel = Model.Discount;
const ProductModel = Model.Product;
const sequelize = require("../models/index.js").sequelize;
const catchAsync = require("../utilis/catchAsync");
const stripe = require('stripe')(process.env.SECRET_TEST_KEY);
const endpointSecret = process.env.WEBHOOK_ENDPOINT;
const { Op } = require('sequelize');
const AppError = require("../utilis/AppError");
exports.createOrder = catchAsync(async (req, res, next) => {
    const addressInfo = req.body.addressInfo;
    const promoCode = req.body.promoCode;
    const shipmentData = {

        address: addressInfo.address,
        city: addressInfo.city,
        shippingDate: addressInfo.shippingDate,
        zipCode: addressInfo.zipCode,
        country: addressInfo.country
    };
    let shipmentPrice = 0;
    if (shipmentData.city.toString() !== "Abu Dhabi"){
        shipmentPrice += 25;
    }
    const orderedProductsData = [];
    const productsId = [];
    req.body.productsInfo.forEach(v => {
        let obj = {};
        obj.productId = v.id;
        productsId.push(obj.productId);
        obj.quantity = v.quantity;
        obj.size = 6;
        obj.length = 7;

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
    console.log("kkkkkkkk"+totalPrice);
    if(totalPrice.dataValues.totalPrice <= 0){
        return(next (new AppError("We don't have some of those products here", 400, true)));
    }
    let discountPart  = 0;
    if (promoCode !== ""){
        const promoPercent = await DiscountModel.findOne({
            // attributes:[
            //     discountPercentage
            // ],
            where: {
                discountCode : promoCode,
                expiryDate:{
                    [Op.gte] : new Date()
                         }  
            }
        });

        if (!promoPercent) {
            return(next (new AppError("Discount code is not valid", 400, true)));
        }else {
            discountPart += parseInt(parseFloat((promoPercent.dataValues.discountPercentage/100 * totalPrice.dataValues.totalPrice).toFixed(2)));
        }
    } 
    // else {
    //     return(next (new AppError("You must enter discount code", 400, true)));
    // }
   // const cardInfo = req.body.cardInfo;
 
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

    const orderId = createdOrder.dataValues.id.toString();
    const cancel_url_base = "http://localhost:3006/api/v1/order/delete/" + orderId;
    const currentTimestampSeconds = Math.floor(Date.now() / 1000);
    // Calculate the timestamp for 30 minutes from now in seconds
    const thirtyMinutesLaterSeconds = currentTimestampSeconds + 30 * 60;
    console.log(thirtyMinutesLaterSeconds);

    const session = await stripe.checkout.sessions.create({
        success_url: 'https://www.google.com',
        cancel_url: cancel_url_base, 
        line_items: [
          {
            price_data: {
                currency : 'aed',
                product_data : {
                    name : "Total Order"
                },
                unit_amount : parseInt(totalPrice.dataValues.totalPrice - discountPart, 10) * 100
            },
            quantity : 1
          },
          {
            price_data: {
                currency : 'aed',
                product_data : {
                    name : "Shipping Price"
                },
                unit_amount : parseInt(shipmentPrice, 10) * 100
            },
            quantity: 1
        }],
        mode: 'payment',
        metadata: {
            orderId: orderId
        },
        expires_at: thirtyMinutesLaterSeconds,
      });
            res.status(202).json({
                    data:{
                    orderId : orderId
                    ,id : session.id
                    },
                    status:"success",
                    checkOutPage : session.url
                })
                
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
    const deletedOrderedProduct = await OrderProductModel.destroy({
        where: {
            orderId: orderId
        }
    });
    const deletedShipment = await ShipmentModel.destroy({
        where: {
            orderId: orderId
        }
    });
    const deletedOrder = await OrderModel.destroy({
        where: {
            id: orderId
        }
    });
    res.status(202).json({
        status: "success"
    })

});
exports.getDeleteOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
    const deletedOrderedProduct = await OrderProductModel.destroy({
        where: {
            orderId: orderId
        }
    });
    const deletedShipment = await ShipmentModel.destroy({
        where: {
            orderId: orderId
        }
    });
    const deletedOrder = await OrderModel.destroy({
        where: {
            id: orderId
        }
    });
    res.status(202).json({
        status: "success"
    })

});
// exports.getOrder = catchAsync(async (req, res, next) => {
//     const orderId = parseInt(req.params.orderId);

//     const order = await OrderModel.findOne({
//         // include: {
//         //     model: Model.orderedProduct,
//         //     // attributes: ["orderDate"],
//         //     required: true,
//         //     include: {
//         //         model: Model.Product,
//         //         required: true
//         //     }
//         // },
//         where: {
//             id: orderId
//         }
//     });
//     let orderInfo = {};
//     const fields = ["name", "price", "image"];
//     orderInfo = test.FilterOneObject(order["orderedProducts"][0]["Product"], fields);
//     orderInfo["orderDate"] = order["orderDate"];
//     //console.log(order[0]["Product"]["name"]);

//     if (order) {
//         res.status(202).json({
//             orderInfo: orderInfo,
//             status: "success"
//         })
//     } else {
//         res.status(404).json({
//             status: "failed",
//             message: "no order found with this id"
//         });
//     }
// });
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
        return next (new AppError("No Orders Are Available",200 ,true))
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
        return next (new AppError("No Order with this Id",200 ,true))
    }
});

exports.changeOrderStatusById = catchAsync(async (req, res, next) => {
    const orderId = req.params.orderId;
    console.log(orderId);
    const order = await OrderModel.findOne({
        where: {
            id: orderId
        }
    });

    if (order) {
        const updatedOrder = await order.update({
            orderStatus: req.body.status
        });
        await order.save();
        res.status(202).json({
            data: updatedOrder,
            status: "success"
        })
    } else {
        return next (new AppError("No Order with this Id",200 ,true))
    }

    

});

exports.stripeWebhookController = catchAsync(async (request, response, next) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            request.body,
            sig,
            endpointSecret
        );
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed": {
            console.log("Completeddddddddddddddddddddd");
            const orderId = event.data.object.metadata.orderId;
            const order = await OrderModel.findOne({
                where: {
                    id: orderId
                }
            });


            const updatedOrder = await order.update({
                orderStatus: "on the way"
            });
            await order.save();
            response.status(202).json({
                data: updatedOrder,

                status: "success"
            })
            // Then define and call a function to handle the event payment_intent.canceled
            break;

    }
       case "checkout.session.async_payment_failed":{
        const failedOrderId = event.data.object.metadata.orderId;
        const action = await sequelize.transaction(async (t) => {
            const deletedOrderedProduct = await OrderProductModel.destroy({
                where: {
                    orderId: parseInt(failedOrderId)
                }
            },
            {transaction:t}
            );
            const deletedShipment = await ShipmentModel.destroy({
                where: {
                    orderId: parseInt(failedOrderId)
                }
            },
             {transaction:t}
            );
            const deletedOrder = await OrderModel.destroy({
                where: {
                    id: parseInt(failedOrderId)
                }
            }, 
            {transaction:t}
            );
        });
        response.status(202).json({
            status:"success"
        })
        break;
    }
        case "payment_intent.canceled":{
            const failedOrderId = event.data.object.metadata.orderId;
            const action = await sequelize.transaction(async (t) => {
                const deletedOrderedProduct = await OrderProductModel.destroy({
                    where: {
                        orderId: parseInt(failedOrderId)
                    }
                },
                {transaction:t}
                );
                const deletedShipment = await ShipmentModel.destroy({
                    where: {
                        orderId: parseInt(failedOrderId)
                    }
                },
                 {transaction:t}
                );
                const deletedOrder = await OrderModel.destroy({
                    where: {
                        id: parseInt(failedOrderId)
                    }
                }, 
                {transaction:t}
                );
            });
            response.status(202).json({
                status:"success"
            })
            break;
    }
    case "checkout.session.expired": {
        const failedOrderId = event.data.object.metadata.orderId;
        const action = await sequelize.transaction(async (t) => {
            const deletedOrderedProduct = await OrderProductModel.destroy({
                where: {
                    orderId: parseInt(failedOrderId)
                }
            },
            {transaction:t}
            );
            const deletedShipment = await ShipmentModel.destroy({
                where: {
                    orderId: parseInt(failedOrderId)
                }
            },
             {transaction:t}
            );
            const deletedOrder = await OrderModel.destroy({
                where: {
                    id: parseInt(failedOrderId)
                }
            }, 
            {transaction:t}
            );
        });
        response.status(202).json({
            status:"success"
        })
        break;
    }
    case "charge.succeeded":{
        console.log("Charge on Stripe Succeeded");
        break;
    }
    case "payment_intent.succeeded":{
        console.log("payment intent on Stripe Succeeded");
        break;
    }
    case "payment_intent.created":{
        console.log("payment intent on Stripe created");
        break;
    }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
});
