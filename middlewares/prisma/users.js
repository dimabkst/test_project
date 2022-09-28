const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // Cannot use one from prisma_client due to circular dependency
const bcrypt = require('bcrypt');
const { problematicUserUniqueFields } = require('../../constants');

const BCRYPT_SALT = 10;

const passwordHasingMiddleware = async (params, next) => {
    try {
        if ((params.action == 'create' || params.action == 'update') // Can add here Many actions but it doesn't make sense yet
            && params.model == 'User' && params.args.data.password) {
            let user = params.args.data;
            const salt = await bcrypt.genSalt(BCRYPT_SALT);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            params.args.data = user;
        }
        return await next(params);
    } catch (err) {
        throw err;
    }
};

const userCreationHandleNullUniqueValuesMiddleware = async (params, next) => {
    try {
        if ((params.action == 'create' || params.action == 'createMany') && params.model == 'User') {
            const possibleNullUniqueFields = problematicUserUniqueFields;
            let userOrUsersData = params.args.data;
            for (let field of possibleNullUniqueFields) {
                if (!userOrUsersData[field]) {
                    let fieldPlug = await prisma.userUniqueValuesIds.create({
                        data: { field: field }
                    });
                    userOrUsersData[field] = fieldPlug.id;
                }
            }
            params.args.data = userOrUsersData;
        }
        return await next(params);
    } catch (err) {
        throw err;
    }
};

const userUpdateHandlePlugedUniqueValuesMiddleware = async (params, next) => {
    try {
        if ((params.action == 'update' || params.action == 'updateMany') && params.model == 'User') {
            const possibleNullUniqueFields = problematicUserUniqueFields;
            let updateData = params.args.data;
            const updatedUsers = await prisma.user.findMany({
                where: params.args.where
            });

            for (let field of possibleNullUniqueFields) {
                if (updateData[field]) {
                    for (let user of updatedUsers) {
                        let userFieldPlug = await prisma.userUniqueValuesIds.findFirst({
                            where: {
                                id: user[field]
                            }
                        });

                        if (userFieldPlug) {
                            await prisma.userUniqueValuesIds.delete({
                                where: {
                                    id: userFieldPlug.id
                                }
                            });
                        }
                    }
                }
            }
        }
        return await next(params);
    } catch (err) {
        throw err;
    }
};

const userDeleteHandlePlugedUniqueValuesMiddleware = async (params, next) => {
    try {
        if ((params.action == 'delete' || params.action == 'deleteMany') && params.model == 'User') {
            console.log(params);
            const possibleNullUniqueFields = problematicUserUniqueFields;
            const deletedUsers = await prisma.user.findMany({
                where: params.args.where
            });

            for (let field of possibleNullUniqueFields) {
                for (let user of deletedUsers) {
                    let userFieldPlug = await prisma.userUniqueValuesIds.findFirst({
                        where: {
                            id: user[field]
                        }
                    });

                    if (userFieldPlug) {
                        await prisma.userUniqueValuesIds.delete({
                            where: {
                                id: userFieldPlug.id
                            }
                        });
                    }
                }
            }
        }
        return await next(params);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    passwordHasingMiddleware,
    userCreationHandleNullUniqueValuesMiddleware,
    userUpdateHandlePlugedUniqueValuesMiddleware,
    userDeleteHandlePlugedUniqueValuesMiddleware,
};