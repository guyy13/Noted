import axios from "axios";

const postReqHeader = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const getNotesFromDb = async () => {
  try {
    const notesFromDb = await axios.get("/get_notes");
    return notesFromDb.data;
  } catch (err) {
    console.log("An error occured! Error: ", err);
    throw err;
  }
};

const saveNoteInDb = async (noteToSave) => {
  let savedNoteId = null;
  try {
    const response = await axios.post("/save_note", noteToSave, postReqHeader);
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
    await axios.delete("/delete_note/" + noteIdToDelete);
  } catch (err) {
    console.log("An error occured! Error: ", err);
    throw err;
  }
};

const editNoteInDb = async (editedNoteId, editedNoteData) => {
  try {
    await axios.post(
      "/edit_note/" + editedNoteId,
      editedNoteData,
      postReqHeader
    );
  } catch (err) {
    console.log("An error occured! Error: ", err);
    throw err;
  }
};

export { getNotesFromDb, saveNoteInDb, deleteNoteFromDb, editNoteInDb };
