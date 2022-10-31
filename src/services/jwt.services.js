const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET} = require("../config/index");
const createToken = (data) => {
    return jwt.sign({
        iss: "WatchShop",
        data: data,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 30),
    }, 
        ACCESS_TOKEN_SECRET)
};
const verify = (req, res, next) => {
    const header = req.headers.authorization;
    if(!header){
        return res.status(403).json({
            tokenVerificationData: {
                access: false,
                message: "No token provided",
            }
        });
    }
    const token = header.split(" ")[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, tokenDecoded) => {
        if(err){
            return res.status(403).json({
                tokenVerificationData: {
                    access: false,
                    message: "Token verify error",
                }
            });
        }
        if(!req.value)
            req.value = {};
        if(!req.value["header"])
            req.value["header"] = {};
        Object.assign(req.value.header, { 
            tokenDecoded: tokenDecoded,
            token: token });
        next();
    });
}
module.exports = {
    createToken,
    verify,
};