const express = require("express");
const router = express.Router();
const Controller = require("../controllers/user.controller");
const {defaultPermission} = require("../config/defaultModel");
const Permission = require("../services/permission.services");
const jwt = require("../services/jwt.services");
router.get("/getAllCustomers", jwt.verify, Permission.checkPermission(defaultPermission.Customer), Controller.getAllCustomers);
router.get("/getAllStaffs", jwt.verify, Permission.checkPermission(defaultPermission.Staff),Controller.getAllStaffs);
module.exports = router;
