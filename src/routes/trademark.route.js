const express = require("express");
const router = express.Router();
const Controller = require("../controllers/trademark.controller")
router.get('/getAllTrademarks', Controller.getAllTrademarks);
module.exports = router