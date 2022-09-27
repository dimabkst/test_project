const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');
const postsMiddlewares = require('../middlewares/posts');

const usersMiddlewares = require('../middlewares/users');

const authMidllewares = require('../middlewares/auth');

const joiPostsMiddlewares = require('../middlewares/joi/posts');

router.route('/')
    .get(postsController.listOfPosts)
    .post(authMidllewares.authenticationCheck,
        joiPostsMiddlewares.postDataValidation,
        postsController.createPost);

router.route('/:postId')
    .get(authMidllewares.authenticationCheck,
        postsController.getPost)
    .put(authMidllewares.authenticationCheck,
        postsMiddlewares.authenticatedUserIsAuthorCheck,
        joiPostsMiddlewares.postDataValidation,
        postsController.updatePost)
    .delete(authMidllewares.authenticationCheck,
        postsMiddlewares.authenticatedUserIsAuthorCheck,
        postsController.deletePost);

router.route('/users/:userId')
    .get(authMidllewares.authenticationCheck,
        postsController.listOfPostsByAuthor);

// router.route('/:postId/likes')
//     .put(authMidllewares.authenticationCheck,
//         postsController.likePost) // mb POST?
//     .delete(authMidllewares.authenticationCheck,
//         postsController.dislikePost);

// router.route('/feed/:userId')
//     .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
//         postsController.feed);

router.param("userId", usersMiddlewares.userById);
router.param('postId', postsMiddlewares.postById);

module.exports = router;