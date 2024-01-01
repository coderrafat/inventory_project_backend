/**
 * Retrieves dropdown data from the provided data model.
 *
 * @param {dataModel} dataModel - The data model used for retrieving the dropdown data.
 * @param {data} data - Additional data for retrieving the dropdown data.
 * @param {string} data.userId - The ID of the user who owns the data.
 * @param {string} data.projection - The projection of the data to retrieve.
 * @return {Object} - An object containing the success status, operation type, and retrieved data.
 */


exports.dropdownService = async (dataModel, data) => {
    const result = await dataModel.find({ userId: data.userId }, data.projection)

    return {
        success: true,
        operation: 'read',
        data: result
    }
};