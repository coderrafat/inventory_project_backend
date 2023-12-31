const joi = require('joi');

exports.userRegisterSchema = joi.object({
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
    confirmPassword: joi.valid(joi.ref('password')).required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Repeat Password is required",
    }),
    phoneNumber: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Phone number is required",
    }),
    profilePic: joi.any()
});

exports.userEmailVerifySchema = joi.object({
    email: joi.string().email().trim().lowercase().required().messages({
        "string.base": "Must be a type of text",
        "string.email": "Must be provide a valid email",
        "string.empty": "Please provide an email",
        "any.required": "Email is required",
    })
})

exports.userLoginSchema = joi.object({
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

exports.userProfileUpdateSchema = joi.object({
    firstName: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "First name is required",
    }),
    lastName: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Last name is required",
    }),
    phoneNumber: joi.string().trim().required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Phone number is required",
    }),
    picture: joi.any()

});

exports.userPasswordUpdateSchema = joi.object({
    currentPassword: joi.string().required().min(6).messages({
        "string.base": "Must be a type of text",
        "any.required": "Current Password is required",
    }),
    newPassword: joi.string().required().min(6).messages({
        "string.base": "Must be a type of text",
        "any.required": "New Password is required",
    }),
    confirmNewPassword: joi.valid(joi.ref('newPassword')).required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Repeat New Password is required",
    }),
});

exports.userPasswordResetSchema = joi.object({
    email: joi.string().email().trim().lowercase().required().messages({
        "string.base": "Must be a type of text",
        "string.email": "Must be provide a valid email",
        "string.empty": "Please provide an email",
        "any.required": "Email is required",
    }),
    newPassword: joi.string().required().min(6).messages({
        "string.base": "Must be a type of text",
        "any.required": "New Password is required",
    }),
    confirmNewPassword: joi.valid(joi.ref('newPassword')).required().messages({
        "string.base": "Must be a type of text",
        "any.required": "Repeat New Password is required",
    }),
});

exports.userEmailUpdateSchema = joi.object({
    email: joi.string().email().trim().lowercase().required().messages({
        "string.base": "Must be a type of text",
        "string.email": "Must be provide a valid email",
        "string.empty": "Please provide an email",
        "any.required": "Email is required",
    }),
    password: joi.string().required().min(6).messages({
        "string.base": "Must be a type of text",
        "any.required": "Password is required",
    })
});

// const userProfileUpdateSchema = async (req, res, next) => {
//     try {
//         const profileUpdatechema = joi.object({
//             firstName: joi.string().trim().required().messages({
//                 "string.base": "Must be a type of text",
//                 "any.required": "First name is required",
//             }),
//             lastName: joi.string().trim().required().messages({
//                 "string.base": "Must be a type of text",
//                 "any.required": "Last name is required",
//             }),
//             phoneNumber: joi.string().trim().required().messages({
//                 "string.base": "Must be a type of text",
//                 "any.required": "Phone number is required",
//             }),
//             picture: joi.any()

//         });

//         const data = await profileUpdatechema.validateAsync(req.body)

//         req.body = data;

//         next();
//     } catch (error) {
//         next(error)
//     }
// };

// module.exports = { userProfileUpdateSchema }





