
/**
 * @category User
 * @module UserService
 * @author Ali Rafat
*/

const userModel = require("./userModel");
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { createToken } = require("../../utility/createToken");
const { generateSignInOtpTemplate } = require("../../mails");
const { sendEmail } = require("../../utility/sendEmail");



/**
 * Registers a new user in the system.
 *
 * @function userRegisterService
 * @param {Object} userData - The user data to be registered.
 * @param {string} userData.firstName - The first name of the user.
 * @param {string} userData.lastName - The last name of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password of the user.
 * @param {string} userData.phoneNumber - The phone number of the user.
 * @param {string} userData.profilePic - The profilePic of the user.
 * @param {Object} userData - The user data to be registered.
 * @return {Object} An object indicating the success of the registration and a message.
 */

exports.userRegisterService = async (userData) => {

    const existingEmail = await userModel.findOne({ email: userData.email });
    const existingPhone = await userModel.findOne({ phoneNumber: userData.phoneNumber });

    if (existingEmail) {
        throw createError(409, 'Email is already been registered')
    } else if (existingPhone) {
        throw createError(409, 'Phone Number is already been registered')
    } else {
        await userModel(userData).save();
        return { success: true, message: 'User has been Created!' }
    }
};



/**
 * Authenticates a user login.
 *
 * @function userLoginService
 * @param {Object} userData - The user data containing the email and password.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password of the user.
 * @param {Object} userData - The user data containing the email and password.
 * @return {Object} An object with the success status, message, and token.
 */

exports.userLoginService = async (userData) => {

    const user = await userModel.findOne({ email: userData.email });

    if (!user) {
        throw createError(404, 'User not found')
    }

    const checkPassword = await bcrypt.compare(userData.password, user.password);

    if (!checkPassword) {
        throw createError(404, 'Email or Password incorrect')
    }
    if (user.status !== 'verified') {
        throw createError(404, 'Your email is not verified')
    }

    const token = await createToken(user.email, user._id, '24h');

    return {
        success: true,
        message: 'Login Success',
        token: token
    }
};



/**
 * Sends an OTP to the user's email for email verification.
 *
 * @function userSentOtpService
 * @param {Object} userData - The user data containing the email.
 * @param {string} userData.email - The email address of the user.
 * @param {Object} userData - The user's data, including the email.
 * @return {Object} An object indicating the success of the operation and a message.
 */

exports.userSentOtpService = async (userData) => {

    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = await userModel.findOne({ email: userData.email });

    if (!user) {
        throw createError(404, 'User not found')
    }

    await userModel.findOneAndUpdate({ email: userData.email }, { 'otp.code': otp })

    const emailData = {
        email: userData.email,
        subject: 'Email Verification',
        html: generateSignInOtpTemplate(userData.email, otp)
    };

    await sendEmail(emailData);


    return {
        success: true,
        message: 'Email send for verification.'
    }

};




exports.userProfileService = async (req) => {


}

exports.userProfileUpdate = async () => {
    const user = await sfsda
}