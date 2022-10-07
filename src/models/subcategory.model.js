const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const subCategory = new Schema({
    name: defaultModel.StringU,
    idCategory: defaultModel.StringR,
});
module.exports = mongoose.model("Subcategory", subCategory);