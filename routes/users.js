const express = require('express');
const router = express.Router();
const usersFriendsRouter = require('./users.friends');

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
        joiUsersMiddlewares.userUpdateDataValidation,
        usersController.updateUser)
    .delete(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.deleteUser);

router.use('/:userId/friends', usersFriendsRouter);

router.param("userId", usersMiddlewares.userById);

module.exports = router;