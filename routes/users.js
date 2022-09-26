const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const usersMiddlewares = require('../middlewares/users');

const authMidllewares = require('../middlewares/auth');

const joiUsersMiddlewares = require('../middlewares/joi/users');

router.route('/')
    .get(usersController.listOfUsers)
    .post(joiUsersMiddlewares.userDataValidation,
        usersController.createUser);

router.route('/:userId')
    .get(authMidllewares.authenticationCheck,
        usersController.getUser)
    .put(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersMiddlewares.emptyBodyCheck,
        joiUsersMiddlewares.userUpdateDataValidation,
        usersController.updateUser)
    .delete(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.deleteUser);

router.route('/:userId/friends')
    .get(authMidllewares.authenticationCheck,
        usersController.getUserFriends);

router.route('/:userId/friends/:friendId') // Used router.param for friendId but it didn't have req.auth inside so there was no sense in this
    .delete(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.removeUserFriend);

router.route('/:userId/friends/requests/incomings')
    .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.getIncomingFriendsRequests);

router.route('/:userId/friends/requests/outcomings')
    .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.getOutcomingFriendsRequests)
    .post(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.createOutcomingFriendsRequest);

router.route('/:userId/friends/requests/incomings/:friendsRequestId')
    .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.getIncomingFriendsRequest)
    .put(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.answerIncomingFriendsRequest);

router.route('/:userId/friends/requests/outcomings/:friendsRequestId')
    .get(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.getOutcomingFriendsRequest)
    .delete(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.deleteOutcomingFriendsRequest);

router.param("userId", usersMiddlewares.userById);
router.param("friendsRequestId", usersMiddlewares.friendsRequestById);

module.exports = router;