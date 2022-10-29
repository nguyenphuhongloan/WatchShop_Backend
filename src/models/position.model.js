const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const position = new Schema({
    name: defaultModel.stringU,
    idPermission: [
        {
            id: defaultModel.id
        }
    ]
});
module.exports = mongoose.model("Position", position);