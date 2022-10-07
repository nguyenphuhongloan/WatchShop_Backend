const mongoose = require('mongoose');
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const product = new Schema({
    name: defaultModel.stringU,
    description: defaultModel.string,
    price: defaultModel.number,
    image: defaultModel.string,
    amount: defaultModel.number,
    idTrademark: defaultModel.stringR,
    status: defaultModel.number
});
module.exports = mongoose.model('Product', product);