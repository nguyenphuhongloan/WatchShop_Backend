const express = require("express");
const router = express.Router();
const Controller = require("../controllers/category.controller");
const Validate = require("../validators/index");
const SchemaValidateCategory = require("../validators/category.validators");
router.get("/getAllCategories", Controller.getAllCategories);
router.post("/createCategory",Validate.body(SchemaValidateCategory.create), Controller.createCategory);
router.put("/editCategory", Validate.body(SchemaValidateCategory.edit), Controller.editCategory);
module.exports = router;