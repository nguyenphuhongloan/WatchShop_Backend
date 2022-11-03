const Joi = require("@hapi/joi");
const joi = require("@hapi/joi");
const schemas = {
    add: joi.object().keys({
        idProduct: joi.string().required(),
        amount: joi.number().required(),
    }),
    subtract: joi.object().keys({
        idProduct: joi.string().required(),
        amount: joi.number().required(),
    }),
    delete: joi.object().keys({
        idProduct: joi.string().required(),
    }), 
};
module.exports = schemas;