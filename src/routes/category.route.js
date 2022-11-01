const express = require("express");
const router = express.Router();
const Controller = require("../controllers/category.controller");
const Validate = require("../validators/index");
const SchemaValidateCategory = require("../validators/category.validators");
const Permission = require("../services/permission.services");
const { defaultPermission } = require("../config/defaultModel");
const jwt = require("../services/jwt.services");
router.get("/getAllCategories", Controller.getAllCategories);
router.post("/createCategory", jwt.verify, Permission.checkPermission(defaultPermission.Category), Validate.body(SchemaValidateCategory.create), Controller.createCategory);
router.put("/editCategory", jwt.verify, Permission.checkPermission(defaultPermission.Category), Validate.body(SchemaValidateCategory.edit), Controller.editCategory);
router.delete("/deleteCategory", jwt.verify, Permission.checkPermission(defaultPermission.Category), Validate.body(SchemaValidateCategory.delete), Controller.deleteCategory);
router.get("/getAllSubCategories", Controller.getAllSubCategories);
router.post("/createSubCategory", jwt.verify, Permission.checkPermission(defaultPermission.Category), Validate.body(SchemaValidateCategory.createSubCategory), Controller.createSubCategory);
router.put("/editSubCategory", jwt.verify, Permission.checkPermission(defaultPermission.Category), Validate.body(SchemaValidateCategory.editSubCategory), Controller.editSubCategory);
router.delete("/deleteSubCategory", jwt.verify, Permission.checkPermission(defaultPermission.Category), Validate.body(SchemaValidateCategory.delete), Controller.deleteSubCategory);
module.exports = router;