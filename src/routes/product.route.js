const express = require("express");
const Controller = require("../controllers/product.controller");
const Validate = require("../validators/index");
const SchemaValidateProduct = require("../validators/product.validators");
const jwt = require("../services/jwt.services")
const multer = require("../config/storage");
const router = express.Router();
const Permission = require("../services/permission.services");
const {defaultPermission} = require("../config/defaultModel");
const Upload = require("../controllers/upload.controller");
router.get("/getAllProducts", Validate.query(SchemaValidateProduct.pages),
    Validate.query(SchemaValidateProduct.sort),
    Validate.query(SchemaValidateProduct.status),
    Controller.getAllProducts);
router.get("/getProductById/:id", Controller.getProductById);
router.get("/getProductByIdTrademark/:id", Controller.getProductByIdTrademark);
router.post("/uploadfile", jwt.verify, Permission.checkPermission(defaultPermission.Product), multer.single("image"), Upload.uploadFile);
router.post("/createProduct", jwt.verify, Permission.checkPermission(defaultPermission.Product), Validate.body(SchemaValidateProduct.create), Controller.createProduct);
router.put("/editProduct", jwt.verify, Permission.checkPermission(defaultPermission.Product), Validate.body(SchemaValidateProduct.edit), Controller.editProduct);
router.delete("/deleteProduct", jwt.verify, Permission.checkPermission(defaultPermission.Product), Validate.body(SchemaValidateProduct.delete), Controller.deleteProduct);
module.exports = router;