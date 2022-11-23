const PRODUCT = require("../models/product.model");
class Cart {
    constructor(oldCart) {
        if (oldCart === undefined) {
            oldCart = {};
            oldCart.items = [];
            oldCart.total = 0;
        }
        this.items = oldCart.items;
        this.total = oldCart.total;
        this.view = async () => {
            const data = [];
            for (const item of this.items) {
                const product = await PRODUCT.findById(item.idProduct);
                console.log(item)
                const newItem = Object.assign({}, item, { product: product })
                data.push(newItem);
            }
            console.log(data)
            return {
                items: data,
                total: this.total
            }
           
        }
        this.add = async (data) => {
            data.amount = Number(data.amount);
            if (data.amount <= 0)
                return {
                    success: false,
                    message: "Amount must be greater than zero"
                };
            const product = await PRODUCT.findById(data.idProduct);
            if (product.amount < data.amount) {
                return {
                    success: false,
                    message: "Amount in cart greater than product in warehouse"
                }
            }
            const index = this.items.map((item) => item.idProduct).indexOf(data.idProduct);
            if (index != -1) {
                var productInCart = this.items[index];
                const tmpAmount = productInCart.amount + data.amount;
                if (tmpAmount > product.amount)
                    return {
                        success: false,
                        message: "Amount in cart greater than product in warehouse"
                    }
                productInCart.amount = tmpAmount;
            }
            else
                this.items.push(data);
                this.total = this.items.length;
            return {
                success: true,
                message: "Add to cart successfully"
            };
        };
        this.subtract = (data) => {
            data.amount = Number(data.amount);
            if (data.amount <= 0)
                return {
                    success: false,
                    message: "Amount must be greater than zero"
                };
            const index = this.items.map((item) => item.idProduct).indexOf(data.idProduct);
            if (index == -1) {
                return {
                    success: false,
                    message: "Couldn't find product in cart",
                }
            }
            const productInCart = this.items[index];
            if (productInCart.amount < data.amount)
                return {
                    success: false,
                    message: "Product subtract amount greater than amount in cart",
                };
            if (productInCart.amount == data.amount) {
                return this.delete(productInCart);
            }
            productInCart.amount -= data.amount;
            this.total = this.items.length;
            return {
                success: true,
                message: "Subtract from cart successfully"
            };
        };

        this.delete = (data) => {
            const index = this.items.map((item) => item.idProduct).indexOf(data.idProduct);
            if(index == -1) {
                return {
                    success: false,
                    message: "Couldn't find product"
                };
            };
            this.items = this.items.filter((value) => value.idProduct != data.idProduct);
            this.total = this.items.length;
            return {
                success: true,
                message: "Delete from cart successfully"
            }
        };
        this.deleteAllCart = () => {
            this.items = [];
            this.total = 0;
            return {
                success: true,
                message: "Detele all cart successfully"
            }
        };
    }
}

module.exports = Cart;
