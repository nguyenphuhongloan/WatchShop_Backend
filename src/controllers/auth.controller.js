const authService = require("../services/auth.services");
const controller = require("../controllers/index");
const jwt = require("../services/jwt.services")
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
};
const verified = async (req, res, next) => {
    try{
        const resService = await authService.saveUser(req.value.body.tokenDecoded.data);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch(err){
        return controller.sendError(res)
    }
}
const requireResetPassword = async (req, res, next) => {
    try {
        const resService = await authService.requireResetPassword(req.body.email);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const verifiedResetPassword = async (req, res, next) => {
    try {
        res.cookie("ResetPassword", req.params.token, {
            maxAge: 15 * 60 * 1000,
             httpOnly: true
        });
        return controller.sendSuccess(res, undefined ,200, "Token verified");
    } catch (err) {
        return controller.sendError(res, "Token expired")
    }
};
const resetPassword = async (req, res, next) => {
    try {
        const verify = jwt.decodeToken(req.cookies.ResetPassword);
        if(!verify.success)
            return controller.sendSuccess(res, undefined, 300, verify.message);
        if(verify.data.tokenDecoded.data.email != req.body.email)
            return controller.sendSuccess(res, undefined, 300, "Token invalid")
        const resService = await authService.resetPassword(req.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const changePassword = async (req, res, next) => {
    try {
        const resService = await authService.changePassword(req.body, req.value.header.tokenDecoded.data);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
}
module.exports = {
    register,
    login,
    verified,
    requireResetPassword,
    verifiedResetPassword,
    resetPassword,
    changePassword
}