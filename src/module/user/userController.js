
/**
 * @category User
 * @module UserController
 * @author Ali Rafat
*/

const { userRegisterService, userLoginService, userSentOtpService } = require("./userService");
const { userRegisterSchema, userSentOtpSchema, userLoginSchema } = require("./userValidationSchema");


/**
 * Registers a new user.
 *
 * @function userRegisterController
 * @async
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.firstName - The first name of the user.
 * @param {string} req.body.lastName - The last name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {string} req.body.confirmPassword - The confirm password of the user.
 * @param {string} req.body.phoneNumber - The phone number of the user.
 * @param {string} req.body.profilePic - The profile pic of the user.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 * @return {Object} The JSON response containing the result of the registration.
 */

exports.userRegisterController = async (req, res, next) => {
    try {
        const userData = await userRegisterSchema.validateAsync(req.body);

        const result = await userRegisterService(userData);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};





exports.userLoginController = async (req, res, next) => {
    try {
        const userData = await userLoginSchema.validateAsync(req.body);

        const result = await userLoginService(userData);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.userSentOtpController = async (req, res, next) => {
    try {
        const userData = await userSentOtpSchema.validateAsync(req.body);

        const result = await userSentOtpService(userData);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};