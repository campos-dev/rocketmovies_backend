const AppError = require("../utils/AppError");

class UsersControllers {
  show(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError("Name is mandatory!");
    }

    return res.json({ name, email, password });
  }
}

module.exports = UsersControllers;
