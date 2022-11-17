const joi = require('@hapi/joi')
const schemas = {
    create: joi.object().keys({
        name: joi.string().required(),
        description: joi.string(),
        price: joi.number().required(),
        image: joi.string(),
        amount: joi.number().required(),
        idTrademark: joi.string().required(),
        idSubCategories: joi.array().items({
            id: joi.string(),
        }),
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
        idSubCategories: joi.array().items({
            id: joi.string(),
        }),
        status: joi.number(),
    }),
    delete: joi.object().keys({
        id: joi.string().required(),
    }),
    search: joi.object().keys({
        name: joi.string().required(),
    }),
    pages: joi.object().keys({
        page: joi.number().default(1),
        numberProductsOfPage: joi.number().default(12),
    }),
    sort: joi.object().keys({
        sort: joi.string().valid("price", "amount"),
        type: joi.string().valid("asc", "desc"),
    }),
    price: joi.object().keys({
        low: joi.number().default(0),
        high: joi.number().required(),
    }),
    status: joi.object().keys({
        status: joi.number().min(0).max(2),
    })
};
module.exports = schemas;