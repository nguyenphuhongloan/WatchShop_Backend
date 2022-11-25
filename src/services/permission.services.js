const USER = require("../models/user.model");
const POSITION = require("../models/position.model");
const mongoose = require("mongoose");
const checkPermission = (namePermission) => {
    return async (req, res, next) => {
        try {
            const userID = req.value.header.tokenDecoded.data;
            const user = await USER.findById({ _id: userID }, { position: 1 });
            if(!user){
                res.status(200).json({
                    success: false,
                    message: "User not found"
                });
            };
            const userPosition = user.position;
            const hasPermission = await POSITION.find({   
                _id: userPosition,
                "permission": {
                    $elemMatch: {
                        name: namePermission
                    }
                }
            }).countDocuments();
            if(hasPermission==1)
                next();
            else return res.status(200).json({
                success: false,
                message: "Not enough permissions"
            });
        } catch (err) {
            res.status(200).json({
                success: false,
                message: 'An error occurred while checking permissions'
            });
        }
    }

}
module.exports = {
    checkPermission
}