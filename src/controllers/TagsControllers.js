const knex = require("../database/knex");

class TagsControllers {
  async index(req, res) {
    const { user_id } = req.params;

    const tags = await knex("tags").where({ user_id });

    res.json(tags);
  }
}

module.exports = TagsControllers;
