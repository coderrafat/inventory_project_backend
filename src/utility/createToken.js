const jwt = require('jsonwebtoken');

exports.createToken = async (email, user_id) => {

    return jwt.sign(
        { email: email, id: user_id },
        process.env.JWT_KEY,
        { expiresIn: expires }
    )
};