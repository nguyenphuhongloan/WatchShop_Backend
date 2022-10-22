const express = require("express");
const Controller = require("../controllers/auth.controller");
const router = express.Router();
const Validate = require("../validators/index");
const SchemasValidateAuth = require("../validators/auth.validators");
router.post("/register", Validate.body(SchemasValidateAuth.register), Controller.register);
router.post("/login", Validate.body(SchemasValidateAuth.login), Controller.login);
module.exports = router;