const express = require("express");
const router = express.Router();
const Controller = require("../controllers/position.controller");
const Validator = require("../validators/index");
const SchemasPositionValidator = require("../validators/position.validators");
const {defaultPermission} = require("../config/defaultModel");
const Permission = require("../services/permission.services");
const jwt = require("../services/jwt.services")
router.get('/getAllPositions', jwt.verify, Permission.checkPermission(defaultPermission.PositionPermission), Controller.getAllPositions);
router.get('/getPositionById/:id', jwt.verify, Permission.checkPermission(defaultPermission.PositionPermission), Controller.getPositionById);
router.post('/createPosition', jwt.verify, Permission.checkPermission(defaultPermission.PositionPermission), Validator.body(SchemasPositionValidator.create), Controller.createPosition);
router.put('/editPosition', jwt.verify, Permission.checkPermission(defaultPermission.PositionPermission), Validator.body(SchemasPositionValidator.edit), Controller.editPosition);
router.delete('/deletePosition', jwt.verify, Permission.checkPermission(defaultPermission.PositionPermission), Validator.body(SchemasPositionValidator.delete), Controller.deletePosition);
module.exports = router;