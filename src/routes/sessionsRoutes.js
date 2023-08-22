const sessionRoutes = require("express").Router();
const SessionsControllers = require("../controllers/SessionsControllers");

const sessionsControllers = new SessionsControllers();
sessionRoutes.post("/", sessionsControllers.create);

module.exports = sessionRoutes;
