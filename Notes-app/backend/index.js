require("dotenv").config();

//connect db
const config = require("./config.json");
const mongoose = require("mongoose");

mongoose
  .connect(config.connectionString)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Failed to connect database: ", err));

//db schemas
const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 8000;

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./middlewares/authToken");

app.use(morgan("tiny"));

app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.sendStatus(401);
});

app.post("/user", async (req, res) => {
  const { fullName, email, password } = req.body;

  //check required fields are provided
  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, msg: "Fullname should be provided." });
  }

  if (!email) {
    return res
      .status(400)
      .json({ error: true, msg: "Email should be provided." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, msg: "Password should be provided." });
  }

  //check for existing email
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.status(200).json({ error: true, msg: "This email is taken." });
  }

  //create new user & send back jwt
  try {
    const user = new User({
      fullName,
      email,
      password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.status(201).json({
      error: false,
      user,
      accessToken,
      msg: "User registration successful",
    });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //check for empty field
  if (!email) {
    return res
      .status(400)
      .json({ error: true, msg: "Email should be provided." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, msg: "Password should be provided." });
  }

  //query db and return
  try {
    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
      return res.status(400).json({ error: true, msg: "Unregistered user" });
    }

    //if email exists then check if password correct
    if (userInfo.password === password) {
      const user = { user: userInfo };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
      });

      return res
        .status(200)
        .json({ error: false, email, accessToken, msg: "Login Successful" });
    } else {
      return res.status(200).json({ error: true, msg: "Incorrect password" });
    }
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
});

app.get("/user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const isUser = await User.findById(user._id, {
      fullName: true,
      email: true,
      createdAt: true
    });

    if (!isUser) {
      return res.status(400).json({ error: true, msg: "Unregistered user" });
    }

    return res.status(200).json({ error: false, user: isUser });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
});

app.post("/notes", authenticateToken, async (req, res) => {
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
});

app.patch("/notes/:id", authenticateToken, async (req, res) => {
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
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res
      .status(200)
      .json({ error: false, note, msg: "Note updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
});

app.get("/notes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res
      .status(200)
      .json({ error: false, notes, msg: "All notes retrieved successfully" });
  } catch (err) {
    return res.status(500).json({ error: true, msg: err.message });
  }
});

app.delete("/notes/:id", authenticateToken, async (req, res) => {
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
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
