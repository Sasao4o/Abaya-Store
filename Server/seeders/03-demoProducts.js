'use strict';

  const faker = require('faker');
const db = require("../models/index.js");
const sequelize = db.sequelize;
module.exports = {
    up: (queryInterface, Sequelize) => {

        return sequelize.transaction(function (t) {
            const Product = db.Product;
            const Category = db.Category;
            const promises = [];
            promises.push(db.Product.findAndCountAll());
            promises.push(db.Category.findAll());
            return Promise.all(promises)
                .then(res => {

                    const productsCount = res[0].count;
                    const categories = res[1];
                    let productsToSeed = 42;
                    productsToSeed -= productsCount;
                    const promises = [];
                    for (let i = 0; i < productsToSeed; i++) {
                        promises.push(Product.create({
                            name: faker.commerce.productName() + faker.random.number({min: 0, max: 120}),
                            description: faker.lorem.sentences(2),
                            // defaults: min => 0, max => 1000, dec => 2, symbol => ''
                            material:faker.commerce.productMaterial(),
                            categoryId:categories[Math.floor(Math.random() * categories.length)].id,
                            price: parseInt(faker.commerce.price(10, 1000, 2)) * 100, // faker.commerce.price() * 100,
                            image: faker.image.url ,
                        }, {transaction: t}));
                    }
                  return   Promise.all(promises)
                        .then(res => {
                            console.log(`[+] ${res.length} Products seeded`);
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
          const Product = db.Product;
          const ProductImage = db.ProductImage;
          ProductImage.destroy({where:{}},{transaction:t}).catch(err => {throw err});
          return Product.destroy({ where: {} }, { transaction: t })
            .then(() => {
              console.log("[+] Products reverted");
            })
            .catch((err) => {
              console.error(err);
              throw err;
            });
        });
      }
};
