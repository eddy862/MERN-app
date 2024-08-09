const Note = require("../models/note.model");

exports.getAllNotes = async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }, { __v: false }).sort({
      isPinned: -1,
    });

    return res
      .status(200)
      .json({ error: false, notes, msg: "All notes retrieved successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
}

exports.addNewNote = async (req, res) => {
  const { title, description, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res
      .status(400)
      .json({ error: true, msg: "Title should be provided." });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: true, msg: "Description should be provided." });
  }

  //create new doc
  try {
    const note = new Note({
      title,
      description,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res
      .status(201)
      .json({ error: false, note, msg: "Note added Successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
}

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags, isPinned } = req.body;
  const { user } = req.user;

  //if no updates provided then terminate
  if (!(title || description || tags || isPinned)) {
    return res.status(400).json({ error: false, msg: "No changes provided" });
  }

  try {
    //get the note
    const note = await Note.findOne({ _id: id, userId: user._id });

    if (!note) {
      return res.status(400).json({ error: true, msg: "Note not found" });
    }

    //update that note
    if (title) note.title = title;
    if (description) note.description = description;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned.value;

    await note.save();

    return res
      .status(200)
      .json({ error: false, note, msg: "Note updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
}

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const { user } = req.user;

  try {
    //get the note
    const note = await Note.findOne({ _id: id, userId: user._id });

    if (!note) {
      return res.status(400).json({ error: true, msg: "Note not found" });
    }

    await Note.deleteOne({ _id: id, userId: user._id });

    return res
      .status(200)
      .json({ error: false, note, msg: "Note deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
}