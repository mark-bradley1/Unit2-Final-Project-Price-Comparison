import React from "react";


const RemoveBtn = ({ id, type = "button", label, onClick, className }) => {
  return (
    <button id={id} type={type} onClick={onClick} className={className}>
    <span className="remove-btn-icon">
        <i className="fa-solid fa-circle-xmark"></i>
    </span>
      {label}
    </button>
  );
};

export default RemoveBtn;
