const joi = require('joi');

exports.customerValidationSchema = joi.object({
    name: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Name is required",
    }),
    email: joi.string().trim().email().messages({
        "string.base": "Must be a type of text",
        "string.email": "Must be provide a valid email",
    }),
    address: joi.string().trim().messages({
        "string.base": "Must be a type of text",
    }),
    phone: joi.string().trim().messages({
        "string.base": "Must be a type of text",
    })
})