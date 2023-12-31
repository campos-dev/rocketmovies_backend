const tagsRoutes = require("express").Router();
const TagsControllers = require("../controllers/TagsControllers");
const tagsControllers = new TagsControllers();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

tagsRoutes.get("/", ensureAuthenticated, tagsControllers.index);

module.exports = tagsRoutes;
