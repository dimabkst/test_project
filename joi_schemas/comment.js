const Joi = require('joi');

const LIMITATIONS = {
    content_max_len: 100,
    content_min_len: 1,
};

const CommentSchema = Joi.object({
    content: Joi.string()
        .trim()
        .required()
        .max(LIMITATIONS.content_max_len)
        .min(LIMITATIONS.content_min_len)
});

module.exports = {
    CommentSchema,
};