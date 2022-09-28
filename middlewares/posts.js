const prisma = require('../prisma_client');
const createError = require('http-errors');

const postsCommentsMiddlewares = require('./posts.comments');

const postById = async (req, res, next, id) => {
    try {
        let post = await prisma.post.findUnique({
            where: {
                id: id
            }
        });
        if (!post) {
            throw createError.NotFound("Post with such Id not found");
        }

        req.post = post;

        next();
    } catch (err) {
        next(err);
    }
};

const authenticatedUserIsPostAuthorCheck = async (req, res, next) => {
    try {
        if (req.post.authorId != req.auth.id) {
            throw createError.Forbidden("You can change only your posts");
        }
        next();
    } catch (err) {
        next(err);
    }
};

const feedQueryParametersValidation = async (req, res, next) => {
    try {
        const pageParameter = req.query.page;
        if (!pageParameter) {
            throw createError.BadRequest("Query parameter - page, is required");
        }

        const postiveIntegerRegex = new RegExp(/^[1-9][0-9]*$/);
        if (!postiveIntegerRegex.test(pageParameter)) {
            throw createError.BadRequest("Page query parameter should be integer greater than zero");
        }

        const limitParameter = req.query.limit;
        if (limitParameter) {
            if (!postiveIntegerRegex.test(limitParameter)) {
                throw createError.BadRequest("Page query limit should be integer greater than zero");
            }
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    postById,
    authenticatedUserIsPostAuthorCheck,
    feedQueryParametersValidation,
    ...postsCommentsMiddlewares,
};