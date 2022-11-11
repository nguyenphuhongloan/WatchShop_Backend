const express = require("express");
const route = express.Router();
const SchemasValidateBill = require("../validators/bill.validators");
const Validate = require("../validators/index");
const Controller = require("../controllers/bill.controller");
const jwt = require("../services/jwt.services");
const Permission = require("../services/permission.services");
const { defaultPermission } = require("../config/defaultModel");
route.post("/createBill", jwt.verify, Validate.body(SchemasValidateBill.create), Controller.createBill);
route.post("/confirmBill", jwt.verify, Permission.checkPermission(defaultPermission.Bill), Validate.body(SchemasValidateBill.changeStatus), Controller.confirmBill);
route.post("/tranferringBill", jwt.verify, Permission.checkPermission(defaultPermission.Bill), Validate.body(SchemasValidateBill.changeStatus), Controller.tranferringBill);
route.post("/cancelBillUser", jwt.verify, Validate.body(SchemasValidateBill.changeStatus), Controller.cancelBill);
route.post("/cancelBill", jwt.verify, Permission.checkPermission(defaultPermission.Bill), Validate.body(SchemasValidateBill.changeStatus), Controller.cancelBill);
route.get("/getAllBills", jwt.verify, Permission.checkPermission(defaultPermission.Bill), Controller.getAllBills);
route.get("/getAllMyBills", jwt.verify, Controller.getBillByUserId);
route.get("/getBillByUserId/:id", jwt.verify, Permission.checkPermission(defaultPermission.Bill), Controller.getBillByUserId)
route.get("/getMyDetailBill/:id", jwt.verify, Controller.getDetailBill);
route.get("/getDetailBill/:id", jwt.verify, Permission.checkPermission(defaultPermission.Bill), Controller.getDetailBill);
module.exports = route;