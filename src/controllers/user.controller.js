const controller = require('../controllers/index');
const userService = require('../services/user.services');
const getAllCustomers = async (req, res, next) => {
    try {
        const resService = await userService.getAllCustomers();
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const getAllStaffs = async (req, res, next) => {
    try {
        const resService = await userService.getAllStaffs(req.query);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const getMyProfile = async (req, res, next) => {
    try {
        const resService = await userService.getMyProfile(req.value.header.tokenDecoded.data);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const getStaffById = async (req, res, next) => {
    try {
        const resService = await userService.getUserById(req.params.id, "Staff");
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const getCustomerById = async (req, res, next) => {
    try {
        const resService = await userService.getUserById(req.params.id, "Customer");
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const editStaff = async (req, res, next) => {
    try {
        const resService = await userService.editStaff(req.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const editMyProfile = async (req, res, next) => {
    try {
        if (req.value.header.tokenDecoded.data != req.body.id)
            return controller.sendSuccess(res, undefined, 300, "Edit profile failed");
        const resService = await userService.editMyProfile(req.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
}
module.exports = {
    getAllCustomers,
    getAllStaffs,
    getMyProfile,
    getStaffById,
    getCustomerById,
    editStaff,
    editMyProfile,
}