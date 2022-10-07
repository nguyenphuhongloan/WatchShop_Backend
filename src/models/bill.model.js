const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const bill = new Schema({
    idUser: defaultModel.stringR,
    name: defaultModel.stringR,
    address: defaultModel.stringR,
    phone: defaultModel.phoneNumber,
    total: defaultModel.number,
    note: defaultModel.string,
    status: defaultModel.number,
},
{
    timestamp: true
});
module.exports = mongoose.model("Bill", bill);