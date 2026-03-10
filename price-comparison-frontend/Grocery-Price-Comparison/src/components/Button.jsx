import React from "react";

const Button = ({
  id,
  type = "button",
  label,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      id={id}
      type={type}
      onClick={disabled ? undefined : onClick}
      className={`primary-btn ${className || ""}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
