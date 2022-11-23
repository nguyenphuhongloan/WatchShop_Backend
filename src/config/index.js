require("dotenv").config();
const configEnv = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    PARENTS_FOLDER: process.env.PARENTS_FOLDER,
    PRODUCTS_FOLDER: process.env.PRODUCTS_FOLDER,
    EMAIL: process.env.EMAIL,
    REFRESH_TOKEN_MAIL: process.env.REFRESH_TOKEN_MAIL,
    CLIENT_URL: process.env.CLIENT_URL,
};
module.exports = configEnv;