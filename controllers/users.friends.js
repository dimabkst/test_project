const prisma = require('../prisma_client');
const prismaHelpers = require('../helpers/prisma');
const createError = require('http-errors');

const getUserFriends = async (req, res, next) => {
    try {
        let userFriends = await prisma.user.findMany({
            where: {
                friends: {
                    some: {
                        id: req.profile.id
                    }
                }
            },
            select: prismaHelpers.DEFAULT_SELECT
        });
        userFriends = await prismaHelpers.excludeNotSetUsersUniqueFieldsAndFieldsNotToShow(userFriends);

        res.status(200).json({
            status: 200,
            data: { friends: userFriends }
        });
    } catch (err) {
        next(err);
    }
};

const removeUserFriend = async (req, res, next) => {
    try {
        const friend = await prisma.user.findUnique({
            where: {
                id: req.params.friendId
            }
        });
        if (!friend) {
            throw createError.NotFound("User with such Id not found");
        }

        const authUser = await prisma.user.findUnique({ where: { id: req.auth.id } });
        if (!authUser.friendsIds.includes(friend.id)) {
            throw createError.BadRequest("That user is not in your friends list");
        }

        await prisma.user.update({
            where: {
                id: authUser.id
            },
            data: {
                friends: {
                    disconnect: {
                        id: friend.id
                    }
                }
            }
        });
        await prisma.user.update({
            where: {
                id: friend.id
            },
            data: {
                friends: {
                    disconnect: {
                        id: authUser.id
                    }
                }
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


const getIncomingFriendsRequests = async (req, res, next) => {
    try {
        const user = req.auth;

        const userIncomingFriendsRequests = await prisma.friendsRequest.findMany({
            where: {
                to: user.id
            }
        });

        res.status(200).json({
            statuts: 200,
            data: {
                icomingFriendsRequests: userIncomingFriendsRequests
            }
        });
    } catch (err) {
        next(err);
    }
};

const getOutcomingFriendsRequests = async (req, res, next) => {
    try {
        const user = req.auth;

        const userOutcomingFriendsRequests = await prisma.friendsRequest.findMany({
            where: {
                from: user.id
            }
        });

        res.status(200).json({
            statuts: 200,
            data: {
                outcomingFriendsRequests: userOutcomingFriendsRequests
            }
        });
    } catch (err) {
        next(err);
    }
};

const createOutcomingFriendsRequest = async (req, res, next) => {
    try {
        const receiver = await prisma.user.findUnique({
            where: {
                id: req.body.userId
            }
        });
        if (!receiver) {
            throw createError.NotFound("User with such Id not found");
        }

        const requester = await prisma.user.findUnique({
            where: {
                id: req.auth.id
            }
        });

        if (requester.friendsIds.includes(receiver.id)) {
            throw createError.BadRequest("That user is already your friend");
        }
        if (requester.id == receiver.id) {
            throw createError.BadRequest("You cannot be added to your friends list");
        }
        if (await prisma.friendsRequest.findFirst({
            where: { from: requester.id, to: receiver.id }
        })) {
            throw createError.Conflict("You have already sent friends request to that user");
        }
        if (await prisma.friendsRequest.findFirst({
            where: { from: receiver.id, to: requester.id }
        })) {
            throw createError.Conflict("User have already sent friends request to you");
        }

        const friendsRequest = await prisma.friendsRequest.create({
            data: {
                from: requester.id,
                to: receiver.id
            }
        });

        res.status(201).location(`/users/${requester.id}/friends/requests/outcomings/${friendsRequest.id}`).json({
            status: 201,
            data: null
        });
    } catch (err) {
        next(err);
    }
};

const getIncomingFriendsRequest = async (req, res, next) => {
    try {
        res.status(200).json({
            statuts: 200,
            data: {
                incomingFriendsRequest: req.friendsRequest
            }
        });
    } catch (err) {
        next(err);
    }
};

const answerIncomingFriendsRequest = async (req, res, next) => {
    try {
        const answer = req.body.answer;

        if (answer == "Confirm") {
            await prisma.user.update({
                where: {
                    id: req.friendsRequest.from
                },
                data: {
                    friends: {
                        connect: {
                            id: req.friendsRequest.to
                        }
                    }
                }
            });
            await prisma.user.update({
                where: {
                    id: req.friendsRequest.to
                },
                data: {
                    friends: {
                        connect: {
                            id: req.friendsRequest.from
                        }
                    }
                }
            });
        }

        await prisma.friendsRequest.delete({
            where: {
                id: req.friendsRequest.id
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

const getOutcomingFriendsRequest = async (req, res, next) => {
    try {
        res.status(200).json({
            statuts: 200,
            data: {
                outcomingFriendsRequest: req.friendsRequest
            }
        });
    } catch (err) {
        next(err);
    }
};

const deleteOutcomingFriendsRequest = async (req, res, next) => {
    try {
        await prisma.friendsRequest.delete({
            where: {
                id: req.friendsRequest.id
            }
        });

        res.status(200).json({
            status: 200,
            data: null
        })
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUserFriends,
    removeUserFriend,
    getIncomingFriendsRequests,
    getOutcomingFriendsRequests,
    createOutcomingFriendsRequest,
    getIncomingFriendsRequest,
    answerIncomingFriendsRequest,
    getOutcomingFriendsRequest,
    deleteOutcomingFriendsRequest,
}