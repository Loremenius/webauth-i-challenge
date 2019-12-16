const express = require("express");

const usersRouter = require("./api/users-router");

const server = express();

server.use(express.json());

server.use("/api/users",usersRouter);

module.exports = server;