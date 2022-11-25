const USER = require("../models/user.model");
const POSITION = require("../models/position.model");
const { defaultPermission } = require("../config/defaultModel");
const jwt = require("../services/jwt.services");
const bcrypt = require("bcryptjs");
const getAllCustomers = async (query) => {
    try {
        const customer = await POSITION.findOne({ name: "Khách hàng" });
        const customerId = customer._id;
        const user = await USER.find({ position: customerId });
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
};
const getUserById = async (id, role) => {
    try {
        const user = await USER.findById(id);
        if (!user) {
            return {
                success: false,
                message: "User not found",
            }
        }
        const customer = await POSITION.findOne({ name: "Khách hàng" });
        const customerId = customer._id;

        if (role == "Customer") {
    
            if (user.position.toHexString() != customerId.toHexString())
                return {
                    success: false,
                    message: "User not found",
                }
        } else {
            if (user.position.toHexString() == customerId.toHexString())
                return {
                    success: false,
                    message: "User not found",
                }
        }
        return {
            success: true,
            message: "Get user successfully",
            data: user
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        };
    }
};
const createUser = async (body) => {
    try {
        if (!body.position) {
                const customer = await POSITION.findOne({ name: "Khách hàng" });
                body.position = customer._id;
            }
        const user = await USER.create(body);
        if(!user){
            return {
                success: false,
                message: "Create user failed",
            }
        }
        return {
            success: true,
            message: "Create user successfully",
            data: user
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
}
const editStaff = async (body) => {
    try {
        if(body.position){
            const position = await POSITION.findById(body.position);
            const customer = await POSITION.findOne({ name: "Khách hàng" });
            const customerId = customer._id;
            if (body.position == customerId.toHexString() || position == null) {
                return {
                    success: false,
                    message: "Position invalid"
                }
            }
        }
        if(body.password){
            const hashPassword = await bcrypt.hash(body.password, 8);
            body["password"] = hashPassword;
        }
        const user = await USER.findByIdAndUpdate(body.id, body, {new: true});
        if(!user) {
            return {
                success: false,
                message: "Edit staff failed"
            }
        }
        return {
            success: true,
            message: "Edit staff successfully",
            data: user
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        };
    }
};
const editMyProfile = async (body) => {
    try{
        if (body.password) {
            const hashPassword = await bcrypt.hash(body.password, 8);
            body["password"] = hashPassword;
        }
        const user = await USER.findByIdAndUpdate(body.id, body, { new: true });
        if (!user) {
            return {
                success: false,
                message: "Edit staff failed"
            }
        }
        return {
            success: true,
            message: "Edit staff successfully",
            data: user
        }
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
    getMyProfile,
    getUserById,
    createUser,
    editStaff,
    editMyProfile
}
