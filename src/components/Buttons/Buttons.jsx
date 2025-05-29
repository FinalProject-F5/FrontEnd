import React from "react";

export default function Buttons({
  children,
  text,
  onClick,
  className = "",
  color = "btn-primary",
  ...props
}) {
  return (
    <button
      className={`btn ${color} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children || text}
    </button>
  );
}
