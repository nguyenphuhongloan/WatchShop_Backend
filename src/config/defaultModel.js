const mongoose = require("mongoose");
const defaultModel = {
    date: { type: Date },
    string: { type: String, default: "" },
    stringR: { type: String, required: true },
    stringU: { type: String, required: true, unique: true },
    number: { type: Number, default: 0 },
    numberR: { type: Number, required: true },
    boolean: { type: Boolean, default: true },
    booleanFalse: { type: Boolean, default: false },
    email: { type: String, required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    password: { type: String, match: /^.{8,}$/ },
    phoneNumber: { type: String, match: /^0[0-9]{9}$/ },
    dateNow: { type: Date, default: Date.now() },
    array: { type: Array, default: [] },
    object: { type: Object, default: {} },
    id: {
        type: mongoose.Types.ObjectId,
        default: () => { return new mongoose.Types.ObjectId() },
        index: true,
    }
};
const defaultBillStatus = {
    waitingConfirm: 0,
    confirmed: 1,
    transferring: 2,
    cancelled: 3,
};
const defaultUserStatus = {
    active: 0,
    inactive: 1,
    deleted: 2,
};
const defaultProductStatus = {
    active: 0,
    inactive: 1,
    deleted: 2,
};
const defaultCategoryStatus = {
    active: 0,
    inactive: 1,
    deleted: 2,
};
const defaultPermission = {
    Product: "Quản lý sản phẩm",
    Category: "Quản lý thể loại",
    Trademark: "Quản lý thương hiệu",
    Staff: "Quản lý nhân viên",
    Customer: "Quản lý khách hàng",
    Import: "Quản lý nhập hàng",
    PositionPermission: "Quản lý quyền và chức vụ",
    Statistical: "Quản lý thống kê và báo cáo",
}
module.exports = {
    defaultModel,
    defaultBillStatus,
    defaultUserStatus,
    defaultProductStatus,
    defaultCategoryStatus,
    defaultPermission
};