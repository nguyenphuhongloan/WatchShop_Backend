const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const trademark = new Schema({
    name: defaultModel.stringU,
});
module.exports = mongoose.model("Trademark", trademark);