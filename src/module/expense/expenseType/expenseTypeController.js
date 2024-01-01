const { createService } = require("../../common/services/createService");
const { dropdownService } = require("../../common/services/dropdownService");
const { findDataService } = require("../../common/services/findDataService");
const { updateService } = require("../../common/services/updateService");
const expenseTypeModel = require("./expenseTypeModel");
const { expenseTypeValidationSchema } = require("./expenseTypeValidation");


exports.expenseTypeCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const data = await expenseTypeValidationSchema.validateAsync(req.body);

        data.userId = id;
        data.message = "Expense Type has been Created!";

        const result = await createService(expenseTypeModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.expenseTypeUpdateController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { expenseTypeId } = req.params;

        const data = await expenseTypeValidationSchema.validateAsync(req.body);

        data.id = expenseTypeId;
        data.userId = userId;
        data.message = "Expense Type has been Updated!";

        const result = await updateService(expenseTypeModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.expenseTypeFindController = async (req, res, next) => {
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
                { note: searchRgx },
                { 'expenseTypeId.name': searchRgx }
            ]

            data.searchArray = searchArray;
        }


        data.userId = id;
        data.page = page;
        data.limit = limit;

        const result = await findDataService(expenseTypeModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};



exports.expenseTypeDropdownController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const projection = { _id: 1, name: 1 }

        const data = {};

        data.userId = id;
        data.projection = projection;

        const result = await dropdownService(expenseTypeModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};