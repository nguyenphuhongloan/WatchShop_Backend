const USER = require("../models/user.model");
const POSITION = require("../models/position.model");
const jwt = require("../services/jwt.services");
const bcrypt = require("bcryptjs");
const emailService = require("../services/email.services");
const {defaultMailOptionsValues} = require("../config/email");
const base = require("@hapi/joi/lib/base");
const {CLIENT_URL} = require("../config/index");
const register = async (body) => {
    try{
        const email = body.email;
        const emailExists = await USER.findOne({ email: email });
        if (emailExists) {
            return {
                success: false,
                message: "Email already exists",
            }
        }
        return sendEmailToken(body, defaultMailOptionsValues.Register);
    } catch(err){
        return {
            success: false,
            message: "An error occured"
        }
    }
}
const saveUser = async (body) => {
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
        if(!body["position"]){
            const positionCustomer = await POSITION.findOne({
                name: "Khách hàng"
            });
            body["position"] = positionCustomer._id;
        }
        const user = await USER.create(body);
        if (!user) {
            return {
                success: false,
                message: "Create user failed",
            };
        };
        delete user._doc['password'];
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

const sendEmailToken = (body,option) => {
    try{
        const token = jwt.createTokenOTP(body);
        var baseUrl = ""
        switch (option) {
            case defaultMailOptionsValues.Register:
                baseUrl = "/verifyRegister/"
                break;
            case defaultMailOptionsValues.ResetPassword:
                baseUrl = "/verifyResetPassword/"
                break;
            default:
                break;
        }
        const link = CLIENT_URL + baseUrl + token;
        const sendEmail = emailService.sendEmail(body.email, link, option);
        return {
            success: true,
            message: "Send email successfully",
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
}
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
        };
        delete user._doc["password"];
        const token = jwt.createToken(user._id);
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
const changePassword = async (body, id) => {
    try {
        const user = await USER.findOne({email: body.email});
        if(!user){
            return {
                success: false,
                message: "User not found",
            }
        }
        if(user._id != id)
            return {
                success: false,
                message: "Token invalid"
            }
        const isPasswordMatched = await bcrypt.compare(body.password, user.password);
        if (!isPasswordMatched) {
            return {
                success: false,
                message: "Wrong password",
            };
        };
        const hashPassword = await bcrypt.hash(body.newPassword, 8);
        const newPassword = await USER.findByIdAndUpdate(user._id, {password: hashPassword}, {new: true});
        if(!newPassword){
            return {
                success: false,
                message: "Change password failed",
            }
        }
        return {
            success: true,
            message: "Change password successfully",
            data: user
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
};
const requireResetPassword = async (email) => {
    try{
        const user = await USER.findOne({ email: email });
        if (!user) {
            return {
                success: false,
                message: "User not found",
            }
        }
        const body = {
            email: email,
        }
        return sendEmailToken(body,  defaultMailOptionsValues.ResetPassword);
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
}
const resetPassword = async (body) => {
    try{
        const user = await USER.findOne({ email: body.email });
        if (!user) {
            return {
                success: false,
                message: "User not found",
            }
        }
        const hashPassword = await bcrypt.hash(body.password, 8);
        const newPassword = await USER.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true });
        if (!newPassword) {
            return {
                success: false,
                message: "Reset password fail",
            }
        }
        return {
            success: true,
            message: "Reset password successfully",
            data: user
        }
    } catch {
        return {
            success: false,
            message: "An error occurred",
        }
    }
}
module.exports = {
    saveUser,
    login,
    changePassword,
    sendEmailToken,
    register,
    requireResetPassword,
    resetPassword
};
