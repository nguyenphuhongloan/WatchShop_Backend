const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const subPosition = new Schema({
    idPosition: defaultModel.stringR,
    idPermission: defaultModel.stringR,
});
module.exports = mongoose.model("SubPosition", subPosition);