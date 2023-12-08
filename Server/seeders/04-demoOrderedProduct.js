'use strict';

  const faker = require('faker');
const db = require("../models/index.js");
const sequelize = db.sequelize;
module.exports = {
    up: (queryInterface, Sequelize) => {

        return sequelize.transaction(function (t) {
            const Product = db.Product;
            const Order = db.Order;
            const OrderedProduct = db.OrderedProduct;
            const Shipment = db.Shipment
            const promises = [];
            promises.push(db.Product.findAndCountAll());
            promises.push(db.Order.findAndCountAll());
            return Promise.all(promises)
                .then(res => {

                    const products = res[0].rows;
                    const productCount = res[0].count;
                    const orders = res[1].rows;
                    const ordersCount = res[1].count;
                    let orderedProductsToSeed = 3;
                  
                    const promises = [];
                    console.log("is " + ordersCount);
                  for (let j = 0; j < ordersCount; j++) {
                    for (let i = 0; i < orderedProductsToSeed; i++) {
                        promises.push(OrderedProduct.create({
                            productId:products[Math.floor(Math.random() * productCount)].id,
                            orderId:orders[j].id,
                            quantity:2,
                            length:3,
                            size:"medium"
                        }, {transaction: t}));
                    }
                    promises.push(Shipment.create({
                      orderId:orders[j].id,
                      address:faker.commerce.productName() ,
                      city:faker.commerce.productName(),
                      zipCode:faker.commerce.productName(),
                      shippingDate: (new Date(Date.now())).toISOString(),
                      country :faker.commerce.productName()
                  }, {transaction: t}));

                  }
                  return   Promise.all(promises)
                        .then(res => {
                            console.log(`[+] ${res.length} OrderedProducts seeded`);
                        }).catch(err => {
                            throw err;
                        });

                }).catch(err => {
                    console.error(err);
                    throw err;
                });
        });

    },

    down: (queryInterface, Sequelize) => {
        return db.sequelize.transaction(function (t) {
          const OrderedProduct = db.OrderedProduct;
          return OrderedProduct.destroy({ where: {} }, { transaction: t })
            .then(() => {
              console.log("[+] OrderedProduct reverted");
            })
            .catch((err) => {
              console.error(err);
              throw err;
            });
        });
      }
};
