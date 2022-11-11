const controller = require("../controllers/index");
const billService = require("../services/bill.services");
const createBill = async (req, res, next) => {
    try {
        const resService = await billService.createBill(req.body);
        if(!resService.success)
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch(err){
        return controller.sendError(res)
    }
};
const confirmBill = async (req, res, next) => {
    try {
        const resService = await billService.confirmBill(req.body);
        if (!resService.success)
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const tranferringBill = async (req, res, next) => {
    try {
        const resService = await billService.tranferringBill(req.body);
        if (!resService.success)
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const cancelBill = async (req, res, next) => {
    try {
        const idUser = (req.path == "/cancelBillUser") ? req.value.header.tokenDecoded.data : "";
        req.body.idUser = idUser;
        const resService = await billService.cancelBill(req.body);
        if (!resService.success)
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const getAllBills = async (req, res, next) => {
    try {
        const resService = await billService.getAllBills();
        if (!resService.success)
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
}
const getBillByUserId = async (req, res, next) => {
    try{
        var id;
        if(req.path == "/getAllMyBills")
            id = req.value.header.tokenDecoded.data;
        else 
            id = req.params.id;
        const resService = await billService.getBillByUserId(id);
        if (!resService.success)
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        return controller.sendSuccess(res, resService.data, 200, resService.message);
    } catch (err) {
        return controller.sendError(res)
    }
};
const getDetailBill = async (req, res, next) => {
    try {
        const {id} = req.params;
        const idUser =  (req.route.path == "/getMyDetailBill/:id") ? req.value.header.tokenDecoded.data : "";
        const resService = await billService.getDetailBill(id, idUser);
        if (!resService.success)
            return controller.sendSuccess(res, resService.data, 300, resService.message);
        return controller.sendSuccess(res, resService.data, 200, resService.message); 
    } catch (err) {
        return controller.sendError(res)
    }
}
module.exports = {
    createBill,
    confirmBill,
    tranferringBill,
    cancelBill,
    getAllBills,
    getBillByUserId,
    getDetailBill
}