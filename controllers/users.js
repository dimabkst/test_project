const prisma = require('../prisma_client');
const { UserSchema, UpdateUserSchema } = require('../joi_schemas/user');


const listOfUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                email: true,
                city: true,
                birthday: true,
                profilePicture: true
            }
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
        res.status(201).location('/users/' + user.id).json(); // Somewhy doesn't show anything without .json()
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = req.profile;

        res.status(200).json(user);
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

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: req.profile.id
            }
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