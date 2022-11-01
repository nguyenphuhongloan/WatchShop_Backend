const USER = require("../models/user.model");
const POSITION = require("../models/position.model");
const {defaultPermission} = require("../config/defaultModel")
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
        const user = await USER.find({ position: { $ne: customerId } });
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
}
const createUser = async (body) =>{
    try{
        const user = await USER.create(body);
        if(!user){
            return {
                success: false,
                message: "Create user failed",
                data: user,
            };
        };
        return {
            success: true,
            message: "Create user successfully",
            data: user
        };
    } catch(err){
        return {
            success: false,
            message: "An error occurred",
        };
    }
};
module.exports = {
    getAllCustomers,
    getAllStaffs
}
