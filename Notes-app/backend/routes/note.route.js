const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authToken");
const {
  getAllNotes,
  addNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");

router.use(authenticateToken);

router.get("/", getAllNotes);
router.post("/", addNewNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
