require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const post_router = require("./routers/postRouter");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", post_router);

module.exports = app;

