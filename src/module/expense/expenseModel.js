const { Schema, model } = require('mongoose');

const expenseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    expenseTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'expenseTypes',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true, versionKey: false });

const expenseModel = model('expenses', expenseSchema);

module.exports = expenseModel;