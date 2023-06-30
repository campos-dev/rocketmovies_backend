const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { hash, compare } = require("bcryptjs");

class UsersControllers {
  async create(req, res) {
    const { name, email, password } = req.body;
    const database = await sqliteConnection();

    const checkUser = await database.get(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (checkUser) {
      throw new AppError("This Email was already registered");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json({});
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, old_password, password } = req.body;
    const database = await sqliteConnection();

    const user = await database.get("SELECT * FROM users WHERE id = ?", [id]);

    if (!user) {
      throw new AppError("User was not found");
    }

    const checkEmailIsRegistered = await database.get(
      "SELECT * FROM users WHERE email =?",
      [email]
    );

    if (checkEmailIsRegistered && checkEmailIsRegistered.id === user.id) {
      throw new AppError("This Email is already registered");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Old password must be provided to set a new password");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password is not correct");
      }

      const hashedPassword = await hash(password, 8);

      user.password = hashedPassword;
    }

    await database.run(
      `
    UPDATE users SET 
    name =?,
    email=?,
    password=?,
    updated_at = DATETIME('NOW')
    WHERE id =?`,
      [user.name, user.email, user.password, id]
    );

    return res.json();
  }
}

module.exports = UsersControllers;
