const createError = require('http-errors');

/**
 * Creates a new service using the provided data model and data.
 *
 * @param {object} dataModel - The data model used to create the service.
 * @param {object} data - The data used to create the service.
 * @param {string} data.userId - The ID of the user associated with the service.
 * @param {string} data.message - The message to include in the response.
 * @return {object} The created service object, including a success flag, the operation performed, a message, and the result of the creation operation.
 */


exports.createService = async (dataModel, data) => {

    let result;

    if (data.exit) {
        const exit = await dataModel.findOne({ name: data.name })
        if (exit) {
            throw createError(
                400,
                `Already Exist this name of your ${data.exit} list.`
            )
        }
    }

    result = await dataModel.create(data)

    return {
        success: true,
        operation: 'create',
        message: data.message,
        data: result
    }
};










