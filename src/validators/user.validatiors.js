const joi = require("@hapi/joi");
const schemas = {
    create: joi.object().keys({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        avatar: joi.string,
        addresses: joi.string().required(),
        position: joi.string().required(),
    }),
    edit: joi.object().keys({
        id: joi.string().required(),
        name: joi.string(),
        password: joi.string(),
        avatar: joi.string(),
        address: joi.string(),
        position: joi.string(),
    }),
    delete: joi.object().keys({
        id: joi.string().required(),
    })
};
module.exports = schemas;