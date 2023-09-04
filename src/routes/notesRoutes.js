const notesRoutes = require("express").Router();
const NotesControllers = require("../controllers/NotesControllers");
const notesControllers = new NotesControllers();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.get("/", notesControllers.index);
notesRoutes.delete("/:id", notesControllers.delete);

module.exports = notesRoutes;
