const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET} = require("../config/index");
const createToken = (data) => {
    return jwt.sign({
        iss: "WatchShop",
        data: data,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getTime() + 30),
        }, 
        ACCESS_TOKEN_SECRET)
};
module.exports = {createToken};