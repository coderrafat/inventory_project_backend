const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'brands',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    unit: {
        type: Number,
        required: true
    },
    details: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true, versionKey: false });

const productModel = model('products', productSchema);

module.exports = productModel