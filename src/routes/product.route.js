const express = require("express");
const Controller = require("../controllers/product.controller");
const Validate = require("../validators/index");
const SchemaValidateProduct = require("../validators/product.validators");
const jwt = require("../services/jwt.services")
const multer = require("../config/storage");
const router = express.Router();
router.get("/getAllProducts", Validate.query(SchemaValidateProduct.pages),
    Validate.query(SchemaValidateProduct.sort),
    Validate.query(SchemaValidateProduct.status),
    Controller.getAllProducts);
router.get("/getProductById/:id", Controller.getProductById);
router.post("/createProduct", jwt.verify, multer.single("image"), Validate.body(SchemaValidateProduct.create), Controller.createProduct);
router.put("/editProduct", jwt.verify, Validate.body(SchemaValidateProduct.edit), Controller.editProduct);
router.delete("/deleteProduct", jwt.verify, Validate.body(SchemaValidateProduct.delete), Controller.deleteProduct);
module.exports = router;