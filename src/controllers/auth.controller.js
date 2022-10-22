const authService = require("../services/auth.services");
const controller = require("../controllers/index");
const register = async (req, res, next) => {
    try{
        const resService = await authService.register(req.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }

};
const login = async (req, res, next) => {
    try{
        const resService = await authService.login(req.body);
        if(!resService.success){
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch(err){
        return controller.sendError(res);
    }
}
module.exports = {
    register,
    login,
}