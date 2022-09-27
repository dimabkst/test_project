const { PostSchema } = require('../../joi_schemas/post');

const postDataValidation = async (req, res, next) => {
    try {
        const body = await PostSchema
            .validateAsync(req.body, { abortEarly: true });

        req.body = body;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    postDataValidation,
};