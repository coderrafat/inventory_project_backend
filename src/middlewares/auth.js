const createError = require('http-errors');
const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            throw createError(401, "Please Login First");
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = {
            id: decoded.id,
            email: decoded.email
        }

        req.user = user;

        next()
    } catch (error) {
        next(error)
    }
}