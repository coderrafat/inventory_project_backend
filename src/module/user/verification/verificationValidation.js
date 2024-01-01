const joi = require('joi');

exports.userOtpSentReqSchema = joi.object({
    email: joi.string().email().trim().lowercase().required().messages({
        "string.base": "Must be a type of text",
        "string.email": "Must be provide a valid email",
        "string.empty": "Please provide an email",
        "any.required": "Email is required",
    }),
    subject: joi.string().email().trim().required().valid('Email Verify', 'Reset Password', 'Email Update').messages({
        "string.base": "Must be a type of text",
        "any.required": "subject is required",
        "any.only": "subject is not valid",
        "string.empty": "Please provide an email",
    })
});


exports.userOtpVerifyReqSchema = joi.object({
    email: joi.string().email().trim().lowercase().required().messages({
        "string.base": "Must be a type of text",
        "string.email": "Must be provide a valid email",
        "string.empty": "Please provide an email",
        "any.required": "Email is required",
    }),
    // subject: joi.string().email().trim().required().valid('Email Verification', 'Forget Password').messages({
    //     "string.base": "Must be a type of text",
    //     "any.required": "subject is required",
    //     "any.only": "subject is not valid",
    //     "string.empty": "Please provide an email",
    // }),
    otp: joi.string().trim().length(6).required().messages({
        "string.base": "otp must be a type of text",
        "string.empty": "Please provide OTP",
        "any.required": "OTP is required",
        "any.length": "Invalid OTP"
    })
});