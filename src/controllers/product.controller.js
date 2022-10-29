const productService = require("../services/product.services");
const controller = require("./index");
const getAllProducts = async (req, res, next) => {
    try {
        const resService = await productService.getAllProducts(req.query);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const getProductById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const resService = await productService.getProductById(id);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const createProduct = async (req, res, next) => {
    try{
        const resService = await productService.createProduct(req.value.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const editProduct = async (req, res, next) => {
    try {
        const resService = await productService.editProduct(req.value.body);
        if(!resService.success){
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const deleteProduct = async (req, res, next) => {
    try{
        const resService = await productService.deleteProduct(req.value.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch(err){
        return controller.sendError(res);
    }
}
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
}