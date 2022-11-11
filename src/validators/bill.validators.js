const joi = require("@hapi/joi");
const schemas = {
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