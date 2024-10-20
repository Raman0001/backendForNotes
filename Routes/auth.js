const express = require("express");
const routes = express.Router();
const authController = require("../controllers/authController");

routes.post('/',authController.handleLogin)

module.exports = routes;