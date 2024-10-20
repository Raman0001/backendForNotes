const express = require("express");
const routes = express.Router();
const registerController = require("../controllers/registerController");

routes.post('/', registerController.handleRegister)

module.exports = routes;