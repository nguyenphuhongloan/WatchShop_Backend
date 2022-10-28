const express = require("express");
const productRoute = require("../routes/product.route");
const authRoute = require("../routes/auth.route");
const categoryRoute = require("../routes/category.route");
const trademarkRoute = require("../routes/trademark.route");
const router = express.Router();
router.use("/product", productRoute);
router.use("/category", categoryRoute);
router.use("/trademark", trademarkRoute);
router.use("/", authRoute);
module.exports = router;