const usersRoutes = require("express").Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const UsersControllers = require("../controllers/UsersControllers");
const usersControllers = new UsersControllers();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);

module.exports = usersRoutes;
