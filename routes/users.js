const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const usersMiddlewares = require('../middlewares/users');

const authMidllewares = require('../middlewares/auth');

router.route('/')
    .get(usersController.listOfUsers)
    .post(usersController.createUser);

router.route('/:userId')
    .get(authMidllewares.authenticationCheck,
        usersController.getUser)
    .put(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersMiddlewares.emptyBodyCheck,
        usersController.updateUser)
    .delete(authMidllewares.authenticationCheck, authMidllewares.authorizationCheck,
        usersController.deleteUser);

router.param("userId", usersMiddlewares.userById);

module.exports = router;