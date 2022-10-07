const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const category = new Schema({
    name: defaultModel.StringU,
});
module.exports = mongoose.model("Category", category);