'use strict';

  const faker = require('faker');
const db = require("../models/index.js");
const sequelize = db.sequelize;
module.exports = {
    up: (queryInterface, Sequelize) => {

        return sequelize.transaction(function (t) {
            const generatedCategoryNames = new Set();
      
            const Category = db.Category;
            const promises = [];
           
            promises.push(db.Category.findAll());
            return Promise.all(promises)
                .then(res => {

             
         
                    let categoryToSeed = 5;
                    const promises = [];


                    for (let i = 0; i < categoryToSeed; i++) {
                        let categoryName = faker.commerce.productAdjective();
                        while (generatedCategoryNames.has(categoryName)) {
                            categoryName = faker.commerce.productAdjective();
                        }
                        generatedCategoryNames.add(categoryName);
                        promises.push(Category.create({

                            name: categoryName,
                            description: faker.lorem.sentences(2),
                            fileName:"productImage-29 (12)" ,
                            filePath:"./public"
                        }, {transaction: t}));
                    }
                  return   Promise.all(promises)
                        .then(res => {
                            console.log(`[+] ${res.length} Categories seeded`);
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
          const Category = db.Category;
          return Category.destroy({ where: {} }, { transaction: t })
            .then(() => {
              console.log("[+] Categories reverted");
            })
            .catch((err) => {
              console.error(err);
              throw err;
            });
        });
      }
};
