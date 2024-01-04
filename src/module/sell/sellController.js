const { createParentChildService } = require("../common/services/createParentChild");
const { deleteParentChildService } = require("../common/services/deleteParentChild");
const { findDataService } = require("../common/services/findDataService");
const sellModel = require("./models/sellModel");
const sellProductsModel = require("./models/sellProductsModel");


exports.sellCreateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const { parent } = req.body;
        const { child } = req.body;

        let data = {};
        let dataModel = {
            parentModel: sellModel,
            childModel: sellProductsModel
        };

        data.userId = id;
        data.parent = parent;
        data.child = child;
        data.message = 'New Purchase has been Created!';
        data.joinPropertyName = 'sellId';

        const result = await createParentChildService(dataModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};



exports.sellFindController = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { search } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;

        const data = {};

        const join = {
            $lookup: {
                from: 'sells',
                localField: 'sellId',
                foreignField: '_id',
                as: 'sell'
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
                { 'sell.note': searchRgx },
                { 'sell.name': searchRgx },
                { 'sell.details': searchRgx }
            ]
            data.searchArray = searchArray;
        }

        data.userId = id;
        data.join = join;
        data.join2 = join2;
        data.page = page;
        data.limit = limit;

        const result = await findDataService(sellProductsModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
};


exports.sellDeleteController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const dataModel = {
            parentModel: sellModel,
            childModel: sellProductsModel
        }

        const data = {
            userId,
            id,
            message: 'Sell has been deleted!',
            joinPropertyName: 'sellId'
        };

        const result = await deleteParentChildService(dataModel, data);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}