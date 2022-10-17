const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/notesDB", {
  useNewUrlParser: true,
});

const noteSchema = mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

router.get("/", async (req, res) => {
  console.log("Fetching notes from DB...");
  try {
    const notesFromDb = await Note.find();
    console.log("Notes fetched successfullly.");
    res.status(200).send(notesFromDb);
  } catch (err) {
    console.log("Failed to fetch notes from DB! Error: ", err);
    res.status(504).send();
  }
});

router.post("/", async (req, res) => {
  console.log("Recieved request to save note: ", req.body);
  try {
    const savedNote = await new Note({
      title: req.body.title,
      content: req.body.content,
    }).save();
    console.log("Note saved in DB successfully, ID: ", savedNote.id);
    res.status(200).send({ id: savedNote.id });
  } catch (err) {
    console.log("Failed to save note in DB, error: ", err);
    res.status(504).send();
  }
});

router.delete("/:id", async (req, res) => {
  console.log("Recvied request to delete note, id: ", req.params.id);
  try {
    await Note.remove({ _id: req.params.id });
    console.log("Note '" + req.params.id + "' deleted successfully.");
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  console.log("Recieved request to update note, id: ", req.params.id);
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, content: req.body.content },
      { returnOriginal: false }
    );

    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;