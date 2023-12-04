const test = require("../test");

exports.filter = function filter(reqBody) {
    let conditions = {};
    for (const property in reqBody) {
        if(reqBody[property] != ' '){
            conditions[property] = reqBody[property];
            }
        }
        return conditions;
 }
 exports.validNumber = function validNumber(id) {
   // if(typeof id === "number") return true;
    var reg = /^\d+$/;
    return reg.test(id);
 }
 exports.validWord = function validWord(string) {
    return /^[A-Za-z]+$/.test(string);
 }

