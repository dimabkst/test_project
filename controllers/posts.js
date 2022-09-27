const prisma = require('../prisma_client');

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
        const post = req.post;

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

module.exports = {
    listOfPosts,
    createPost,
    getPost,
    updatePost,
    deletePost,
    listOfPostsByAuthor,
};