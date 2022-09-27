const { CommentSchema } = require('../../joi_schemas/comment');

const commentDataValidation = async (req, res, next) => {
    try {
        const body = await CommentSchema
            .validateAsync(req.body, { abortEarly: true });

        req.body = body;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    commentDataValidation,
};