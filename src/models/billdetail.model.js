const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const billDetails = new Schema({
    idBill: defaultModel.stringR,
    idProduct: defaultModel.stringR,
    price: defaultModel.number,
    amount: defaultModel.number,
});
module.exports = mongoose.model("BillDetail", billDetail);