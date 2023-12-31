const { createParentChildService } = require("../common/services/createParentChild");
const { deleteParentChildService } = require("../common/services/deleteParentChild");
const { findDataService } = require("../common/services/findDataService");
const purchaseModel = require("./models/purchaseModel");
const purchaseProductsModel = require("./models/purchaseProductsModel");


exports.purchaseCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const { parent } = req.body;
        const { child } = req.body;

        let data = {};
        let dataModel = {
            parentModel: purchaseModel,
            childModel: purchaseProductsModel
        };

        data.userId = id;
        data.parent = parent;
        data.child = child;
        data.message = 'New Purchase has been Created!';
        data.joinPropertyName = 'purchaseId';

        const result = await createParentChildService(dataModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};



exports.purchaseFindController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { search } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const data = {};

        const join = {
            $lookup: {
                from: 'purchases',
                localField: 'purchaseId',
                foreignField: '_id',
                as: 'purchase'
            }
        };
        const join2 = {
            $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'product'
            }
        };

        if (search) {
            const searchRgx = { $regex: search, "$options": "i" };
            const searchArray = [
                { 'purchase.note': searchRgx },
                { 'product.name': searchRgx },
                { 'product.details': searchRgx }
            ]
            data.searchArray = searchArray;
        }

        data.userId = id;
        data.join = join;
        data.join2 = join2;
        data.page = page;
        data.limit = limit;

        const result = await findDataService(purchaseProductModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};



exports.purchaseDeleteController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const dataModel = {
            parentModel: purchaseModel,
            childModel: purchaseProductsModel
        }
        const data = {
            userId,
            id,
            joinPropertyName: 'purchaseId'
        };

        const result = await deleteParentChildService(dataModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}