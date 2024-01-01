
/**
 * @category User
 * @module UserController
 * @author Ali Rafat
*/

const { userRegisterSchema, userLoginSchema, userProfileUpdateSchema, userPasswordUpdateSchema, userEmailVerifySchema, userPasswordResetSchema } = require("./userValidationSchema");
const userModel = require("./userModel");
const { userRegisterService } = require("./services/userRegistration");
const { userLoginService } = require("./services/userLoginService");
const { userProfile, userProfileUpdate, userPasswordUpdate, userEmailUpdateService, userPasswordResetService } = require("./services/userProfileService");
const { userEmailVerify } = require("./services/emailVerify");


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

        const result = await userRegisterService(userModel, userData);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


exports.userEmailVerifyController = async (req, res, next) => {
    try {
        const data = await userEmailVerifySchema.validateAsync(req.body)
        const result = await userEmailVerify(userModel, data)
        return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
};



exports.userLoginController = async (req, res, next) => {
    try {
        const userData = await userLoginSchema.validateAsync(req.body);

        const result = await userLoginService(userModel, userData);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



exports.userProfileController = async (req, res, next) => {
    try {
        const { id } = req.user;
        console.log(id)
        const result = await userProfile(userModel, id);
        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};



exports.userProfileUpdateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const data = await userProfileUpdateSchema.validateAsync(req.body);

        const result = await userProfileUpdate(userModel, data, id);

        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};



exports.userPasswordUpdateController = async (req, res, next) => {
    try {
        const { id } = req.user;

        const data = await userPasswordUpdateSchema.validateAsync(req.body);

        const result = await userPasswordUpdate(userModel, id, data);
        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};


exports.userPasswordResetController = async (req, res, next) => {
    try {
        const data = await userPasswordResetSchema.validateAsync(req.body);

        const result = await userPasswordResetService(userModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}



exports.userEmailUpdateController = async (req, res, next) => {
    try {

        const { id } = req.user;
        const data = await userEmailVerifySchema.validateAsync(req.body)

        const result = await userEmailUpdateService(userModel, data, id);

        return res.status(200).jason(result)
    } catch (error) {
        next(error)
    }
};


