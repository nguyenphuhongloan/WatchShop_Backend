const sendSuccess = (res, data, status=200, message="success") => {
    return res.status(status).json({
        success: status == 200 ? true : false,
        message: message,
        data: data
    })
};
const sendError = (res, message) => {
    return res.status(500).json({
        success: false,
        message: message || "internal server error",
    })
};
module.exports = {
    sendSuccess,
    sendError
};