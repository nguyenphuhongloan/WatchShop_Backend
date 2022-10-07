const express = require("express");
const {PORT} = require("./config/index");
const app = express();
const db = require("./config/database.js");
const routes = require("./routes/index.js");
const server = require("http").Server(app);
db.connect();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
app.get("/healcheck", (req, res) => {res.status(200).json({message: "Welcome to Watch Shop v1.0.0"})})
app.get("/*", (req, res) => {res.status(200).json({message: "Cann't access route"})});
server.listen(PORT, () => {
    console.log("Server listening on port "+ PORT);
})


