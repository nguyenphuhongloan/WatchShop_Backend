const PRODUCT = require("../models/product.model");
const jwt = require("../services/jwt.services");
const upload = require("../services/upload.services");
const { PRODUCTS_FOLDER } = require("../config/index");
const CATEGORY = require("../models/category.model");
const categoryService = require("../services/category.services");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const addSubCategoryProductModel = async (products) => {
    try{
        const category = await categoryService.getAllSubCategories();
        products.map(o => o.subCategory = []);
        products.forEach((item, index) => {
            for (let i = 0; i < item.idSubCategories.length; i++) {
                const subCategory = category.data.find(c => c._id.toHexString() === item.idSubCategories[i].id);
                item.subCategory.push(subCategory)
            }
        });
        return products;
    } catch(err){

    }
}
const getAllProducts = async (query) => {
    try {
        var products;
        const page = query["page"];
        const numberProductsOfPage = query["numberProductsOfPage"];
        const status = query["status"] ? query["status"] : { $exists: true };
        const totalProducts = await PRODUCT.find().count({
            status: status
        });
        
        products = await PRODUCT.aggregate([
            { $addFields: { idTrademark: { $toObjectId: "$idTrademark" } } },
            {
                $lookup: {
                    localField: "idTrademark",
                    from: "trademarks",
                    foreignField: "_id",
                    as: "trademark"
                }
            },
        ]).sort({ [query.sort]: query.type }).skip(numberProductsOfPage * (page - 1)).limit(numberProductsOfPage);
        products = await addSubCategoryProductModel(products);
        return {
            success: true,
            message: "Get products successfully",
            data: {
                totalProducts: totalProducts,
                products: products,
                paging: {
                    page: page,
                    numberProductsOfPage: numberProductsOfPage,
                    totalPage: Math.ceil(totalProducts / numberProductsOfPage),
                },
            },
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        }
    }
};
const getProductById = async (id) => {
    try {
        const product = await PRODUCT.aggregate([
            { $addFields: { idTrademark: { $toObjectId: "$idTrademark" } } },
            {
                $lookup: {
                    localField: "idTrademark",
                    from: "trademarks",
                    foreignField: "_id",
                    as: "trademark"
                }
            }, {
                $match: {
                    _id:  ObjectId(id)
                }
            }
        ])
        if (!product) {
            return {
                success: false,
                message: "Product not found",
            }
        }
        const data = await addSubCategoryProductModel(product);
        return {
            success: true,
            message: "Get product successfully",
            data: data
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
const getProductByIdTrademark = async (id) => {
    try {
        const product = await PRODUCT.aggregate([
            {
                $match: {
                    idTrademark: id
                }
            },
            { $addFields: { idTrademark: { $toObjectId: "$idTrademark" } } },
            {
                $lookup: {
                    localField: "idTrademark",
                    from: "trademarks",
                    foreignField: "_id",
                    as: "trademark"
                }
            }, 
        ])
        if (!product) {
            return {
                success: false,
                message: "Product not found",
            }
        }
        const data = await addSubCategoryProductModel(product);
        return {
            success: true,
            message: "Get product successfully",
            data: data
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
const createProduct = async (body) => {
    try {
        if (body.file) {
            const file = await upload.uploadFile(body.file, PRODUCTS_FOLDER);
            if (!file.success) {
                return file;
            };
            body.image = file.data.url;
        }
        const product = await PRODUCT.create(body);
        if (!product) {
            return {
                success: false,
                message: "Create product failed",
                data: product,
            }
        }
        return {
            success: true,
            message: "Create product successfully",
            data: product
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
};
const editProduct = async (body) => {
    try {
        if (body.file) {
            const file = await upload.uploadFile(body.file, PRODUCTS_FOLDER);
            if (!file.success) {
                return file;
            };
            body.image = file.data.url;
        }
        const product = await PRODUCT.findByIdAndUpdate({ _id: body.id }, body, { new: true });
        if (!product) {
            return {
                success: false,
                message: "Update product failed",
                data: product,
            }
        }
        return {
            success: true,
            message: "Update product successfully",
            data: product
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
};
const deleteProduct = async (body) => {
    try {
        const product = await PRODUCT.findByIdAndDelete({ _id: body.id });
        if (!product) {
            return {
                success: false,
                message: "Delete product failed",
                data: product,
            }
        }
        return {
            success: true,
            message: "Delete product successfully",
            data: product
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred"
        }
    }
}
module.exports = {
    getAllProducts,
    getProductById,
    getProductByIdTrademark,
    createProduct,
    editProduct,
    deleteProduct,
}