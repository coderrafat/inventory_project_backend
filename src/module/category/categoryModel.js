const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
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

const categoryModel = model('categories', categorySchema);

module.exports = categoryModel;