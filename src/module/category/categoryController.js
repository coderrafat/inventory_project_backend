const createError = require("http-errors");
const { checkExitDocumentService } = require("../common/services/checkExitDocument");
const { createService } = require("../common/services/createService");
const { dropdownService } = require("../common/services/dropdownService");
const { findDataService } = require("../common/services/findDataService");
const { updateService } = require("../common/services/updateService");
const productModel = require("../product/productModel");
const categoryModel = require("./categoryModel");
const { categoryValidationSchema } = require("./categoryValidation");
const { deleteService } = require("../common/services/deleteService");
const { Types } = require("mongoose");


exports.categoryCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const data = await categoryValidationSchema.validateAsync(req.body);

        data.userId = id;
        data.message = "New Category has been Created!";
        data.exit = 'Category'

        const result = await createService(categoryModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.categoryUpdateController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { categoryId } = req.params;

        const data = await categoryValidationSchema.validateAsync(req.body);

        data.id = categoryId;
        data.userId = userId;
        data.message = "Category has been Updated!";
        data.exit = 'Category'

        const result = await updateService(categoryModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.categoryFindController = async (req, res, next) => {
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

        const result = await findDataService(categoryModel, data);

        return res.status(200).json(result)

    } catch (error) {
        next(error);
    }
};



exports.categoryDropdownController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const projection = { _id: 1, name: 1 }

        const data = {};

        data.userId = id;
        data.projection = projection;

        const result = await dropdownService(categoryModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};




exports.categoryDeleteController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const data = {};
        data.id = id;
        data.userId = userId;
        data.message = 'Category has been Deleted!';

        const existingDocument = await checkExitDocumentService(productModel, { categoryId: new Types.ObjectId(id) });

        if (existingDocument) {
            throw createError('Category can not be deleted because it is associated with products.');
        } else {
            const result = await deleteService(categoryModel, data);

            return res.status(200).json(result)
        }

    } catch (error) {
        next(error);
    }
}