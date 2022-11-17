const controller = require('../controllers/index');
const userService = require('../services/user.services');
const getAllCustomers = async (req, res, next) => {
    try {
        const resService = await userService.getAllCustomers();
        if(!resService.success){
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const getAllStaffs = async (req, res, next) => {
    try {
        const resService = await userService.getAllStaffs();
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
}
module.exports = {
    getAllCustomers,
    getAllStaffs,
    getMyProfile
}