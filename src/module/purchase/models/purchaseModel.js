const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'suppliers',
        required: true
    },
    vatTax: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    shippingCost: {
        type: Number
    },
    otherCost: {
        type: Number
    },
    grandTotal: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true, versionKey: false });

const purchaseModel = model('purchases', purchaseSchema);

module.exports = purchaseModel