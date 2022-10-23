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
}
module.exports = {
    defaultModel,
    defaultBillStatus,
    defaultUserStatus,
    defaultProductStatus
};