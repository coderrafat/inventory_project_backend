const { Schema, model } = require('mongoose');

const returnSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'customers',
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

const returnModel = model('returns', returnSchema);

module.exports = returnModel;