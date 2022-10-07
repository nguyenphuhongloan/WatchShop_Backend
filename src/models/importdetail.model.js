const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const importDetail = new Schema({
    idImport: defaultModel.stringR,
    idProduct: defaultModel.stringR,
    price: defaultModel.int,
    amount: defaultModel.int,
});
module.exports = mongoose.model("ImportDetail", importDetail);