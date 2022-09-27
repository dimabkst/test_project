const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');
const postsMiddlewares = require('../middlewares/posts');

const usersMiddlewares = require('../middlewares/users');

const authMidllewares = require('../middlewares/auth');

const joiPostsMiddlewares = require('../middlewares/joi/posts');
const joiCommentsMiddlewares = require('../middlewares/joi/comments');

router.route('/')
    .get(postsController.listOfPosts)
    .post(authMidllewares.authenticationCheck,
        joiPostsMiddlewares.postDataValidation,
        postsController.createPost);

router.route('/:postId')
    .get(authMidllewares.authenticationCheck,
        postsController.getPost)
    .put(authMidllewares.authenticationCheck,
        postsMiddlewares.authenticatedUserIsPostAuthorCheck,
        joiPostsMiddlewares.postDataValidation,
        postsController.updatePost)
    .delete(authMidllewares.authenticationCheck,
        postsMiddlewares.authenticatedUserIsPostAuthorCheck,
        postsController.deletePost);

router.route('/users/:userId')
    .get(authMidllewares.authenticationCheck,
        postsController.listOfPostsByAuthor);

router.route('/:postId/likes')
    .post(authMidllewares.authenticationCheck,
        postsController.likePost)
    .delete(authMidllewares.authenticationCheck,
        postsController.deletePostLike); // User can can leave only 1 like below the Post so there is no need to do /:postId/likes/:likeId which would make everything harder 

// router.route('/feed/:userId')
//     .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
//         postsController.feed);

router.route('/:postId/comments')
    .get(authMidllewares.authenticationCheck,
        postsController.listOfCommentsBelowPost)
    .post(authMidllewares.authenticationCheck,
        joiCommentsMiddlewares.commentDataValidation,
        postsController.createCommentBelowPost);

router.route('/:postId/comments/:commentId')
    .get(authMidllewares.authenticationCheck,
        postsController.getCommentBelowPost)
    .put(authMidllewares.authenticationCheck,
        postsMiddlewares.authenticatedUserIsCommentAuthorCheck,
        joiCommentsMiddlewares.commentDataValidation,
        postsController.updateCommentBelowPost)
    .delete(authMidllewares.authenticationCheck,
        postsMiddlewares.authenticatedUserIsCommentAuthorCheck,
        postsController.deleteCommentBelowPost);

router.route('/:postId/comments/:commentId/likes')
    .post(authMidllewares.authenticationCheck,
        postsController.likeCommentBelowPost)
    .delete(authMidllewares.authenticationCheck,
        postsController.deleteCommentBelowPostLike);

router.param("userId", usersMiddlewares.userById);
router.param("commentId", postsMiddlewares.commentById);
router.param('postId', postsMiddlewares.postById);

module.exports = router;