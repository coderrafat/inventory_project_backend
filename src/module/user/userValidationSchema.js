const joi = require('joi');

const userRegisterSchema = joi.object({
    firstName: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "First name is required",
    }),
    lastName: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Last name is required",
    }),
    email: joi.string().email().trim().lowercase().required().messages({
        "string.base": "Must be a type of text",
        "string.email": "Must be provide a valid email",
        "string.empty": "Please provide an email",
        "any.required": "Email is required",
    }),
    password: joi.string().required().min(6).messages({
        "string.base": "Must be a type of text",
        "any.required": "Password is required",
    }),
    repeat_password: joi.valid(joi.ref('password')).required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Repeat Password is required",
    }),
    phoneNumber: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Phone number is required",
    }),
    profilePic: joi.any()
});

const userLoginSchema = joi.object({
    email: joi.string().email().trim().lowercase().required().messages({
        "string.base": "Must be a type of text",
        "string.email": "Must be provide a valid email",
        "string.empty": "Please provide an email",
        "any.required": "Email is required",
    }),
    password: joi.string().required().min(6).messages({
        "string.base": "Must be a type of text",
        "any.required": "Password is required",
    }),
});

const userSentOtpSchema = joi.object({
    email: joi.string().email().trim().lowercase().required().messages({
        "string.base": "Must be a type of text",
        "string.email": "Must be provide a valid email",
        "string.empty": "Please provide an email",
        "any.required": "Email is required",
    })
});

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userSentOtpSchema,
}
