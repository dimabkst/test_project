const prisma = require('../prisma_client');
const jwt = require('../utils/jwt');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { createUser } = require('./users');
const prismaHelper = require('../helpers/prisma');

const login = async (req, res, next) => {
    try {
        // OR does not work in findUnique, so use findFirst
        // These are unique fields, so there should be no more than one such User
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: req.body.email },
                    { username: req.body.username },
                    { phoneNumber: req.body.phoneNumber }
                ]
            }
        });

        if (!user) {
            throw createError.NotFound('There is no User with such login');
        }

        if (!req.body.password) {
            throw createError.BadRequest("Password is required");
        }
        const passwordCheck = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCheck) {
            throw createError.Unauthorized('Incorrect password');
        }

        const accessToken = await jwt.signAccessToken(user);

        res.status(200).json({ accessToken: accessToken, user: prismaHelper.exclude(user, 'password') });
    } catch (err) {
        next(err);
    }
};

const register = createUser;

module.exports = {
    login,
    register,
}