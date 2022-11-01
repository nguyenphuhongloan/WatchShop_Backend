const express = require("express");
const router = express.Router();
const Controller = require("../controllers/trademark.controller");
const Validator = require("../validators/index");
const SchemasTrademarkValidator = require("../validators/trademark.validators");
const {defaultPermission} = require("../config/defaultModel");
const Permission = require("../services/permission.services");
const jwt = require("../services/jwt.services")
router.get('/getAllTrademarks', Controller.getAllTrademarks);
router.post('/createTrademark', jwt.verify, Permission.checkPermission(defaultPermission.Trademark), Validator.body(SchemasTrademarkValidator.create), Controller.createTrademark);
router.put('/editTrademark', jwt.verify, Permission.checkPermission(defaultPermission.Trademark), Validator.body(SchemasTrademarkValidator.edit), Controller.editTrademark);
router.delete('/deleteTrademark', jwt.verify, Permission.checkPermission(defaultPermission.Trademark), Validator.body(SchemasTrademarkValidator.delete), Controller.deleteTrademark);
module.exports = router;