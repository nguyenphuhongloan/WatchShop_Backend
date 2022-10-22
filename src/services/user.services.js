const USER = require("../models/user.model");
const getUser = async (query) =>{
    
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
