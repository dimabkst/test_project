const prisma = require('../prisma_client');
const prismaHelpers = require('../helpers/prisma');

const searchUser = async (req, res, next) => {
    try {
        const data = req.body.data.trim();
        const searchByFullName = data.split(' ').length == 2;
        let users;
        if (searchByFullName) {
            const [firstName, lastName] = data.split(' ');
            users = await prisma.user.findMany({
                where: {
                    firstName: {
                        contains: firstName
                    },
                    lastName: {
                        contains: lastName
                    }
                },
                select: prismaHelpers.DEFAULT_SELECT
            });
        } else {
            users = await prisma.user.findMany({
                where: {
                    OR: [{
                        username: {
                            contains: data
                        }
                    },
                    {
                        firstName: {
                            contains: data
                        }
                    },
                    {
                        lastName: {
                            contains: data
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