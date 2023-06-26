const usersRoutes = require("express").Router();

const UsersControllers = require("../controllers/UsersControllers");
const usersControllers = new UsersControllers();

usersRoutes.get("/", usersControllers.show);

module.exports = usersRoutes;
