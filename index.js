const express = require('express');
require('dotenv').config()


const coverterController = require('./controller/coverterController')

let router = express.Router();

const app = express();
const port = process.env.PORT || 3000;

let converterRoutes = require("./controller/coverterController");

app.use("/Convert", router);

converterRoutes(router);
const connect = require("./config/dbConfig");
connect.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", function (req, res) {
    res.send("Hello Express");
});


app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})