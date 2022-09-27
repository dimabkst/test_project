const prisma = require('../prisma_client');
const jwt = require('../utils/jwt');
const prismaHelpers = require('../helpers/prisma');
const usersFriendsController = require('./users.friends');


const listOfUsers = async (req, res, next) => {
    try {
        let users = await prisma.user.findMany({
            select: prismaHelpers.DEFAULT_SELECT
        });
        users = await prismaHelpers.excludeNotSetUsersUniqueFieldsAndFieldsNotToShow(users);

        res.status(200).json({
            status: 200,
            data: { users: users }
        });
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });

        const accessToken = await jwt.signAccessToken(user);
        await prisma.activeAccessTokens.create({
            data: {
                token: accessToken
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

const getUser = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.profile.id
            },
            include: {
                posts: true
            }
        });

        res.status(200).json({
            status: 200,
            data: { user: await prismaHelpers.excludeNotSetUserUniqueFieldsAndFieldsNotToShow(user) }
        });
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: req.profile.id
            },
            data: req.body
        });

        res.status(200).json({
            status: 200,
            data: { user: await prismaHelpers.excludeNotSetUserUniqueFieldsAndFieldsNotToShow(user) }
        });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        for (let friendId of req.profile.friendsIds) {
            await prisma.user.update({
                where: {
                    id: friendId
                },
                data: {
                    friends: {
                        disconnect: { id: req.profile.id }
                    }
                }
            });
        }

        let user = await prisma.user.update({
            where: {
                id: req.profile.id
            },
            data: {
                friends: { // Wanted to updateMany friends here but didn't work, so wrote code above
                    set: []
                }
            }
        });

        user = await prisma.user.delete({
            where: {
                id: user.id
            }
        });

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
    listOfUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    ...usersFriendsController,
};