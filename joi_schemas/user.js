const Joi = require('joi');

const LIMITATIONS = {
    username_min_len: 3,
    username_max_len: 20,
    firstName_min_len: 1,
    firstName_max_len: 50,
    lastName_min_len: 1,
    lastName_max_len: 50,
    city_min_len: 1,
    city_max_len: 50,
};

/* Removed facebookId and googleId so user won't be able to change them using
PUT request. We don't need them here because when loginning with FB, Google
there is no Joi validation of input (that data was already validated by FB, Google)
*/
const UserSchema = Joi.object({
    firstName: Joi.string()
        .min(LIMITATIONS.firstName_min_len)
        .max(LIMITATIONS.firstName_max_len)
        .required()
        .trim(),

    lastName: Joi.string()
        .min(LIMITATIONS.lastName_min_len)
        .max(LIMITATIONS.lastName_max_len)
        .required()
        .trim(),

    username: Joi.string()
        .min(LIMITATIONS.username_min_len)
        .max(LIMITATIONS.username_max_len)
        .trim(),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .trim(),
    // or use .pattern(new RegExp('^.+\@.+\..+$')),

    phoneNumber: Joi.string()
        .trim(),

    city: Joi.string()
        .min(LIMITATIONS.city_min_len)
        .max(LIMITATIONS.city_max_len)
        .trim(),

    birthday: Joi.date()
        .iso(),
    // or use .pattern(new RegExp(/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[1-2][0-9]|3[0-1])$/))

    profilePicture: Joi.string(),

    updatedAt: Joi.date()
        .iso()
        .required(),

    password: Joi.string()
        .required()
}).or('email', 'username', 'phoneNumber');

// Has the same fields as UserSchema and fields below are not required
// anymore, so it is possible to update User and validate input 
const UpdateUserSchema = UserSchema.keys({
    firstName: Joi.string()
        .min(LIMITATIONS.firstName_min_len)
        .max(LIMITATIONS.firstName_max_len)
        .trim(),

    lastName: Joi.string()
        .min(LIMITATIONS.lastName_min_len)
        .max(LIMITATIONS.lastName_max_len)
        .trim(),

    password: Joi.string()
});

module.exports = {
    UserSchema,
    UpdateUserSchema
};