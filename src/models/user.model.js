const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const user = new Schema({
    name: defaultModel.stringR,
    email: defaultModel.email,
    password: defaultModel.password,
    avatar: defaultModel.string,
    address: defaultModel.stringR,
    position: defaultModel.stringR,
});
module.exports = mongoose.model("User", user);