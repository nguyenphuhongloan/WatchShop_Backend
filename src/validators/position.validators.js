const joi = require("@hapi/joi");
const {defaultPermission} = require("../config/defaultModel")
const schemas = {
    create: joi.object().keys({
        name: joi.string().required(),
        permission: joi.array().items({
            name: joi.string().required().valid(...Object.values(defaultPermission))
        }).unique()
    }),
    edit: joi.object().keys({
        id: joi.string().required(),
        name: joi.string(),
        permission: joi.array().items({
            name: joi.string().required().valid(...Object.values(defaultPermission))
        }).unique()
    }),
    delete: joi.object().keys({
        id: joi.string().required(),
    }),
};
module.exports = schemas