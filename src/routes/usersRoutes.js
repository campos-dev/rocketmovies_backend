const usersRoutes = require("express").Router();
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const multer = require("multer");
const uploadConfig = require("../config/upload");
const upload = multer(uploadConfig.MULTER);

const UsersControllers = require("../controllers/UsersControllers");
const usersControllers = new UsersControllers();

const UserAvatarController = require("../controllers/UserAvatarController");
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
