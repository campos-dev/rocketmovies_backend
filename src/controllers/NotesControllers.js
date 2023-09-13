const knex = require("../database/knex");

class NotesControllers {
  async create(req, res) {
    const { title, description, rating, tags = [] } = req.body;
    const user_id = req.user.id;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const insertTags = tags.map((tag) => {
      return {
        note_id,
        user_id,
        name: tag,
      };
    });

    if (insertTags.length > 0) {
      await knex("tags").insert(insertTags);
    }

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");

    return res.json({
      ...note,
      tags,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("notes").where({ id }).delete();

    return res.json();
  }

  async index(req, res) {
    const { title, rating, tags } = req.query;
    const user_id = req.user.id;

    let notes;
    if (tags) {
      const filteredTags = tags.split(",").map((tag) => tag.trim());
      if (rating) {
        notes = await knex("tags")
          .select([
            "notes.id",
            "notes.title",
            "notes.user_id",
            "notes.description",
            "notes.rating",
          ])
          .where("notes.user_id", user_id)
          .where("notes.rating", rating)
          .whereIn("name", filteredTags)
          .whereLike("notes.title", `%${title}%`)
          .innerJoin("notes", "notes.id", "tags.note_id")
          .groupBy("notes.id")
          .orderBy("notes.title");
      } else {
        notes = await knex("tags")
          .select([
            "notes.id",
            "notes.title",
            "notes.user_id",
            "notes.description",
            "notes.rating",
          ])
          .where("notes.user_id", user_id)
          .whereIn("name", filteredTags)
          .whereLike("notes.title", `%${title}`)
          .innerJoin("notes", "notes.id", "tags.note_id")
          .groupBy("notes.id")
          .orderBy("notes.title");
      }
    } else {
      if (rating) {
        notes = await knex("notes")
          .where({ user_id, rating })
          .whereLike("title", `%${title}%`)
          .groupBy("notes.id")
          .orderBy("title");
      } else {
        notes = await knex("notes")
          .where({ user_id })
          .whereLike("title", `%${title}%`)
          .groupBy("notes.id")
          .orderBy("title");
      }
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const tagsFromNote = userTags.filter((tag) => note.id === tag.note_id);
      return {
        ...note,
        tag: tagsFromNote,
      };
    });

    return res.json(notesWithTags);
  }
}

module.exports = NotesControllers;
