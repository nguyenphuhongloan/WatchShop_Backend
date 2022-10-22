const USER = require("../models/user.model");
const jwt = require("../services/jwt.services");
const bcrypt = require("bcryptjs");

const register = async (body) => {
    try{
        const email = body["email"];
        const emailExists = await USER.findOne({email: email});
        if (emailExists) {
            return {
                success: false,
                message: "Email already exists",
            }
        }
        const hashPassword = await bcrypt.hash(body.password, 8);
        body["password"] = hashPassword;
        body["position"] = !body["position"] ? 0 : body["position"];
        const user = await USER.create(body);
        if (!user) {
            return {
                success: false,
                message: "Create user failed",
            };
        };
        const token = jwt.createToken(user._id);
        return {
            success: true,
            message: "User created successfully",
            data: {
                user: user,
                token: token,
            }
        };
    } catch(err){
        return {
            success: false,
            message: "An error occurred",
        }
    };
};
const login = async (body) => {
    try{
        const email = body.email;
        const user  = await USER.findOne({ email: email });
        if(!user) {
            return {
                success: false,
                message: "Email not registered",
            };
        };
        const isPasswordMatched = await bcrypt.compare(body.password, user.password);
        if (!isPasswordMatched) {
            return {
                success: false,
                message: "Wrong password",
            };
        }
        const token = await jwt.createToken(user._id);
        return {
            success: true,
            message: "Login success",
            data: {
                user :user,
                token: token,
            }
        }
    } catch(err){
        return {
            success: false,
            message: "An error occurred",
        }
    }
};
module.exports = {
    register,
    login,
};
