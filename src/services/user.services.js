const USER = require("../models/user.model");
const POSITION = require("../models/position.model");
const {defaultPermission} = require("../config/defaultModel");
const jwt = require("../services/jwt.services");
const bcrypt = require("bcryptjs");
const getAllCustomers = async (query) =>{
    try {
        const customer = await POSITION.findOne({name: "Khách hàng"});
        const customerId = customer._id;
        const user = await USER.find({position: customerId});
        if(!user){
            return {
                success: false,
                message: "Get users failed",
            }
        }
        return {
            success: true,
            message: "Get users successfully",
            data: {
                totalUsers: user.length,
                users: user
            }
        }
    } catch (err) {

    }
};
const getAllStaffs = async (query) => {
    try {
        const customer = await POSITION.findOne({ name: "Khách hàng" });
        const customerId = customer._id;
        const user = await USER.find({ position: { $ne: customerId } }).populate("position");
        if (!user) {
            return {
                success: false,
                message: "Get users failed",
            }
        }
        return {
            success: true,
            message: "Get users successfully",
            data: {
                totalUsers: user.length,
                users: user
            }
        }
    } catch (err) {

    }
};
const getMyProfile = async (id) => {
    try {
        const user = await USER.findById(id);
        if (!user) {
            return {
                success: false,
                message: "Get profile failed",
                data: user,
            };
        };
        return {
            success: true,
            message: "Get profile successfully",
            data: user
        };
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        };
    }
}
module.exports = {
    getAllCustomers,
    getAllStaffs,
    getMyProfile
}
