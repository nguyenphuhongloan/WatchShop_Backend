const joi = require("@hapi/joi");
const schemas = {
    create: joi.object().keys({
        name: joi.string().required(),
        subCategory: joi.array().items({
            name: joi.string().required(),
        })
    }),
    edit: joi.object().keys({
        id: joi.string().required(),
        name: joi.string(),
        subCategory: joi.array().items({
            name: joi.string(),
        })
    })
};
module.exports = schemas;