const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const permission = new Schema({
    name: defaultModel.stringU,
});
module.exports = mongoose.model("Permission", permission);