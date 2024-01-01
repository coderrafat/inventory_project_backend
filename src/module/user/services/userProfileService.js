const bcrypt = require('bcrypt');
const createError = require('http-errors');
const userOtpModel = require('../verification/userOtpModel');
const { userProfileUpdateSchema } = require('../userValidationSchema');

exports.userProfile = async (dataModel, id) => {
    const user = await dataModel.findById(id, {
        _id: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0
    });

    return { success: true, data: user }
};




exports.userProfileUpdate = async (dataModel, userData, id) => {

    const user = await dataModel.findByIdAndUpdate(id, userData, { new: true })

    user.password = undefined;
    return { success: true, data: user }
};



exports.userPasswordUpdate = async (dataModel, id, data) => {

    const user = await dataModel.findById(id);

    const checkPassword = await bcrypt.compare(data.currentPassword, user.password);

    if (!checkPassword) {
        throw createError(404, 'Current Password is incorrect')
    } else {

        const hashedPassword = await bcrypt.hash(data.newPassword, 12);

        await dataModel.findByIdAndUpdate(id,
            { password: hashedPassword },
            { new: true }
        )
        return {
            success: true,
            message: "Password Updated"
        }
    }
};



exports.userPasswordResetService = async (dataModel, userData) => {
    const exit = await userOtpModel.findOne({ email: userData.email });

    if (!exit) {
        throw createError(400, 'Otp verification first');
    } else if (exit.status !== 1) {
        throw createError(400, 'Otp verification failed');
    } else {
        const hashedPassword = await bcrypt.hash(userData.newPassword, 12)

        await dataModel.findOneAndUpdate(
            { email: userData.email },
            { password: hashedPassword },
            { new: true }
        );

        return { success: true, message: 'Password Updated!' };
    }

};



exports.userEmailUpdateService = async (dataModel, userData, id) => {
    const exit = await userOtpModel.findOne({ email: userData.email });

    if (!exit) {
        throw createError(400, 'Otp verification first');
    } else if (exit.status !== 1) {
        throw createError(400, 'Otp verification failed');
    } else {
        await dataModel.findByIdAndUpdate(id,
            { email: userData.email },
            { new: true }
        );

        await userOtpModel.findOneAndDelete({ email: userData.email });

        return { success: true, message: 'Email Updated!' };
    }

};