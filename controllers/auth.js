const prisma = require('../prisma_client');
const jwt = require('../utils/jwt');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { createUser } = require('./users');
const prismaHelpers = require('../helpers/prisma');

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

        const accessToken = await jwt.signAccessToken(user);

        res.status(200).json({ accessToken: accessToken, user: await prismaHelpers.excludeNotSetUserUniqueFieldsAndPassword(user) });
    } catch (err) {
        next(err);
    }
};

const register = createUser;

module.exports = {
    login,
    register,
}