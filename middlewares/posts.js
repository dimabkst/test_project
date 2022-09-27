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

module.exports = {
    postById,
    authenticatedUserIsPostAuthorCheck,
    ...postsCommentsMiddlewares,
};