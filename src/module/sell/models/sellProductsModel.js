const { Schema, model } = require('mongoose');

const sellProductSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    sellId: {
        type: Schema.Types.ObjectId,
        ref: 'sells',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }

}, { timestamps: true, versionKey: false });


const sellProductsModel = model('sellProducts', sellProductSchema);

module.exports = sellProductsModel;