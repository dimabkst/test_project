const jwt = require('../utils/jwt');
const createError = require('http-errors');

const authenticationCheck = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw createError.Unauthorized('Access token is required');
        }

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw createError.Unauthorized();
        }

        const user = await jwt.verifyAccessToken(token);
        req.auth = user; // Contains only user id

        next();
    } catch (err) {
        next(err)
    }
};

const authorizationCheck = async (req, res, next) => {
    try {
        // req.auth existence checked in jwt.verifyAccessToken, req.profile in userById
        const authorized = req.profile.id == req.auth.id;

        if (!authorized) {
            throw createError.Forbidden("User is not authorized");
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    authenticationCheck,
    authorizationCheck,
};