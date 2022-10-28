const trademarkService = require("../services/trademark.services");
const controller = require("../controllers/index");
const getAllTrademarks = async (req, res, next) => {
    try {
        const resService = await trademarkService.getAllTrademarks(req.body);
        if (!resService.success) {
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        }
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
module.exports = {
    getAllTrademarks
}