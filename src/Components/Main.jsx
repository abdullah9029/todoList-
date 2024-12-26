import React, { useState } from "react";
import AddButton from "../images/Addbutton.png";
import Rectangle from "../images/Rectangle.png";
import Search from "../images/Search.png";
import Detective from "../images/Detective.png";
import chevrenTop from "../images/chevron-top.png";
import searchIcon from "../images/Vector (2).png";

function Main() {
  const [showRectangle, setShowRectangle] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showImg, setShowImg] = useState(true);
  const [checkedNotes, setCheckedNotes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showOptions, setShowOptions] = useState({});

  const ButtonTapped = () => {
    setShowRectangle(true);
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setShowRectangle(false);
    setNewNote("");
    setEditingIndex(null);
  };

  const handleApply = () => {
    if (newNote.trim() !== "") {
      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = newNote;
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setNotes([...notes, newNote]);
      }
      setNewNote("");
      setShowRectangle(false);
    }

    if (notes.length == -1) {
      setShowImg(true);
    } else {
      setShowImg(false);
    }
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (index) => {
    setCheckedNotes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleOptions = (index) => {
    setShowOptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEdit = (index) => {
    setNewNote(notes[index]);
    setEditingIndex(index);
    setShowRectangle(true);
    setShowOptions((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setShowOptions({});
    if (updatedNotes.length === 0) {
      setShowImg(true);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Display the list of notes */}

      <div>
        <div className="borderColor input-group mb-3">
          <input
            type="text"
            className="border form-control"
            placeholder="Search note..."
            aria-label="Search note"
            style={{ paddingRight: "35px" }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div
            style={{
              position: "absolute",
              right: "95px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "3",
            }}
          >
            <img width="21px" height="21px" src={searchIcon} alt="search" />
          </div>
          <button className="btn-custom" type="button">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1
                  className="pt-1"
                  style={{
                    color: "#f7f7f7",
                    fontFamily: "Kanit",
                    fontSize: "18px",
                  }}
                >
                  ALL
                </h1>
              </div>
              <div>
                <img src={chevrenTop} alt="chevron-top" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {showImg && notes.length === 0 && (
        <div>
          <div>
            <img src={Detective} alt="" />
          </div>
          <div>
            <p className="TodoTxt" style={{ fontFamily: "Kanit" }}>
              Empty...
            </p>
          </div>
        </div>
      )}

      <div className="notes-list notesListSyle">
        {filteredNotes.map((note, index) => (
          <div key={index} className="note-item notesStyle">
            <input
              type="checkbox"
              checked={checkedNotes[index] || false}
              onChange={() => handleCheckboxChange(index)}
              className="inputStyle"
            />
            <span
              style={{
                textDecoration: checkedNotes[index] ? "line-through" : "none",
                flex: 1,
                fontFamily: "Kanit",
              }}
            >
              {note}
            </span>
            <div className="options-container" style={{ position: "relative" }}>
              <button
                onClick={() => toggleOptions(index)}
                className="options-button"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ⋮
              </button>
              {showOptions[index] && (
                <div
                  className="options-menu"
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "100%",
                    backgroundColor: "white",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    borderRadius: "4px",
                    zIndex: 1000,
                  }}
                >
                  <button
                    onClick={() => handleEdit(index)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px 16px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px 16px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      color: "red",
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showRectangle && (
        <div className="FooterRect">
          <div>
            <div style={{ position: "relative" }}>
              <img
                src={Rectangle}
                alt="Rectangle"
                style={{ maxWidth: "90%", maxHeight: "90%" }}
              />
              <div className="newNoteDiv">
                <h1 className="pb-5 TodoTxt" style={{ fontFamily: "Kanit" }}>
                  {editingIndex !== null ? "EDIT NOTE" : "NEW NOTE"}
                </h1>
              </div>
              <div className="borderDiv">
                <div className="borderColor input-group">
                  <input
                    type="text"
                    className="border form-control"
                    placeholder="Enter your note..."
                    aria-label="Enter note"
                    style={{ paddingRight: "35px", fontFamily: "Kanit" }}
                    value={newNote}
                    onChange={handleNoteChange}
                  />
                  <div SearchImgDiv>
                    <img width="21px" height="21px" src={Search} alt="search" />
                  </div>
                </div>
              </div>
              <div className="CancelBtnDiv">
                <button onClick={handleCancel} className="CancelBtn">
                  <p className="cancelBtnText">Cancel</p>
                </button>
                <button onClick={handleApply} className="Applybtn">
                  {editingIndex !== null ? "Update" : "Apply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="addBtnDiv">
        <button
          className="btn-custom d-flex justify-content-center align-items-center addBtn"
          onClick={ButtonTapped}
        >
          <img src={AddButton} alt="Add" width="24px" height="24" />
        </button>
      </div>
    </div>
  );
}

export default Main;
