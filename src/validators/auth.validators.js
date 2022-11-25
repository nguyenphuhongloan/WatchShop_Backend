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
    changePassword: joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required(),
        newPassword: joi.string().required(),
    }),
    requireResetPassword: joi.object().keys({
        email: joi.string().required(),
    }),
    resetPassword: joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required(),
    })
};
module.exports = schemas;