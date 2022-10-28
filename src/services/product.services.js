const PRODUCT = require("../models/product.model");
const jwt = require("../services/jwt.services")
const upload = require("../services/upload.services")
const {PRODUCTS_FOLDER} = require("../config/index")
const getAllProducts = async (query) => {
    try {
        var products;
        const page = query["page"];
        const numberProductsOfPage = query["numberProductsOfPage"];
        const status = query["status"] ? query["status"] : {$exists: true};
        const totalProducts = await PRODUCT.find().count({
            status: status
        });
       if(numberProductsOfPage != "all")
            products = await PRODUCT.find({
                status: status,
            }).sort({[query.sort]: query.type}).skip(numberProductsOfPage * (page - 1)).limit(numberProductsOfPage);
        return {
            success: true,
            message: "Get product successfully",
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
const createProduct = async (body) => {
    try {
        const file = await upload.uploadFile(body.file, PRODUCTS_FOLDER);
        if(!file.success){
            return file;
        }
        body.image = file.data.url;
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
    createProduct,
    editProduct,
    deleteProduct
}