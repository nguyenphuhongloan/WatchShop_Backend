const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const supplier = new Schema({
    name: defaultModel.stringU,
    email: defaultModel.email,
    address: defaultModel.stringR,
    phone: defaultModel.phoneNumber,
});
module.exports = mongoose.model("Supplier", supplier);