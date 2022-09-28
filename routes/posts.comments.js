const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');
const postsMiddlewares = require('../middlewares/posts');

const authMidllewares = require('../middlewares/auth');

const joiCommentsMiddlewares = require('../middlewares/joi/comments');

router.route('/')
    .get(authMidllewares.authenticationCheck,
        postsController.listOfCommentsBelowPost)
    .post(authMidllewares.authenticationCheck,
        joiCommentsMiddlewares.commentDataValidation,
        postsController.createCommentBelowPost);

router.route('/:commentId')
    .get(authMidllewares.authenticationCheck,
        postsController.getCommentBelowPost)
    .put(authMidllewares.authenticationCheck,
        postsMiddlewares.authenticatedUserIsCommentAuthorCheck,
        joiCommentsMiddlewares.commentDataValidation,
        postsController.updateCommentBelowPost)
    .delete(authMidllewares.authenticationCheck,
        postsMiddlewares.authenticatedUserIsCommentAuthorCheck,
        postsController.deleteCommentBelowPost);

router.route('/:commentId/likes')
    .post(authMidllewares.authenticationCheck,
        postsController.likeCommentBelowPost)
    .delete(authMidllewares.authenticationCheck,
        postsController.deleteCommentBelowPostLike);

router.param("commentId", postsMiddlewares.commentById);

module.exports = router;