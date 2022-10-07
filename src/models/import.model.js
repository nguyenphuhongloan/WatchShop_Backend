const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const Import = new Schema({
    idSubplier: defaultModel.stringR,
    total: defaultModel.number,
    amount: defaultModel.number,
});
module.exports = mongoose.model("Import", Import);