const { createService } = require("../common/services/createService");
const { dropdownService } = require("../common/services/dropdownService");
const { findDataService } = require("../common/services/findDataService");
const { updateService } = require("../common/services/updateService");
const brandModel = require("./brandModel");
const { brandCreateSchema } = require("./brandValidation")


/**
 * Creates a new brand using the provided request body.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @param {string} req.user.userId - The ID of the user who created the brand.
 * @param {Object} req.body - The request body containing the brand data.
 * @param {string} req.body.name - The name of the brand.
 * @return {Object} The HTTP response object containing the result of the brand creation.
 */

exports.brandCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const data = await brandCreateSchema.validateAsync(req.body);

        data.userId = id;
        data.message = 'New brand has been Created!';
        data.exit = 'Brand'

        const result = await createService(brandModel, data);

        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
};



/**
 * Updates a brand in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @param {string} req.user.userId - The ID of the user who created the brand.
 * @param {Object} req.body - The request body containing the brand data.
 * @param {string} req.body.name - The name of the brand.
 * @return {Object} The updated brand object.
 */

exports.brandUpdateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const data = await brandCreateSchema.validateAsync(req.body);

        data.id = id;
        data.userId = userId;
        data.message = 'Brand has been Updated!';
        data.exit = 'Brand'

        const result = await updateService(brandModel, data);

        return res.status(200).json(result)
    } catch (error) {
        next(error);
    }
};


/**
 * Controller function to find brands.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @param {string} req.user.userId - The ID of the user who created the brand.
 * @param {string} req.query.search - The search query.
 * @param {number} req.query.page - The page number.
 * @param {number} req.query.limit - The number of items per page.
 * @return {Object} The result of the find operation.
 */

exports.brandFindController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { search } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const data = {};

        if (search) {
            const searchRgx = { $regex: search, "$options": "i" };
            const searchArray = [
                { name: searchRgx }
            ]

            data.searchArray = searchArray;
        }

        data.userId = id;
        data.search = search;
        data.page = page;
        data.limit = limit;

        const result = await findDataService(brandModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};




/**
 * Controller function for handling brand dropdown requests.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @param {string} req.user.userId - The ID of the user who created the brand.
 * @return {Object} The response object containing the result of the dropdown service.
 */

exports.brandDropdownController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const projection = { _id: 1, name: 1 };

        const data = {};

        data.userId = id;
        data.projection = projection;

        const result = await dropdownService(brandModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};