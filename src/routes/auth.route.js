const express = require("express");
const Controller = require("../controllers/auth.controller");
const router = express.Router();
const Validate = require("../validators/index");
const SchemaValidateAuth = require("../validators/auth.validators");
router.post("/register", Validate.body(SchemaValidateAuth.register), Controller.register);
router.post("/login", Validate.body(SchemaValidateAuth.login), Controller.login);
module.exports = router;