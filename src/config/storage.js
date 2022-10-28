const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: 5 * 1024 * 1024
});
module.exports = upload
