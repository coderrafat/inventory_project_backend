const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
        unique: true,
        trim: true
    },
    profilePic: {
        type: String,
        trim: true,
        default: 'https://res.cloudinary.com/dscxtnb94/image/upload/v1700723393/health_plus/user/download_dxmyep.png'
    },
    otp: {
        code: {
            type: Number,
            default: 0,
        },
        type: {
            type: String,
        }
    },
    status: {
        type: String,
        default: 'unverified'
    }
}, { timestamps: true, versionKey: false });


userSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        this.password = hashedPassword;

        next();

    } catch (error) {
        next(error);
    }
});


const userModel = model('users', userSchema);

module.exports = userModel;