const TRADEMARK = require('../models/trademark.model');
const getAllTrademarks =async () => {
    try{
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
}
module.exports = {
    getAllTrademarks
}