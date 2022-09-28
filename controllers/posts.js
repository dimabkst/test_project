const prisma = require('../prisma_client');
const createError = require('http-errors');

const PostsCommentsController = require('./posts.comments');

const listOfPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany();

        res.status(200).json({
            status: 200,
            data: { posts: posts }
        });
    } catch (err) {
        next(err);
    }
};

const createPost = async (req, res, next) => {
    try {
        const post = await prisma.post.create({
            data: {
                content: req.body.content,
                author: {
                    connect: {
                        id: req.auth.id
                    }
                }
            }
        });

        res.status(201).location('/posts/' + post.id).json({
            status: 201,
            data: null
        });
    } catch (err) {
        next(err);
    }
};

const getPost = async (req, res, next) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: req.post.id
            },
            include: {
                likes: true,
                comments: true
            }
        });

        res.status(200).json({
            status: 200,
            data: { post: post }
        });
    } catch (err) {
        next(err);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const post = await prisma.post.update({
            where: {
                id: req.post.id
            },
            data: req.body
        });

        res.status(200).json({
            status: 200,
            data: { post: post }
        });
    } catch (err) {
        next(err);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const post = await prisma.post.delete({ // Not sure that this deletes relationship properly, but wasn't able to do it manually
            where: {
                id: req.post.id
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

const listOfPostsByAuthor = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: req.profile.id
            }
        });

        res.status(200).json({
            status: 200,
            data: { posts: posts }
        });
    } catch (err) {
        next(err);
    }
};

const likePost = async (req, res, next) => {
    try {
        if (await prisma.like.findFirst({
            where: {
                authorId: req.auth.id,
                postId: req.post.id
            }
        })) {
            throw createError.BadRequest("You already have liked this post");
        }

        const like = await prisma.like.create({
            data: {
                authorId: req.auth.id,
                postId: req.post.id
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

const deletePostLike = async (req, res, next) => {
    try {
        let like = await prisma.like.findFirst({
            where: {
                authorId: req.auth.id,
                postId: req.post.id
            }
        })
        if (!like) {
            throw createError.BadRequest("You haven't liked this post");
        }

        like = await prisma.like.update({
            where: {
                id: like.id
            },
            data: {
                post: {
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

const feed = async (req, res, next) => {
    try {
        const PAGE_LIMIT = 10;
        const pageNumber = parseInt(req.query.page);

        const limit = (req.query.limit) ? parseInt(req.query.limit) : PAGE_LIMIT;
        console.log('a');
        const feed = await prisma.post.findMany({
            where: {
                author: {
                    friends: {
                        some: {
                            id: req.auth.id
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: (pageNumber - 1) * limit,
            take: limit
        });

        res.status(200).json({
            status: 200,
            data: { feed: feed }
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    listOfPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
    listOfPostsByAuthor,
    likePost,
    deletePostLike,
    feed,
    ...PostsCommentsController
};