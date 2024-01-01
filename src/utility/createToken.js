const jwt = require('jsonwebtoken');

exports.createToken = async (data, expires) => {

    return jwt.sign(data, process.env.JWT_KEY, { expiresIn: expires })
};