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

module.exports = {
    DEFAULT_SELECT,
    exclude,
};