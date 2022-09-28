const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const usersMiddlewares = require('../middlewares/users');

const authMidllewares = require('../middlewares/auth');

router.route('/')
    .get(authMidllewares.authenticationCheck,
        usersController.getUserFriends);

router.route('/:friendId') // Used router.param for friendId but it didn't have req.auth inside so there was no sense in this
    .delete(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.removeUserFriend);

router.route('/requests/incomings')
    .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.getIncomingFriendsRequests);

router.route('/requests/outcomings')
    .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.getOutcomingFriendsRequests)
    .post(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.createOutcomingFriendsRequest);

router.route('/requests/incomings/:friendsRequestId')
    .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.getIncomingFriendsRequest)
    .put(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.answerIncomingFriendsRequest);

router.route('/requests/outcomings/:friendsRequestId')
    .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.getOutcomingFriendsRequest)
    .delete(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.deleteOutcomingFriendsRequest);

router.param("friendsRequestId", usersMiddlewares.friendsRequestById);

module.exports = router;