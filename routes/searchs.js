const express = require('express');
const router = express.Router();

const searchsController = require('../controllers/searchs');

const authMidllewares = require('../middlewares/auth');


router.route('/users')
    .get(authMidllewares.authenticationCheck,
        searchsController.searchUser);

module.exports = router;