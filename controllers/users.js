const prisma = require('../prisma_client');
const { UserSchema, UpdateUserSchema } = require('../joi_schemas/user');
const jwt = require('../utils/jwt');
const prismaHelpers = require('../helpers/prisma');


const listOfUsers = async (req, res, next) => {
    try {
        let users = await prisma.user.findMany({
            select: prismaHelpers.DEFAULT_SELECT
        });
        tempUsers = [];
        for (let user of users) {
            user = await prismaHelpers.excludeNotSetUserUniqueFieldsAndPassword(user);
            tempUsers.push(user);
        }
        users = tempUsers;
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        req.body.updatedAt = new Date();
        const body = await UserSchema
            .validateAsync(req.body, { abortEarly: true });

        const user = await prisma.user.create({
            data: body
        });

        const accessToken = await jwt.signAccessToken(user);
        res.status(201).location('/users/' + user.id).json({ accesToken: accessToken });
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = req.profile;

        res.status(200).json(await prismaHelpers.excludeNotSetUserUniqueFieldsAndPassword(user));
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        req.body.updatedAt = new Date();
        await UpdateUserSchema.validateAsync(req.body, { abortEarly: true });

        const user = await prisma.user.update({
            where: {
                id: req.profile.id
            },
            data: req.body
        });

        res.status(200).json(await prismaHelpers.excludeNotSetUserUniqueFieldsAndPassword(user));
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: req.profile.id
            },
            select: prismaHelpers.DEFAULT_SELECT
        });

        res.status(200).json(await prismaHelpers.excludeNotSetUserUniqueFieldsAndPassword(user));
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
};