const { createService } = require("../common/services/createService");
const { dropdownService } = require("../common/services/dropdownService");
const { findDataService } = require("../common/services/findDataService");
const { updateService } = require("../common/services/updateService");
const customerModel = require("./customerModel");
const { customerValidationSchema } = require("./customerValidation");


exports.customerCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const data = await customerValidationSchema.validateAsync(req.body);

        data.userId = id;
        data.message = "New Customer has been Created!";

        const result = await createService(customerModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.customerUpdateController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { customerId } = req.params;

        const data = await customerValidationSchema.validateAsync(req.body);

        data.id = customerId;
        data.userId = userId;
        data.message = "Customer has been Updated!";

        const result = await updateService(customerModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.customerFindController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { search } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const data = {};

        if (search) {
            const searchRgx = { $regex: search, "$options": "i" };
            const searchArray = [
                { name: searchRgx },
                { email: searchRgx },
                { address: searchRgx },
                { phone: searchRgx }
            ]

            data.searchArray = searchArray;
        }

        data.userId = id;
        data.search = search;
        data.page = page;
        data.limit = limit;

        const result = await findDataService(customerModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};



exports.customerDropdownController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const projection = { _id: 1, name: 1 }

        const data = {};

        data.userId = id;
        data.projection = projection;

        const result = await dropdownService(customerModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};