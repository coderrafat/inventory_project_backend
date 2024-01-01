const { Schema, model } = require('mongoose');


const brandSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },

}, { timestamps: true, versionKey: false });

const brandModel = model('brands', brandSchema);

module.exports = brandModel;