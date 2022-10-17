const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/notesDB", {
  useNewUrlParser: true,
});

const noteSchema = mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

const fetchNotesFromDb = async () => {
  try {
    const notesFromDb = await Note.find();
    console.log("Notes fetched successfullly.");
    return notesFromDb;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const saveNoteInDb = async (noteTitle, noteContent) => {
  try {
    const savedNote = await new Note({
      title: noteTitle,
      content: noteContent,
    }).save();
    console.log("Note saved in DB successfully, ID: ", savedNote.id);
    return savedNote.id;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteNoteFromDb = async (noteIdToDelete) => {
  try {
    await Note.deleteOne({ _id: noteIdToDelete });
    console.log("Note '" + noteIdToDelete + "' deleted successfully.");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateNoteInDb = async (
  noteIdToUpdate,
  updatedNoteTitle,
  updatedNoteContent
) => {
  try {
    await Note.findOneAndUpdate(
      { _id: noteIdToUpdate },
      { title: updatedNoteTitle, content: updatedNoteContent },
      { returnOriginal: false }
    );
    console.log("Note '" + noteIdToUpdate + "' updated successfully.");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.fetchNotesFromDb = fetchNotesFromDb;
exports.saveNoteInDb = saveNoteInDb;
exports.deleteNoteFromDb = deleteNoteFromDb;
exports.updateNoteInDb = updateNoteInDb;
