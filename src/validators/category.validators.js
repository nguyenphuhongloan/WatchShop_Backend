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
    }),
    delete: joi.object().keys({
        id: joi.string().required(),
    }),
    createSubCategory: joi.object().keys({
        id: joi.string().required(),
        subCategory: joi.object().keys({
            name: joi.string().required(),
        })
    }),
    editSubCategory: joi.object().keys({
        id: joi.string().required(),
        subCategory: joi.object().keys({
            name: joi.string().required(),
        })
    })
};
module.exports = schemas;