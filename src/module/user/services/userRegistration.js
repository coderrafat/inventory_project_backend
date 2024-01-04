const createError = require('http-errors');
const bcrypt = require('bcrypt')

exports.userRegisterService = async (dataModel, userData) => {

    const existingEmail = await dataModel.findOne({ email: userData.email });
    // const existingPhone = await dataModel.findOne({ phoneNumber: userData.phoneNumber });

    if (existingEmail) {
        throw createError(409, 'Email is already been registered')
    } else {

        const hashedPassword = await bcrypt.hash(userData.password, 12);

        userData.password = hashedPassword

        await dataModel(userData).save();
        return { success: true, message: 'User has been Created!' }
    }
};