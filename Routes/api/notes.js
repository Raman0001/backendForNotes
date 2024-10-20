const express = require("express");
const routes = express.Router();
const notesController = require("../../controllers/notesController");
const rolesList = require("../../config/rolesList");
const verifyRoles = require("../../middleware/verifyRoles");

routes.route("/")
    .get(notesController.getAllNotes)
    .post(verifyRoles(rolesList.User), notesController.createNote)
    .put(verifyRoles(rolesList.User), notesController.updateNote)
    .delete(verifyRoles(rolesList.User), notesController.deleteNote);
routes.route("/:id")
    .get(verifyRoles(rolesList.User), notesController.getNote);
module.exports = routes;