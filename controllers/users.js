const prisma = require('../prisma_client');
const { UserSchema, UpdateUserSchema } = require('../joi_schemas/user');
const jwt = require('../utils/jwt');
const prismaHelper = require('../helpers/prisma');


const listOfUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: prismaHelper.DEFAULT_SELECT
        });
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

        res.status(200).json(prismaHelper.exclude(user, 'password'));
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

        res.status(200).json(prismaHelper.exclude(user, 'password'));
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
            select: prismaHelper.DEFAULT_SELECT
        });

        res.status(200).json(user);
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