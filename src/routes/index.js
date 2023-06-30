const routes = require("express").Router();

const usersRoutes = require("./usersRoutes");
const notesRoutes = require("./notesRoutes");
const tagsRoutes = require("./tagsRoutes");

routes.use("/users", usersRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;
