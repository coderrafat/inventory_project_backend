const userOtpModel = require("../verification/userOtpModel");
const createError = require('http-errors');

exports.userEmailVerify = async (dataModel, userData) => {

    const exit = await userOtpModel.findOne({ email: userData.email });


    if (!exit) {
        throw createError(400, 'Otp verification first');
    } else if (exit.status !== 1) {
        throw createError(400, 'Otp verification failed');
    } else {
        await dataModel.findOneAndUpdate(
            { email: userData.email },
            { status: 'verified' }
        );

        await userOtpModel.findOneAndDelete({ email: userData.email });

        return { success: true, message: 'Email Verified Successfully' };
    }

};