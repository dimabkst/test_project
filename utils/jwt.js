const config = require('../config');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = async (user) => {
    try {
        const token = jwt.sign({ id: user.id }, config.jwtSecret);
        return token;
    } catch (err) {
        throw err;
    }
};

const verifyAccessToken = async (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (err) {
        const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
        throw createError.Unauthorized(message);
    }
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
}