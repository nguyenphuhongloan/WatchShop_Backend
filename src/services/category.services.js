const CATEGORY = require("../models/category.model");
const jwt = require("../services/jwt.services");
const getAllCategories = async () => {
    try {
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
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
};
const createCategory = async (body) => {
    try {
        const category = await CATEGORY.create(body);
        if (!category) {
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
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
};
const editCategory = async (body) => {
    try {
        const category = await CATEGORY.findByIdAndUpdate({ _id: body.id }, body, { new: true });
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
        return {
            success: false,
            message: "An error occurred",
        }
    }
};
const deleteCategory = async (body) => {
    try {
        const category = await CATEGORY.findByIdAndDelete({ _id: body.id });
        if (!category) {
            return {
                success: false,
                message: "Delete category failed"
            };
        };
        return {
            success: true,
            message: "Delete category successfully",
            data: category,
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
}
const createSubCategory = async (body) => {
    try {
        const subCategory = await CATEGORY.findByIdAndUpdate(
            body.id,
            {
                $push: {
                    subCategory: {
                        name: body.subCategory.name
                    }
                }
            }, { new: true })
        if (!subCategory) {
            return {
                success: false,
                message: "Create subcategory failed"
            };
        };
        return {
            success: true,
            message: "Create subcategory successfully",
            data: subCategory,
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
};
const editSubCategory = async (body) => {
    try {
        const subCategory = await CATEGORY.findOneAndUpdate(
            {"subCategory._id": body.id},
            {
                $set: {
                    "subCategory.$.name": body.subCategory.name
                }
            }, { new: true })
        
        if (!subCategory) {
            return {
                success: false,
                message: "Edit subcategory failed"
            };
        };
        return {
            success: true,
            message: "Edit subcategory successfully",
            data: subCategory,
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
}
const deleteSubCategory = async (body) => {
    try {
        const subCategory = await CATEGORY.findOneAndUpdate({
            "subCategory._id": body.id
        },
            {
                $pull: {
                    subCategory: {
                        _id: body.id
                    }
                }
            }, { new: true });
        if (!subCategory) {
            return {
                success: false,
                message: "Delete subcategory failed"
            };
        };
        return {
            success: true,
            message: "Delete subcategory successfully",
            data: subCategory,
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
}
module.exports = {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    createSubCategory,
    editSubCategory,
    deleteSubCategory
}