const express = require("express");
const {PORT} = require("./config/index");
const {ACCESS_TOKEN_SECRET} = require("./config/index");
const { CLIENT_URL } = require("./config/index");
const app = express();
const db = require("./config/database.js");
const routes = require("./routes/index.js");
const server = require("http").Server(app);
const cors = require("cors");
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser')
db.connect();
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: CLIENT_URL
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", CLIENT_URL);
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
});
app.use(cookieParser());
app.use(cookieSession({
    keys: [ACCESS_TOKEN_SECRET],
    name: "session",
    httpOnly: false,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use((req, res, next) => {
    req.session.cart ? req.session.cart : {};
    next();
});

app.use(routes);
app.get("/healcheck", (req, res) => {res.status(200).json({message: "Welcome to Watch Shop v1.0.0"})});
app.get("/*", (req, res) => {res.status(200).json({message: "Cann't access route"})});
server.listen(PORT, () => {
    console.log("Server listening on port "+ PORT);
})


