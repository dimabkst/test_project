const prisma = require('../prisma_client');
const prismaHelpers = require('../helpers/prisma');
const createError = require('http-errors');

const searchUser = async (req, res, next) => {
    try {
        if (!req.body.data) {
            req.body.data = "";
        }
        const data = req.body.data.trim();
        const searchByFullName = data.split(' ').length == 2;
        let users;
        if (searchByFullName) {
            const [firstName, lastName] = data.split(' ');
            users = await prisma.user.findMany({
                where: {
                    firstName: {
                        contains: firstName,
                        mode: 'insensitive'
                    },
                    lastName: {
                        contains: lastName,
                        mode: 'insensitive'
                    }
                },
                select: prismaHelpers.DEFAULT_SELECT
            });
        } else {
            users = await prisma.user.findMany({
                where: {
                    OR: [{
                        username: {
                            contains: data,
                            mode: 'insensitive'
                        }
                    },
                    {
                        firstName: {
                            contains: data,
                            mode: 'insensitive'
                        }
                    },
                    {
                        lastName: {
                            contains: data,
                            mode: 'insensitive'
                        }
                    }
                    ]
                }
                ,
                select: prismaHelpers.DEFAULT_SELECT
            });
        }

        users = await prismaHelpers.excludeNotSetUsersUniqueFieldsAndFieldsNotToShow(users);

        res.status(200).json({
            status: 200,
            data: { users: users }
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    searchUser,
}