const { Schema, model } = require('mongoose');

const purchaseProductSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    purchaseId: {
        type: Schema.Types.ObjectId,
        ref: 'purchases',
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


const purchaseProductModel = model('purchaseProducts', purchaseProductSchema);

module.exports = purchaseProductModel;