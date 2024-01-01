const joi = require('joi')

exports.expenseTypeValidationSchema = joi.object({
    name: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Name is required",
    }),
})