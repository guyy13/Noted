import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";

const EditArea = (props) => {
  const [note, setNoteData] = useState({
    title: props.title,
    content: props.content,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNoteData((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  return (
    <form className="edit-note">
      <input
        className="title"
        name="title"
        onChange={handleChange}
        value={note.title}
        placeholder="Title"
      />
      <textarea
        name="content"
        onChange={handleChange}
        value={note.content}
        placeholder="Take a note..."
        rows="3"
      />
      <IconButton
        onClick={(event) => {
          props.onSave(event, note);
        }}
      >
        <SaveIcon></SaveIcon>
      </IconButton>
    </form>
  );
};

export default EditArea;
