const prisma = require('../../prisma_client');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const BCRYPT_SALT = 10;

const passwordMiddleware = async (params, next) => {
    try {
        if (params.action == 'create' || params.action == 'update'
            && params.model == 'User' && params.args.data.password) {
            const user = params.args.data;
            const salt = await bcrypt.genSalt(BCRYPT_SALT);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            params.args.data = user;
        }
        return await next(params);
    } catch (err) {
        throw err;
    }
};

// Already implemented by Joi but won't delete for some time

// const loginPresenceMiddleware = async (params, next) => {
//     try {
//         if (params.action == 'create' && params.model == 'User') {
//             const user = params.args.data;
//             if (!(user.email || user.username || user.phoneNumber)) {
//                 throw createError
//                     .BadRequest('User should have at least one of next fields to be used as login: email, username, phone number');
//             };
//         }
//         return await next(params);
//     } catch (err) {
//         throw err;
//     }
// };


module.exports = {
    passwordMiddleware,
}