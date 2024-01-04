const { createParentChildService } = require("../common/services/createParentChild");
const { deleteParentChildService } = require("../common/services/deleteParentChild");
const { findDataService } = require("../common/services/findDataService");
const returnModel = require("./models/returnModel");
const returnProductsModel = require("./models/returnProductsModel");


exports.returnCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const { parent } = req.body;
        const { child } = req.body;

        let data = {};
        let dataModel = {
            parentModel: returnModel,
            childModel: returnProductsModel
        };

        data.userId = id;
        data.parent = parent;
        data.child = child;
        data.message = 'New Return has been Created!';
        data.joinPropertyName = 'returnId';

        const result = await createParentChildService(dataModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};



exports.returnFindController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { search } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const data = {};

        const join = {
            $lookup: {
                from: 'returns',
                localField: 'returnId',
                foreignField: '_id',
                as: 'return'
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

        const join3 = {
            $lookup: {
                from: 'customers',
                localField: 'customerId',
                foreignField: '_id',
                as: 'customer'
            }
        };

        if (search) {
            const searchRgx = { $regex: search, "$options": "i" };
            const searchArray = [
                { 'return.note': searchRgx },
                { 'return.name': searchRgx },
                { 'return.details': searchRgx }
            ]
            data.searchArray = searchArray;
        }

        data.userId = id;
        data.join = join;
        data.join2 = join2;
        data.join3 = join3;
        data.page = page;
        data.limit = limit;

        const result = await findDataService(returnProductsModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


exports.returnDeleteController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const dataModel = {
            parentModel: returnModel,
            childModel: returnProductsModel
        }
        const data = {
            userId,
            id,
            message: 'Return has been deleted!',
            joinPropertyName: 'returnId'
        };

        const result = await deleteParentChildService(dataModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}