'use strict';

  const faker = require('faker');
const db = require("../models/index.js");
const sequelize = db.sequelize;
module.exports = {
    up: (queryInterface, Sequelize) => {

        return sequelize.transaction(function (t) {
            const Order = db.Order;
            const promises = [];
           
            return Promise.all(promises)
                .then(res => {

             
         
                    let orderToSeed = 5;
                    const promises = [];


                    for (let i = 0; i < orderToSeed; i++) {
                        promises.push(Order.create({

                            orderDate:  (new Date(Date.now())).toISOString(),
                            totalPrice: parseInt(faker.commerce.price(10, 1000, 2)) * 100,
                            orderStatus:"Delivered"
                        }, {transaction: t}));
                    }
                  return   Promise.all(promises)
                        .then(res => {
                            console.log(`[+] ${res.length} Orders seeded`);
                        }).catch(err => {
                            throw err;
                        });

                }).catch(err => {
                    console.error(err);
                    throw err;
                });
        });


        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
    },

    down: (queryInterface, Sequelize) => {
        return db.sequelize.transaction(function (t) {
          const Order = db.Order;
          return Order.destroy({ where: {} }, { transaction: t })
            .then(() => {
              console.log("[+] Orders reverted");
            })
            .catch((err) => {
              console.error(err);
              throw err;
            });
        });
      }
};
