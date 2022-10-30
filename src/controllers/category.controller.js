const categoryService = require("../services/category.services");
const controller = require("./index");
const getAllCategories = async (req, res, next) => {
    try {
        const resService = await categoryService.getAllCategories();
        if (!resService) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const createCategory = async (req, res, next) => {
    try{
        const resService = await categoryService.createCategory(req.body);
        if (!resService) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, res.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const editCategory = async (req, res, next) => {
    try{
        const resService = await categoryService.editCategory(req.body);
        if (!resService) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, res.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
const deleteCategory = async (req, res, next) => {
    try{
        const resService = await categoryService.deleteCategory(req.body);
        if (!resService) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, res.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
const getAllSubCategories = async (req, res, next) => {
    try {
        const resService = await categoryService.getAllSubCategories();
        if (!resService) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const createSubCategory = async (req, res, next) => {
    try {
        const resService = await categoryService.createSubCategory(req.body);
        if (!resService) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, res.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
const editSubCategory = async (req, res, next) => {
    try {
        const resService = await categoryService.editSubCategory(req.body);
        if (!resService) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, res.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
const deleteSubCategory = async (req, res, next) => {
    try {
        const resService = await categoryService.deleteSubCategory(req.body);
        if (!resService) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, res.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
module.exports = {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    getAllSubCategories,
    createSubCategory,
    editSubCategory,
    deleteSubCategory
}