const joi = require("@hapi/joi");
const schemas = {
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