const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET} = require("../config/index");
const createToken = (data) => {
    return jwt.sign({
        iss: "WatchShop",
        data: data,
        iat: new Date().getTime() / 1000,
        exp: new Date().getTime() / 1000 + 60 * 60 * 24 * 30,
    }, 
        ACCESS_TOKEN_SECRET)
};
const createTokenOTP = (data) => {
    return jwt.sign({
        iss: "WatchShop",
        data: data,
        iat: new Date().getTime() / 1000,
        exp: new Date().getTime() / 1000 + 60 * 15
    },
        ACCESS_TOKEN_SECRET)
}
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
};
const verifyOTP = (req, res, next) => {
    const token = req.params.token;
    if (!token) {
        return res.status(403).json({
            tokenVerificationData: {
                access: false,
                message: "No token provided",
            }
        });
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, tokenDecoded) => {
        if (err) {
            return res.status(403).json({
                tokenVerificationData: {
                    access: false,
                    message: "Token verify error",
                }
            });
        }
        if (!req.value)
            req.value = {};
        if (!req.value["body"])
            req.value["body"] = {};
        Object.assign(req.value.body, {
            tokenDecoded: tokenDecoded,
            token: token
        });
        

        next();
    });
};
const decodeToken = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET, (err, tokenDecoded) => {
        if (err) {
            return {
                success: false,
                message: "Token verify error"
            }
        }
        return {
            success: true,
            data: {
                tokenDecoded: tokenDecoded,
                token: token
            }
        }
})}
module.exports = {
    createToken,
    verify,
    createTokenOTP,
    verifyOTP,
    decodeToken,
};