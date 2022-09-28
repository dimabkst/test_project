const { PrismaClient } = require('@prisma/client');
const { passwordHasingMiddleware,
    userCreationHandleNullUniqueValuesMiddleware,
    userUpdateHandlePlugedUniqueValuesMiddleware,
    userDeleteHandlePlugedUniqueValuesMiddleware,
} = require('./middlewares/prisma/users');

/* 
    This file is created to use only one instance of Prisma client in code as described in:
    https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
*/
let prisma = new PrismaClient();

prisma.$use(passwordHasingMiddleware);
prisma.$use(userCreationHandleNullUniqueValuesMiddleware);
prisma.$use(userUpdateHandlePlugedUniqueValuesMiddleware);
prisma.$use(userDeleteHandlePlugedUniqueValuesMiddleware);

module.exports = prisma;