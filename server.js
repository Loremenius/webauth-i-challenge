const express = require("express");

const usersRouter = require("./api/users-router");

const cors = require("cors");

const server = express();

server.use(express.json());

server.use(cors());

server.use("/api/",usersRouter);



module.exports = server;