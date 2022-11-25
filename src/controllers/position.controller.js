
const positionService = require("../services/position.services");
const controller = require("../controllers/index");
const getAllPositions = async (req, res, next) => {
    try {
        const resService = await positionService.getAllPositions(req.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const getPositionById = async (req, res, next) => {
    try {
        const resService = await positionService.getPositionById(req.params.id);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const createPosition = async (req, res, next) => {
    try {
        const resService = await positionService.createPosition(req.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const editPosition = async (req, res, next) => {
    try {
        const resService = await positionService.editPosition(req.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
};
const deletePosition = async (req, res, next) => {
    try {
        const resService = await positionService.deletePosition(req.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
module.exports = {
    getAllPositions,
    getPositionById,
    createPosition,
    editPosition,
    deletePosition
}