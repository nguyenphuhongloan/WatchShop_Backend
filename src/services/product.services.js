const number = require("@hapi/joi/lib/types/number");
const PRODUCT = require("../models/product.model");
const getProduct = async (query) => {
    try {
        var products;
        const page = !query["page"] ? 1 : query["page"];
        const numberProductofPage = 12;
        const search = !query["search"] ? "" : query["search"];
        const idTrademark = !query["idtrademark"] ? { $exists: true } : query["idtrademark"];
        const category = query["category"]? { $exists: true } : query["category"];
        const price = !query["low"] || !query["high"] ? { $exists: true } : {
            $gte: query["low"],
            $lte: query["high"],
        };
        console.log(idTrademark)
        const status = !query["status"] ? 0 : status;
        console.log(query);
        if(search!="")
            products = await PRODUCT.find({
                $text: {$search: search},
                idTrademark: idTrademark,
                price: price,
                status: 0,
            }).skip(numberProductofPage*(page-1)).limit(numberProductofPage);
        else 
            products = await PRODUCT.find({
                idTrademark: idTrademark,
                price: price,
                status: 0,
            }).skip(numberProductofPage * (page - 1)).limit(numberProductofPage);
        const sort = !query["sort"] ? 0 : Number(query["sort"]);
        if(sort ==1)
            products.sort((a, b) => a.price > b.price ? 1 : -1);
        else if(sort == 2)
            products.sort((a, b) => a.price < b.price ? 1 : -1);
        else if(sort == 3)
            products.sort((a, b) => a.amount > b.amount ? 1 : -1);
        else if(sort == 4)
            products.sort((a, b) => a.amount > b.amount ? 1 : -1);
        return {
            success: true,
            message: "Get product successfully",
            data: products,
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
        console.log(err)
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
    getProduct,
    createProduct,
    editProduct,
    deleteProduct
}