const { userOtpSentService, userOtpVerifyService } = require("./verificationService");
const { userOtpVerifyReqSchema, userOtpSentReqSchema } = require("./verificationValidation");
const userOtpModel = require('./userOtpModel');

exports.userOtpSentController = async (req, res, next) => {
    try {
        const data = await userOtpSentReqSchema.validateAsync(req.body);

        const result = await userOtpSentService(userOtpModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};



exports.userOtpVerifyController = async (req, res, next) => {
    try {
        const data = await userOtpVerifyReqSchema.validateAsync(req.body);

        const result = await userOtpVerifyService(userOtpModel, data);

        return res.status(200).json(result);
    } catch (error) {
        next(error)
    }
};