import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";

function CreateArea(props) {
  const [note, setNoteData] = useState({
    title: "",
    content: "",
  });

  const [isAreaExpanded, setIsAreaExpended] = useState(false);

  function handleAreaClick() {
    setIsAreaExpended(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNoteData((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function handleAddNote(event) {
    props.onAdd(note);
    setNoteData({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {isAreaExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleAreaClick}
          value={note.content}
          placeholder="Take a note..."
          rows={isAreaExpanded ? "3" : "1"}
        />
        <Zoom in={isAreaExpanded}>
          <Fab onClick={handleAddNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
