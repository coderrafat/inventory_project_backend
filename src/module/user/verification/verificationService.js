const { generateSignInOtpTemplate } = require("../../../mails");
const { sendEmail } = require("../../../utility/sendEmail");
const userModel = require("../userModel");
const createError = require('http-errors');

exports.userOtpSentService = async (dataModel, userData) => {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = await userModel.findOne({ email: userData.email });

    if (!user) {
        throw createError(404, 'User not found')
    }

    await dataModel.findOneAndUpdate(
        { email: userData.email },
        { otp },
        { upsert: true }
    )

    const emailData = {
        email: userData.email,
        subject: userData.subject,
        html: generateSignInOtpTemplate(userData.email, otp)
    };

    await sendEmail(emailData);

    return {
        success: true,
        message: `Email send for ${userData.subject}.`
    }
};

exports.userOtpVerifyService = async (dataModel, userData) => {
    const exit = await dataModel.findOne({
        email: userData.email,
        otp: userData.otp
    });

    if (!exit) {
        throw createError(404, 'Invalid Otp')
    }

    await dataModel.findOneAndUpdate(
        { email: userData.email, otp: userData.otp },
        { status: 1, otp: 0 }
    );

    return {
        success: true,
        message: 'Otp verified successfully'
    }
};