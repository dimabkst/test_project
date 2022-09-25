const prisma = require('../prisma_client');
const { dmmf } = require('@prisma/client');
const createError = require('http-errors');

const userById = async (req, res, next, id) => {
    try {
        let user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!user) {
            throw createError.NotFound("User with such Id not found");
        }

        req.profile = user;

        next();
    } catch (err) {
        next(err);
    }
};

const emptyBodyCheck = (req, res, next) => {
    let emptyBody = true;
    const InReqBody = item => item in req.body;
    const userFields = dmmf.datamodel.models.find(model => model.name === "User").fields
        .filter(field => {
            return field.kind == 'scalar' && !field.isId && !field.isReadOnly && !field.isList;
        })
        .map(field => field.name);
    for (const item of userFields) {
        if (emptyBody && InReqBody(item)) {
            emptyBody = false;
        }
    }

    if (emptyBody) {
        return res.status(204).json({ message: "Empty Body" });
    }

    next();
};

module.exports = {
    userById,
    emptyBodyCheck
}