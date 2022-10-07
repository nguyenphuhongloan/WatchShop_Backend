const mongoose = require('mongoose');
const {MONGO_URI} = require('./index');
async function connect() {
    try {
        await mongoose.connect(MONGO_URI, {
        });
        console.log("Database connnected");
    } catch (error){
        console.log("Couldn't connect to" + MONGO_URI+ "because" + error);
    }
}
module.exports = {connect};