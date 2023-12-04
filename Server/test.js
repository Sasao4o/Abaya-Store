function filter(object,fieldsToFilter){
    let filteredData = {};
    for (let i = 0; i < fieldsToFilter.length; i++) {
        filteredData[fieldsToFilter[i]] = object[fieldsToFilter[i]];
      }
      return filteredData;
}

exports.FilterOneObject=function FilterOneObject(object, fieldsToFilter){
       return filter(object,fieldsToFilter);
}
exports.FilterMultipleObjects=function FilterMultipleObjects(object, fieldsToFilter){
    let fil = [];
    for (let i = 0; i < object.length; i++) {
        fil[i] = filter(object[i],fieldsToFilter);
    }
    return fil;
}
// let object = [{
//     "name": "John",
//     "age": 30,
//     "address": {
//         "street": "Main Street",
//         "city": "New York",
//         "state": "NY"
//         }
// },
// {
//     "name": "Johna",
//     "age": 30,
//     "address": {
//         "street": "Main Street",
//         "city": "New York",
//         "state": "NY"
//         }
// }
// ]
// let fieldsToFilter = ["name","age","address"];


