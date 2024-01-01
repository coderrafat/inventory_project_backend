const joi = require('joi');

exports.productValidationSchema = joi.object({
    name: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Name is required",
    }),
    categoryId: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Category Id is required",
    }),
    brandId: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Brand Id is required",
    }),
    unit: joi.number().required().messages({
        "number.base": "Must be a type of number",
        "any.required": "Unit is required",
    }),
    details: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Details is required",
    }),
});