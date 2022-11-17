const joi = require("@hapi/joi");
const schemas = {
    register: joi.object().keys({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        avatar: joi.string(),
        address: joi.string().required(),
    }),
    registerStaff: joi.object().keys({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        avatar: joi.string(),
        address: joi.string().required(),
        position: joi.string().required(),
    }),
    login: joi.object().keys({
        email: joi.string().required(),
        password: joi.string().min(6).required(),
    }),
};
module.exports = schemas;