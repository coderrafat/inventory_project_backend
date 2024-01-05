const { createService } = require("../common/services/createService");
const { deleteService } = require("../common/services/deleteService");
const { findDataService } = require("../common/services/findDataService");
const { updateService } = require("../common/services/updateService");
const expenseModel = require("./expenseModel");
const { expenseValidationSchema } = require("./expenseValidation");


exports.expenseCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const data = await expenseValidationSchema.validateAsync(req.body);

        data.userId = id;
        data.message = "New Expense has been Created!";

        const result = await createService(expenseModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.expenseUpdateController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { expenseId } = req.params;

        const data = await expenseValidationSchema.validateAsync(req.body);

        data.id = expenseId;
        data.userId = userId;
        data.message = "Expense has been Updated!";

        const result = await updateService(expenseModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.expenseFindController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { search } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const data = {};

        const join = {
            $lookup: {
                from: 'expenseTypes',
                localField: 'expenseTypeId',
                foreignField: '_id',
                as: 'expenseType'
            }
        };

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
        data.join = join;
        data.page = page;
        data.limit = limit;

        const result = await findDataService(expenseModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};



exports.expenseDeleteController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const expenseId = req.params.id;

        const data = {
            userId,
            id: expenseId,
            message: 'Expense has been deleted!'
        };

        const result = await deleteService(expenseModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}





