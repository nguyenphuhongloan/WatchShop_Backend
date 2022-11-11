const BILL = require("../models/bill.model");
const PRODUCT = require("../models/product.model");
const {defaultBillStatus} = require("../config/defaultModel"); 
const getAllBills = async () => {
    try {
        const bill = await BILL.find();
        if(!bill){
            return {
                success: false,
                message: "Get all bill failed",
            }
        }
        return {
            success: true,
            message: "Get all bill successfully",
            data: bill
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occured",
        }
    }
}
const createBill = async (body) => {
    try {
        const idProduct = body.detailBill.map((detail) => detail.idProduct);
        const productList = await PRODUCT.find({
            _id: { $in: idProduct }
        });
        var total = 0;
        for (const detail of body.detailBill) {
            const product = productList.find((product) => product._id.toHexString() == detail.idProduct);
            if(!product) {
                return {
                    success: false,
                    message: "Product not found"
                }
            }
            if(detail.amount > product.amount){
                return { 
                    success: false, 
                    message: "Amount in cart greater than product in warehouse"
                }
            }
            const price = product.price;
            detail['price'] = price;
            total += product.price * detail.amount;
        };
        const listProductUpdate = body.detailBill.map((detail) => {
            return {
                updateOne: {
                    filter: {
                        _id: detail.idProduct,
                    },
                    update: {
                            $inc: {
                                amount: -detail.amount
                            }
                        }
                }
            }
        });
        const product = PRODUCT.bulkWrite(listProductUpdate);
        if(!product){
            return {
                success: false,
                message: "Create bill failed"
            }
        }
        body.total = total;
        const bill = await BILL.create(body);
        if(!bill){
            return { 
                success: false, 
                message: "Create bill failed"
            }
        }
        return {
            success: true,
            message: "Create bill successfully",
            data: bill
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occured",
        }
    }
};

const confirmBill = async (body) => {
    try{
        const getBill = await BILL.findById(body.id);
        if(getBill.status != defaultBillStatus.waitingConfirm){
            return {
                success: false,
                message: "Can't change status bill when status diffirent waitting"
            }
        }
        const bill = await BILL.findByIdAndUpdate({ _id: body.id }, {status: defaultBillStatus.confirmed}, { new: true });
        if(!bill){
            return {
                success: false,
                message: "Change status bill failed"
            }
        }
        return {
            success: true,
            message: "Change status bill successfully",
            data: bill
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occured",
        }
    }
};
const tranferringBill = async (body) => {
    try {
        const getBill = await BILL.findById(body.id);
        if (getBill.status != defaultBillStatus.confirmed) {
            return {
                success: false,
                message: "Can't change status bill when status diffirent confirmed"
            }
        }
        const bill = await BILL.findByIdAndUpdate({ _id: body.id }, { status: defaultBillStatus.transferring }, { new: true });
        if (!bill) {
            return {
                success: false,
                message: "Change status bill failed"
            }
        }
        return {
            success: true,
            message: "Change status bill successfully",
            data: bill
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occured",
        }
    }
};
const cancelBill = async (body) => {
    try {
        const getBill = await BILL.findById(body.id);
        if (getBill.status != defaultBillStatus.waitingConfirm) {
            return {
                success: false,
                message: "Can't change status bill when status diffirent waitting"
            }
        }
        const idUser = body.idUser || {$exists: true};
        const bill = await BILL.findOneAndUpdate({ _id: body.id, idUser: idUser }, { status: defaultBillStatus.cancelled }, { new: true });
        if (!bill) {
            return {
                success: false,
                message: "Change status bill failed"
            }
        };
        const listProductUpdate = bill.detailBill.map((detail) => {
            return {
                updateOne: {
                    filter: {
                        _id: detail._id,
                    },
                    update: {
                        $inc: {
                            amount: detail.amount
                        }
                    }
                }
            }
        });
        const product = PRODUCT.bulkWrite(listProductUpdate);
        if(!product){
            return{
                success: false,
                message: "Cancel bill failed"
            }
        }
        return {
            success: true,
            message: "Change status bill successfully",
            data: bill
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occured",
        }
    }
};
const getBillByUserId = async (id) => {
    try {
        const bill = await BILL.find({
            idUser: id
        });
        if(!bill){
            return {
                success: false,
                message: "Get bill failed"
            };
        };
        return {
            success: true,
            message: "Get bill successfully",
            data: bill
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occured"
        }
    }
}

const getDetailBill = async (id, idUser) => {
    try{
        const bill = await BILL.findById(id);
        if(!bill) {
            return {
                success: false,
                message: "Get detail bill failed",
            };
        };
        if(idUser)
            if(bill.idUser != idUser)
                return {
                    success: false,
                    message: "Get detail bill failed"
                };
        return {
            success: true,
            message: "Get detail bill successfully",
            data: bill
        }
    } catch (err) {
        return {
            success: false,
            message: "An error occurred",
        };
    };
};
module.exports = {
    getAllBills,
    createBill,
    confirmBill,
    tranferringBill,
    cancelBill,
    getBillByUserId,
    getDetailBill
}