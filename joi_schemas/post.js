const Joi = require('joi');

const LIMITATIONS = {
    content_max_len: 1000,
    content_min_len: 1,
};

const PostSchema = Joi.object({
    content: Joi.string()
        .trim()
        .required()
        .max(LIMITATIONS.content_max_len)
        .min(LIMITATIONS.content_min_len)
});


module.exports = {
    PostSchema,
};