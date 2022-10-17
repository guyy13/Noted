import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import HeaderMenu from "./HeaderMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { errorAlert, reloadPageAlert } from "../Alerts";
import {
  getNotesFromDb,
  saveNoteInDb,
  deleteNoteFromDb,
  editNoteInDb,
} from "../DbCommunicator";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesFromDb = await getNotesFromDb();
        console.log(notesFromDb);
        setNotes(notesFromDb);
      } catch (err) {
        reloadPageAlert(
          "Oops...",
          "Something went wrong, we couldn't get your notes",
          "/"
        );
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (newNote) => {
    let prevNotesArr;
    setNotes((prevNotes) => {
      prevNotesArr = [...prevNotes];
      return [...prevNotes, newNote];
    });

    try {
      const savedNoteId = await saveNoteInDb(newNote);
      newNote["_id"] = savedNoteId;
      setNotes([...prevNotesArr, newNote]);
      console.log(notes);
    } catch (err) {
      setNotes(prevNotesArr);
      errorAlert("Oops...", "Something went wrong.");
    }
  };

  const deleteNote = async (noteIdToRemove) => {
    let prevNotesArr;
    setNotes((prevNotes) => {
      prevNotesArr = [...prevNotes];
      return prevNotes.filter((noteItem) => noteItem._id !== noteIdToRemove);
    });

    try {
      await deleteNoteFromDb(noteIdToRemove);
    } catch (err) {
      setNotes(prevNotesArr);
      errorAlert("Oops...", "Something went wrong.");
    }
  };

  const editNote = async (editedNoteId, editedNote) => {
    let prevNotesArr;
    try {
      setNotes((prevNotes) => {
        prevNotesArr = [...prevNotes];
        return prevNotes.map((currentNote) => {
          if (currentNote._id === editedNoteId) {
            return { ...editedNote, _id: editedNoteId };
          } else {
            return currentNote;
          }
        });
      });

      await editNoteInDb(editedNoteId, editedNote);
    } catch (err) {
      setNotes(prevNotesArr);
      errorAlert("Oops...", "Something went wrong.");
    }
  };

  return (
    <>
      <BrowserRouter>
        <HeaderMenu />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <CreateArea onAdd={addNote} />
                {notes.map((noteItem) => {
                  return (
                    <Note
                      key={noteItem._id}
                      id={noteItem._id}
                      title={noteItem.title}
                      content={noteItem.content}
                      onDelete={deleteNote}
                      onEdit={editNote}
                    />
                  );
                })}
              </>
            }
          />
          <Route path="archive" element={<h1>Archive....</h1>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
