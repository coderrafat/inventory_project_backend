const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { createToken } = require('../../../utility/createToken');

exports.userLoginService = async (dataModel, userData) => {

    const user = await dataModel.findOne(
        { email: userData.email },
        { createdAt: 0, updatedAt: 0 }
    );

    if (!user) {
        throw createError(404, 'User not found')
    }

    const checkPassword = await bcrypt.compare(userData.password, user.password);

    if (!checkPassword) {
        throw createError(404, 'Email or Password incorrect')
    }
    if (user.status !== 'verified') {
        throw createError(404, 'Your email is not verified')
    }

    const tokenData = {
        id: user._id,
        email: user.email
    }

    const token = await createToken(tokenData, '24h');

    user.password = undefined;

    return {
        success: true,
        message: 'Login Success',
        user,
        token
    }
};