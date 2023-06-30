const usersRoutes = require("express").Router();

const UsersControllers = require("../controllers/UsersControllers");
const usersControllers = new UsersControllers();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/:id", usersControllers.update);

module.exports = usersRoutes;
