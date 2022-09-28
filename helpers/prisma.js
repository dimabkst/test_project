const prisma = require('../prisma_client');
const { problematicUserUniqueFields, userFieldsNotToShow } = require('../constants');

const DEFAULT_SELECT = {
    id: true,
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    facebookId: true,
    googleId: true,
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

const excludeNotSetUserUniqueFieldsAndFieldsNotToShow = async (user) => {
    const possibleNotSetFields = problematicUserUniqueFields;
    for (let field of possibleNotSetFields) {
        if (await prisma.userUniqueValuesIds.findFirst({
            where: {
                id: user[field]
            }
        })) {
            delete user[field];
        }
    }
    for (let field of userFieldsNotToShow) {
        delete user[field];
    }
    return user;
}

const excludeNotSetUsersUniqueFieldsAndFieldsNotToShow = async (users) => {
    let tempUsers = [];
    for (let user of users) {
        user = await excludeNotSetUserUniqueFieldsAndFieldsNotToShow(user);
        tempUsers.push(user);
    }
    return tempUsers;
}

module.exports = {
    DEFAULT_SELECT,
    exclude,
    excludeNotSetUserUniqueFieldsAndFieldsNotToShow,
    excludeNotSetUsersUniqueFieldsAndFieldsNotToShow
};