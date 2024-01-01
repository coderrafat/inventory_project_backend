
/**
 * @category User
 * @module UserService
 * @author Ali Rafat
*/

// const userModel = require("../userModel");
// const createError = require('http-errors');
// const bcrypt = require('bcrypt');
// const { createToken } = require("../../../utility/createToken");
// const { generateSignInOtpTemplate } = require("../../../mails");
// const { sendEmail } = require("../../../utility/sendEmail");




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





/**
 * Sends an OTP to the user's email for email verification.
 *
 * @function userSentOtpService
 * @param {Object} userData - The user data containing the email.
 * @param {string} userData.email - The email address of the user.
 * @param {Object} userData - The user's data, including the email.
 * @return {Object} An object indicating the success of the operation and a message.
 */


