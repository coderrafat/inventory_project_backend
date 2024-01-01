const joi = require('joi')

exports.brandCreateSchema = joi.object({
    name: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Brand name is required",
    }),
});