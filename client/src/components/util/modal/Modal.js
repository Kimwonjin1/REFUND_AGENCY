import React from "react";
import "./Modal.css";

function Modal({CardImg}) {
  return (
    <>
      <div id="modal" className="modal-overlay">
        <div className="modal-window">
          <img src={CardImg} className="modal-img" alt="" />
          <div className="close-arer"></div>
        </div>
      </div>
    </>
  );
}

export default Modal;
