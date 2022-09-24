const prisma = require('../prisma_client');
const { problematicUserUniqueFields } = require('../constants');

const DEFAULT_SELECT = {
    id: true,
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    city: true,
    birthday: true,
    profilePicture: true
};


const exclude = (model, ...keys) => {
    for (let key of keys) {
        delete model[key];
    }

    return model;
};

const excludeNotSetUserUniqueFieldsAndPassword = async (user) => {
    const possibleNotSetFields = problematicUserUniqueFields;
    for (let field of possibleNotSetFields) {
        if (await prisma.user_unique_values_ids.findFirst({
            where: {
                id: user[field]
            }
        })) {
            delete user[field];
        }
    }
    delete user['password'];
    return user;
}

module.exports = {
    DEFAULT_SELECT,
    exclude,
    excludeNotSetUserUniqueFieldsAndPassword,
};