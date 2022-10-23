const mongoose = require("mongoose");
const { defaultModel } = require("../config/defaultModel");
const Schema = mongoose.Schema;
const category = new Schema({
    name: defaultModel.stringU,
    subCategory:
        [{
            _id: {
                type: mongoose.Types.ObjectId,
                default: () => { return new mongoose.Types.ObjectId() },
                index: true,
            },
            name: defaultModel.stringU,
        }]
});
module.exports = mongoose.model("Category", category);