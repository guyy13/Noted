const express = require("express");
const router = express.Router();
const noteServices = require("../services/NoteServices");

router.get("/", async (req, res) => {
  console.log("Fetching notes from DB...");
  try {
    const notesFromDb = await noteServices.fetchNotesFromDb();
    res.status(200).send(notesFromDb);
  } catch (err) {
    res.status(504).send();
  }
});

router.post("/", async (req, res) => {
  console.log("Recieved request to save note: ", req.body);
  try {
    const savedNoteId = await noteServices.saveNoteInDb(
      req.body.title,
      req.body.content
    );
    res.status(200).send({ id: savedNoteId });
  } catch (err) {
    res.status(504).send();
  }
});

router.delete("/:id", async (req, res) => {
  console.log("Recvied request to delete note, id: ", req.params.id);
  try {
    await noteServices.deleteNoteFromDb(req.params.id);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  }
});

router.put("/:id", async (req, res) => {
  console.log("Recieved request to update note, id: ", req.params.id);
  try {
    await noteServices.updateNoteInDb(
      req.params.id,
      req.body.title,
      req.body.content
    );
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
