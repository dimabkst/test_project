const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.route('/')
    .get(usersController.listOfUsers)
    .post(usersController.createUser);

module.exports = router;