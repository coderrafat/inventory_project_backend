const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    profilePic: {
        type: String,
        trim: true,
        default: 'https://res.cloudinary.com/dscxtnb94/image/upload/v1700723393/health_plus/user/download_dxmyep.png'
    },
    status: {
        type: String,
        default: 'unverified'
    }
}, { timestamps: true, versionKey: false });

const userModel = model('users', userSchema);

module.exports = userModel;