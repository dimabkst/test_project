const passport = require('../utils/passport');
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.route('/register')
    .post(authController.register);

router.route('/login')
    .post(authController.login);

router.route('/login/facebook')
    .get(passport.authenticate('facebook'), authController.login);

router.route('/login/google')
    .get(passport.authenticate('google'), authController.login);

module.exports = router;