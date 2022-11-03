const Cart = require("../models/cart.model");
const controller = require("../controllers/index");
const viewCart = (req, res, next) => {
    try {
        const cart = req.session.cart;
        if (!cart) {
            return controller.sendSuccess(res, {}, 200, "Cart empty");
        }
        controller.sendSuccess(res, cart, 200, "Get cart successfully");
    } catch (err) {
        return controller.sendError(res);
    }
}
const addToCart = async (req, res, next) => {
    try {
        const cart = new Cart(req.session.cart);
        const resCart = await cart.add(req.body);
        if(!resCart.success){
            return controller.sendSuccess(res, cart, 200, resCart.message);
        };
        req.session.cart = cart;
        return controller.sendSuccess(res, cart, 200, resCart.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
const subtractFromCart = (req, res, next) => {
    try {
        const cart = new Cart(req.session.cart);
        const resCart = cart.subtract(req.body);
        if (!resCart.success) {
            return controller.sendSuccess(res, cart, 200, resCart.message);
        };
        req.session.cart = cart;
        return controller.sendSuccess(res, cart, 200, resCart.message);
        
    } catch (err) {
        return controller.sendError(res);
    }
   
}
const deleteFromCart = (req, res, next) => {
    try {
        const cart = new Cart(req.session.cart);
        const resCart = cart.delete(req.body);
        req.session.cart = cart;
        return controller.sendSuccess(res, cart, 200, resCart.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
const deleteAllCart = (req, res, next) => {
    try {
        const cart = new Cart(req.session.cart);
        const resCart = cart.deleteAllCart();
        req.session.cart = cart;
        return controller.sendSuccess(res, cart, 200, resCart.message);
    } catch (err) {
        return controller.sendError(res);
    }
}
module.exports = {
    viewCart,
    addToCart,
    subtractFromCart,
    deleteFromCart,
    deleteAllCart
}