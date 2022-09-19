const PrismaClient = require('@prisma/client');

/* 
    This file is created to use only one instance of Prisma client in code as described in:
    https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/instantiate-prisma-client
*/
let prisma = new PrismaClient();

module.exports = prisma;