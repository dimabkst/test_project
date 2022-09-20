const prisma = require('../prisma_client');
const UserSchema = require('../joi_schemas/user');


const listOfUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        req.body.updatedAt = new Date();
        const body = await UserSchema
            .validateAsync(req.body, { allowUknown: true, abortEarly: true });

        const user = await prisma.user.create({
            data: body
        });
        res.status(201).location('/users/' + user.id).json(); // Somewhy doesn't show anything without .json()
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listOfUsers,
    createUser,
};