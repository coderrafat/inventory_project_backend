const createError = require('http-errors');

/**
 * Updates a service in the data model.
 *
 * @param {Object} dataModel - The data model for the service.
 * @param {Object} data - The data to update the service.
 * @param {string} data.id - The ID of the service to update.
 * @param {string} data.userId - The ID of the user associated with the service.
 * @param {string} data.message - The message to include in the response.
 * @throws {Error} Throws an error if the data is not found.
 * @return {Object} An object with the updated service data.
 */

exports.updateService = async (dataModel, data) => {
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

    result = await dataModel.findOneAndUpdate(
        { _id: data.id, userId: data.userId },
        { $set: data },
        { new: true }
    );

    if (!result) {
        throw createError(404, 'Data not found')
    }

    return {
        success: true,
        orientation: 'update',
        message: data.message,
        data: result
    }
};