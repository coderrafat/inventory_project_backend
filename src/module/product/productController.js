const { Types } = require("mongoose");
const { createService } = require("../common/services/createService");
const { findDataService } = require("../common/services/findDataService");
const { updateService } = require("../common/services/updateService");
const productModel = require("./productModel");
const { productValidationSchema } = require("./productValidation");
const createError = require("http-errors");
const { deleteService } = require("../common/services/deleteService");
const { checkExitDocumentService } = require("../common/services/checkExitDocument");
const purchaseProductsModel = require("../purchase/models/purchaseProductsModel");
const sellProductsModel = require("../sell/models/sellProductsModel");
const returnProductsModel = require("../return/models/returnProductsModel");

exports.productCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const data = await productValidationSchema.validateAsync(req.body);

        data.userId = id;
        data.message = "New Product has been Created!";

        const result = await createService(productModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.productUpdateController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        const data = await productValidationSchema.validateAsync(req.body);

        data.id = productId;
        data.userId = userId;
        data.message = "Product has been Updated!";

        const result = await updateService(productModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.productFindController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { search } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const data = {};

        const join = {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        };
        const join2 = {
            $lookup: {
                from: 'brands',
                localField: 'brandId',
                foreignField: '_id',
                as: 'brand'
            }
        };

        if (search) {
            const searchRgx = { $regex: search, "$options": "i" };
            const searchArray = [
                { name: searchRgx },
                { details: searchRgx },
                { 'category.name': searchRgx },
                { 'brand.name': searchRgx }
            ]
            data.searchArray = searchArray;
        }

        data.userId = id;
        data.join = join;
        data.join2 = join2;
        data.page = page;
        data.limit = limit;

        const result = await findDataService(productModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


exports.productDeleteController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const data = {};
        data.id = id;
        data.userId = userId;
        data.message = 'Product has been Deleted!';

        const existingDocument = await checkExitDocumentService(purchaseProductsModel, { productId: new Types.ObjectId(id) });
        const existingDocument2 = await checkExitDocumentService(sellProductsModel, { productId: new Types.ObjectId(id) });
        const existingDocument3 = await checkExitDocumentService(returnProductsModel, { productId: new Types.ObjectId(id) });

        if (existingDocument) {
            throw createError('Product can not be deleted because it is associated with purchases.');
        } else if (existingDocument2) {
            throw createError('Product can not be deleted because it is associated with sells.');

        } else if (existingDocument3) {
            throw createError('Product can not be deleted because it is associated with returns.');
        }
        else {
            const result = await deleteService(productModel, data);

            return res.status(200).json(result)
        }

    } catch (error) {
        next(error);
    }
}