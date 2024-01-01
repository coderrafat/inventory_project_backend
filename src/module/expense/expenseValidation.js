const joi = require('joi');

exports.expenseValidationSchema = joi.object({
    expenseTypeId: joi.string().trim().required().messages({
        "any.required": "Expense Type Id is required!"
    }),
    name: joi.string().trim().required().messages({
        "any.required": "Name is required!"
    }),
    amount: joi.any().required().messages({
        "any.required": "Amount is required"
    }),
    note: joi.string().trim().required().messages({
        "any.required": "Note is required"
    })
})