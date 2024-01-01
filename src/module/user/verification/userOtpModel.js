const { model, Schema } = require('mongoose');

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '2m'
    }
}, { versionKey: false });

const userOtpModel = model('otps', otpSchema);

module.exports = userOtpModel;