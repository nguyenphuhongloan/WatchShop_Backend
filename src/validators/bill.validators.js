const joi = require("@hapi/joi");
const schemas = {
    pages: joi.object().keys({
        page: joi.number().default(1),
        numberProductsOfPage: joi.number().default(12),
    }),
    sort: joi.object().keys({
        sort: joi.string().valid("price", "amount"),
        type: joi.string().valid("asc", "desc"),
    }),
    totalPrice: joi.object().keys({
        low: joi.number().default(0),
        high: joi.number(),
    }),
    date: joi.object().keys({
        start: joi.date(),
        end: joi.date(),
    }),
    status: joi.object().keys({
        start: joi.number(),
    }),
    create: joi.object().keys({
        idUser: joi.string().required(),
        name: joi.string().required(),
        address: joi.string().required(),
        phone: joi.string().required(),
        detailBill: joi.array().items({
            idProduct: joi.string().required(),
            amount: joi.number().required(),
        }),
        note: joi.string(),
    }),
    changeStatus: joi.object().keys({
        id: joi.string().required(),
    })
};
module.exports = schemas