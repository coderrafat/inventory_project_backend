const { createService } = require("../common/services/createService");
const { dropdownService } = require("../common/services/dropdownService");
const { findDataService } = require("../common/services/findDataService");
const { updateService } = require("../common/services/updateService");
const { supplierValidationSchema } = require("./supplierValidation");
const supplierModel = require("./supplierModel");
const { Types } = require("mongoose");
const createError = require("http-errors");
const { deleteService } = require("../common/services/deleteService");
const purchaseModel = require("../purchase/models/purchaseModel");
const { checkExitDocumentService } = require("../common/services/checkExitDocument");


exports.supplierCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const data = await supplierValidationSchema.validateAsync(req.body);

        data.userId = id;
        data.message = "New Supplier has been Created!";

        const result = await createService(supplierModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.supplierUpdateController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { supplierId } = req.params;

        const data = await supplierValidationSchema.validateAsync(req.body);

        data.id = supplierId;
        data.userId = userId;
        data.message = "Supplier has been Updated!";

        const result = await updateService(supplierModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.supplierFindController = async (req, res, next) => {
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

        const result = await findDataService(supplierModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};



exports.supplierDropdownController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const projection = { _id: 1, name: 1 }

        const data = {};

        data.userId = id;
        data.projection = projection;

        const result = await dropdownService(supplierModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


exports.supplierDeleteController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const data = {};
        data.id = id;
        data.userId = userId;
        data.message = 'Supplier has been Deleted!';

        const existingDocument = await checkExitDocumentService(purchaseModel, { supplierId: new Types.ObjectId(id) });

        if (existingDocument) {
            throw createError('Supplier can not be deleted because it is associated with purchases.');
        } else {
            const result = await deleteService(supplierModel, data);

            return res.status(200).json(result)
        }

    } catch (error) {
        next(error);
    }
}