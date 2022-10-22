const express = require("express");
const productRoute = require("../routes/product.route");
const authRoute = require("../routes/auth.route");
const router = express.Router();
router.use("/product", productRoute);
router.use("/", authRoute);
module.exports = router;