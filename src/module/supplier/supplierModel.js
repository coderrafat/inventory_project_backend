const { Schema, model } = require('mongoose');

const supplierSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
}, { timestamps: true, versionKey: false });

const supplierModel = model('suppliers', supplierSchema);

module.exports = supplierModel;