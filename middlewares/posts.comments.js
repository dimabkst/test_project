const prisma = require('../prisma_client');
const createError = require('http-errors');

const commentById = async (req, res, next, id) => {
    try {
        let comment = await prisma.comment.findUnique({
            where: {
                id: id
            }
        });
        if (!comment) {
            throw createError.NotFound("Comment with such id not found");
        }

        if (comment.postId != req.post.id) {
            throw createError.NotFound("There is no such comment below this post");
        }

        req.comment = comment;

        next();
    } catch (err) {
        next(err);
    }
};

const authenticatedUserIsCommentAuthorCheck = async (req, res, next) => {
    try {
        if (req.comment.authorId != req.auth.id) {
            throw createError.Forbidden("You can change only your comments");
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    commentById,
    authenticatedUserIsCommentAuthorCheck,
};