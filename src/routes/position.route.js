const express = require("express");
const router = express.Router();
const Controller = require("../controllers/position.controller");
const Validator = require("../validators/index");
const SchemasPositionValidator = require("../validators/position.validators")
router.get('/getAllPositions', Controller.getAllPositions);
router.post('/createPosition', Validator.body(SchemasPositionValidator.create), Controller.createPosition);
router.put('/editPosition', Validator.body(SchemasPositionValidator.edit), Controller.editPosition);
router.delete('/deletePosition', Validator.body(SchemasPositionValidator.delete), Controller.deletePosition);
module.exports = router;