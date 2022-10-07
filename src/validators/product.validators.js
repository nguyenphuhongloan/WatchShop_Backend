const joi = require('@hapi/joi')
const schemas = {
    create: joi.object().keys({
        name: joi.string().required(),
        description: joi.string(),
        price: joi.number().required(),
        image: joi.string(),
        amount: joi.number().required(),
        idTrademark: joi.string().required(),
        status: joi.number(),
    }),
    edit: joi.object().keys({
        id: joi.string().required(),
        name: joi.string(),
        description: joi.string(),
        price: joi.number(),
        image: joi.string(),
        amount: joi.number(),
        idTrademark: joi.string(),
        status: joi.number(),
    }),
    delete: joi.object().keys({
        id: joi.string().required(),
    })
};
module.exports = schemas;