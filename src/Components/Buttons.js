import React from "react";

const ModalButtons = ({ handleSubmit, closeModal }) => {
  return (
    <div className="button-group">
      <button onClick={handleSubmit} className="savebtn">
        Save the Segment
      </button>
      <button onClick={closeModal} className="cancelbtn">
        cancel
      </button>
    </div>
  );
};

export default ModalButtons;
