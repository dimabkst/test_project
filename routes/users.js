const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const usersHelpers = require('../helpers/users');

router.route('/')
    .get(usersController.listOfUsers)
    .post(usersController.createUser);

router.route('/:userId')
    .get(usersController.getUser)
    .put(usersHelpers.emptyBodyCheck, usersController.updateUser)
    .delete(usersController.deleteUser);

router.param("userId", usersHelpers.userById);

module.exports = router;