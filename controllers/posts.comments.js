const prisma = require('../prisma_client');
const createError = require('http-errors');

const listOfCommentsBelowPost = async (req, res, next) => {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: req.post.id
            }
        });

        res.status(200).json({
            status: 200,
            data: { comments: comments }
        });
    } catch (err) {
        next(err);
    }
};

const createCommentBelowPost = async (req, res, next) => {
    try {
        const comment = await prisma.comment.create({
            data: {
                content: req.body.content,
                author: {
                    connect: {
                        id: req.auth.id
                    }
                },
                post: {
                    connect: {
                        id: req.post.id
                    }
                }
            }
        });

        res.status(201).location(`/posts/${req.post.id}/comments/${comment.id}`).json({
            status: 201,
            data: null
        });
    } catch (err) {
        next(err);
    }
};

const getCommentBelowPost = async (req, res, next) => {
    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: req.comment.id
            }
        });

        res.status(200).json({
            status: 200,
            data: { comment: comment }
        });
    } catch (err) {
        next(err);
    }
};

const updateCommentBelowPost = async (req, res, next) => {
    try {
        const comment = await prisma.comment.update({
            where: {
                id: req.comment.id
            },
            data: req.body
        });

        res.status(200).json({
            status: 200,
            data: { comment: comment }
        });
    } catch (err) {
        next(err);
    }
};

const deleteCommentBelowPost = async (req, res, next) => {
    try {
        const comment = await prisma.comment.update({
            where: {
                id: req.comment.id
            },
            data: {
                post: {
                    disconnect: true
                }
            }
        });

        await prisma.comment.delete({
            where: {
                id: comment.id
            }
        });

        res.status(200).json({
            status: 200,
            data: null
        });
    } catch (err) {
        next(err);
    }
};

const likeCommentBelowPost = async (req, res, next) => {
    try {
        if (await prisma.like.findFirst({
            where: {
                authorId: req.auth.id,
                commentId: req.comment.id
            }
        })) {
            throw createError.BadRequest("You already have liked this comment");
        }

        const like = await prisma.like.create({
            data: {
                authorId: req.auth.id,
                commentId: req.comment.id
            }
        });

        res.status(201).json({
            status: 201,
            data: null
        });
    } catch (err) {
        next(err);
    }
};

const deleteCommentBelowPostLike = async (req, res, next) => {
    try {
        let like = await prisma.like.findFirst({
            where: {
                authorId: req.auth.id,
                commentId: req.comment.id
            }
        })
        if (!like) {
            throw createError.BadRequest("You haven't liked this comment");
        }

        like = await prisma.like.update({
            where: {
                id: like.id
            },
            data: {
                comment: {
                    disconnect: true
                }
            }
        });

        like = await prisma.like.delete({
            where: {
                id: like.id
            }
        });

        res.status(200).json({
            status: 200,
            data: null
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listOfCommentsBelowPost,
    createCommentBelowPost,
    getCommentBelowPost,
    updateCommentBelowPost,
    deleteCommentBelowPost,
    likeCommentBelowPost,
    deleteCommentBelowPostLike,
};