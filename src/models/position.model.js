const mongoose = require("mongoose");
const {defaultModel} = require("../config/defaultModel");
const Schema = mongoose.Schema;
const position = new Schema({
    name: defaultModel.stringU,
    permission: [
        {
            _id: false,
            name: defaultModel.stringU,
        }
    ]
});
module.exports = mongoose.model("Position", position);