require("dotenv").config();
require("./api/data/db.connection").open();
const express = require("express");
const router = require("./api/router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api", router);

const server = app.listen(process.env.PORT, () => {
    console.log("Listening to port: ", server.address().port);
})