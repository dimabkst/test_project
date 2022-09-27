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

const friendsRequestById = async (req, res, next, id) => {
    try {
        const friendsRequest = await prisma.friendsRequest.findUnique({
            where: {
                id: id
            }
        });
        if (!friendsRequest) {
            throw createError.NotFound("Friends request with such Id not found");
        }

        if (req.originalUrl.includes('outcomings')) {
            if (friendsRequest.from != req.profile.id) {
                throw createError.NotFound("You don't have such outcoming friends request");
            }
        } else if (req.originalUrl.includes('incomings')) {
            if (friendsRequest.to != req.profile.id) {
                throw createError.NotFound("You don't have such incoming friends request");
            }
        } else {
            // pass. That situation should be rewieved in future
        }

        req.friendsRequest = friendsRequest;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    userById,
    friendsRequestById,
};