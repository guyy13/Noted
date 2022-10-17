import axios from "axios";

const postReqHeader = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const getNotesFromDb = async () => {
  try {
    const notesFromDb = await axios.get("/note");
    return notesFromDb.data;
  } catch (err) {
    console.log("An error occured! Error: ", err);
    throw err;
  }
};

const saveNoteInDb = async (noteToSave) => {
  let savedNoteId = null;
  try {
    const response = await axios.post("/note", noteToSave, postReqHeader);
    console.log("Response: ", response.data);
    savedNoteId = response.data.id;
    return savedNoteId;
  } catch (err) {
    console.log("An error occured! Error: ", err);
    throw err;
  }
};

const deleteNoteFromDb = async (noteIdToDelete) => {
  try {
    await axios.delete("/note/" + noteIdToDelete);
  } catch (err) {
    console.log("An error occured! Error: ", err);
    throw err;
  }
};

const editNoteInDb = async (editedNoteId, editedNoteData) => {
  try {
    await axios.put("/note/" + editedNoteId, editedNoteData, postReqHeader);
  } catch (err) {
    console.log("An error occured! Error: ", err);
    throw err;
  }
};

export { getNotesFromDb, saveNoteInDb, deleteNoteFromDb, editNoteInDb };
