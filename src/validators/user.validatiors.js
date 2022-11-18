const joi = require("@hapi/joi");
const schemas = {
    edit: joi.object().keys({
        id: joi.string().required(),
        name: joi.string(),
        email: joi.string(),
        avatar: joi.string(),
        address: joi.string(),
        password: joi.string(),
        position: joi.string(),
        status: joi.string()
    }),
    editProfile: joi.object().keys({
        id: joi.string().required(),
        name: joi.string(),
        email: joi.string(),
        avatar: joi.string(),
        address: joi.string(),
    }),
    delete: joi.object().keys({
        id: joi.string().required(),
    })
};
module.exports = schemas;