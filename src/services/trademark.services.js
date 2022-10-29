const TRADEMARK = require('../models/trademark.model');
const getAllTrademarks = async () => {
    try {
        const trademark = await TRADEMARK.find();
        return {
            success: true,
            message: "Get trademark successfully",
            data: trademark
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        };
    }
};
const createTrademark = async (body) => {
    try {
        const trademark = await TRADEMARK.create(body);
        if (!trademark) {
            return {
                success: false,
                message: "Create trademark failed"
            }
        }
        return {
            success: true,
            message: "Create trademark successfully",
            data: trademark
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        };
    }
};
const editTrademark = async (body) => {
    try {
        const trademark = await TRADEMARK.findOneAndUpdate({ _id: body.id }, body, {new: true});
        if (!trademark) {
            return {
                success: false,
                message: "Edit trademark failed" 
            }
        }
        return {
            success: true,
            message: "Edit trademark successfully",
            data: trademark
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        };
    }
};
const deleteTrademark = async (body) => {
    try {
        const trademark = await TRADEMARK.findByIdAndDelete({ _id: body.id});
        if (!trademark) {
            return {
                success: false,
                message: "Delete trademark failed"
            }
        }
        return {
            success: true,
            message: "Delete trademark successfully",
            data: trademark
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        };
    }
}
module.exports = {
    getAllTrademarks,
    createTrademark,
    editTrademark,
    deleteTrademark,
}