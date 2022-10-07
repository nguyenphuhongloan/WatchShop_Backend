require("dotenv").config();
const configEnv = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};
module.exports = configEnv;