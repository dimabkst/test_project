const { UserSchema, UpdateUserSchema } = require('../../joi_schemas/user');

const userDataValidation = async (req, res, next) => {
    try {
        const body = await UserSchema
            .validateAsync(req.body, { abortEarly: true });

        req.body = body;

        next();
    } catch (err) {
        next(err);
    }
};

const userUpdateDataValidation = async (req, res, next) => {
    try {
        const body = await UpdateUserSchema
            .validateAsync(req.body, { abortEarly: true });

        req.body = body;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    userDataValidation,
    userUpdateDataValidation,
};