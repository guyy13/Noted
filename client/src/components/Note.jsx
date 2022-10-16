import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditArea from "./EditArea";

const Note = ({ id, title, content, onDelete, onEdit }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isShowOptions, setIsShowOptions] = useState(false);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = (event, editedNote) => {
    onEdit(id, editedNote);
    setIsEditable(false);
    setIsShowOptions(false);
    event.preventDefault();
  };

  const handleMouseEnter = () => {
    setIsShowOptions(true);
  };

  const handleMouseLeave = () => {
    setIsShowOptions(false);
  };

  return isEditable ? (
    <div className="note">
      <EditArea title={title} content={content} onSave={handleSave} />
    </div>
  ) : (
    <div
      className="note"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1>{title}</h1>
      <p>{content}</p>
      <div style={{ height: "35px" }}>
        {isShowOptions && (
          <>
            <IconButton onClick={handleDelete} style={{ height: "35px" }}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
            <IconButton onClick={handleEdit} style={{ height: "35px" }}>
              <EditIcon></EditIcon>
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Note;
