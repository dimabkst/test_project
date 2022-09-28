const prisma = require('../prisma_client');
const jwt = require('../utils/jwt');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { createUser } = require('./users');

const register = createUser;

const login = async (req, res, next) => {
    try {
        let user;
        if (req.user) { // then user logged ith Facebook or Google
            user = req.user;
        } else {
            // OR does not work in findUnique, so use findFirst
            // These are unique fields, so there should be no more than one such User
            user = await prisma.user.findFirst({
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
        }

        await prisma.activeAccessTokens.deleteMany({ // So there would be no more than 1 accessToken at the same time of User in db
            where: {
                userId: user.id
            }
        });

        const accessToken = await jwt.signAccessToken(user);
        await prisma.activeAccessTokens.create({
            data: {
                token: accessToken,
                userId: user.id
            }
        });

        res.status(201).location('/users/' + user.id).json({
            status: 201,
            data: { accesToken: accessToken }
        });
    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];
        await prisma.activeAccessTokens.deleteMany({
            where: {
                token: accessToken
            }
        });

        res.status(200).json({
            status: 200,
            data: null
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login,
    logout,
}