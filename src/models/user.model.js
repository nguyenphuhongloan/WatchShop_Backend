const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const user = new Schema({
    name: defaultModel.stringR,
    email: defaultModel.email,
    password: defaultModel.password,
    avatar: defaultModel.string,
    address: defaultModel.stringR,
    position: {
        type: Schema.ObjectId,
        ref: "Position"
    },
    status: defaultModel.number,
});
module.exports = mongoose.model("User", user);