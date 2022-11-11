const mongoose = require("mongoose");
const { defaultModel } = require("../config/defaultModel");
const Schema = mongoose.Schema;
const bill = new Schema({
    idUser: defaultModel.stringR,
    name: defaultModel.stringR,
    address: defaultModel.stringR,
    phone: defaultModel.phoneNumber,
    detailBill: [{
        _id: false,
        idProduct: {
            type: Schema.ObjectId,
            ref: "Product"
        },
        price: defaultModel.numberR,
        amount: defaultModel.numberR
    }],
    total: defaultModel.number,
    note: defaultModel.string,
    status: defaultModel.number,
},
    {
        timestamps: true
    });
module.exports = mongoose.model("Bill", bill);