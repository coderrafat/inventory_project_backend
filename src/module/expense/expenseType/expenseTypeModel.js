const { Schema, model } = require('mongoose');

const expenseTypeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true, versionKey: false });

const expenseTypeModel = model('expenseTypes', expenseTypeSchema);

module.exports = expenseTypeModel;