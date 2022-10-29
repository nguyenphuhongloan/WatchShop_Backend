const joi = require("@hapi/joi");
const schemas = {
    create: joi.object().keys({
        name: joi.string().required(),
        idPermission: joi.array().items({
            id: joi.string().required()
        })
    }),
    edit: joi.object().keys({
        id: joi.string().required(),
        name: joi.string(),
        idPermission: joi.array().items({
            id: joi.string().required(),
        })
    }),
    delete: joi.object().keys({
        id: joi.string().required(),
    }),
};
module.exports = schemas