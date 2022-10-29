const express = require("express");
const router = express.Router();
const Controller = require("../controllers/trademark.controller");
const Validator = require("../validators/index");
const SchemasTrademarkValidator = require("../validators/trademark.validators")
router.get('/getAllTrademarks', Controller.getAllTrademarks);
router.post('/createTrademark', Validator.body(SchemasTrademarkValidator.create), Controller.createTrademark);
router.put('/editTrademark', Validator.body(SchemasTrademarkValidator.edit), Controller.editTrademark);
router.delete('/deleteTrademark', Validator.body(SchemasTrademarkValidator.delete), Controller.deleteTrademark);
module.exports = router;