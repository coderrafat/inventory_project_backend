// const createError = require('http-errors');

// exports.checkExistDocumentSerivce = async (dataModel, data) => {

//     console.log(data)

//     for (let i = 0; i < data.document.length; i++) {
//         const element = data.document[i];

//         const result = await dataModel.findById(element);

//         if (!result) {
//             throw createError(404, `Does not exist ${data.text}`);
//         }

//         return result;

//     }

// }