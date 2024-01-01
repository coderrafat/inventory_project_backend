const { createService } = require("../common/services/createService");
const { findDataService } = require("../common/services/findDataService");
const { updateService } = require("../common/services/updateService");
const productModel = require("./productModel");
const { productValidationSchema } = require("./productValidation");

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