const express = require("express");
const routes = express.Router();
const usersController = require("../../controllers/usersController");
const rolesList = require("../../config/rolesList");
const verifyRoles = require("../../middleware/verifyRoles");

routes.route("/")
    .get(verifyRoles(rolesList.Admin),usersController.getAllUsers)
    .delete(verifyRoles(rolesList.Admin),usersController.deleteUser);
routes.route("/:id")
    .get(verifyRoles(rolesList.Admin), usersController.getUser);
module.exports = routes;