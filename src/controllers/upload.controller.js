const uploadService = require("../services/upload.services");
const { PARENT_FOLDER } = require("../config/index");
const { PRODUCTS_FOLDER } = require("../config/index");
const controller = require("../controllers/index")
const uploadFile = async (req, res, next) => {
    try{
        var dir = PARENT_FOLDER
        if(req.baseUrl == "/product")
            dir = PRODUCTS_FOLDER
        const resService = await uploadService.uploadFile(req.file, dir);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    };
};
module.exports = {
    uploadFile
}