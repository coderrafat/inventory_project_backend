const { userOtpVerifyController, userOtpSentController } = require('./verificationController');

const verificationRouter = require('express').Router();

verificationRouter.post('/otp-sent', userOtpSentController);

verificationRouter.post('/otp-verify', userOtpVerifyController);

module.exports = verificationRouter;