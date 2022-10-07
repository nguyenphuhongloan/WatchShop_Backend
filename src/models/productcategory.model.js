const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const productCategory = new Schema({
    idSubCategory: defaultModel.stringR,
    idProduct: defaultModel.stringR,
});
module.exports = mongoose.model("ProductCategory", productCategory);