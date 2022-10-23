const CATEGORY = require("../models/category.model");
const jwt = require("../services/jwt.services");
const getAllCategories = async () => {
    try{
        const category = await CATEGORY.find();
        if (!category) {
            return {
                success: false,
                message: "Get category failed",
            };
        }
        return {
            success: true,
            message: "Get category successfully",
            data: category
        }
    } catch(err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
};
const createCategory = async (body) => {
    try{
        const category = await CATEGORY.create(body);
        if(!category){
            return {
                success: false,
                message: "Create category failed"
            };
        };
        return {
            success: true,
            message: "Create category successfully",
            data: category,
        }
    } catch(err) {
        console.error(err)
        return {
            success: false,
            message: "An error occurred",
        }
    }
};
const editCategory = async (body) => {
    try {
        const category = await CATEGORY.findByIdAndUpdate({_id: body.id}, body, {new: true});
        if (!category) {
            return {
                success: false,
                message: "Edit category failed"
            };
        };
        return {
            success: true,
            message: "Edit category successfully",
            data: category,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            message: "An error occurred",
        }
    }
}
module.exports = {
    getAllCategories,
    createCategory,
    editCategory
}