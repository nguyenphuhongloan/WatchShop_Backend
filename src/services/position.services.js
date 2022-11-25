const POSITION = require("../models/position.model");
const getAllPositions = async () => {
    try{
        const position = await POSITION.find();
        if(!position){
            return {
                success: false,
                message: "Get position failed"
            }
        }
        return {
            success: true,
            message: "Get position successfully",
            data: position
        }
    } catch(err){
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
const getPositionById = async (id) => {
    try {
        const position = await POSITION.findById(id);
        if (!position) {
            return {
                success: false,
                message: "Get position failed"
            }
        }
        return {
            success: true,
            message: "Get position successfully",
            data: position
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
const createPosition = async (body) => {
    try {
        const position = await POSITION.create(body);
        if (!position) {
            return {
                success: false,
                message: "Create position failed"
            }
        }
        return {
            success: true,
            message: "Create position successfully",
            data: position
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
const editPosition = async (body) => {
    try {
        const position = await POSITION.findByIdAndUpdate({ _id: body.id }, body, { new: true});
        if (!position) {
            return {
                success: false,
                message: "Edit position failed"
            }
        }
        return {
            success: true,
            message: "Edit position successfully",
            data: position
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
const deletePosition = async (body) => {
    try {
        const position = await POSITION.findByIdAndDelete({ _id: body.id});
        if (!position) {
            return {
                success: false,
                message: "Delete position failed"
            }
        }
        return {
            success: true,
            message: "Delete position successfully",
            data: position
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
module.exports = {
    getAllPositions,
    getPositionById,
    createPosition,
    editPosition,
    deletePosition
}