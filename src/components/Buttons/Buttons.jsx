import React from "react";
import { Link } from "react-router-dom";

export default function Buttons({
  children,
  text,
  onClick,
  className = "",
  color = "btn-primary",
  to,
  ...props
}) {
  const content = children || text;

  if (to) {
    // Si hay prop 'to', renderiza un Link con estilos de botón :)
    return (
      <Link
        to={to}
        className={`btn ${color} ${className}`}
        {...props}
      >
        {content}
      </Link>
    );
  }

  // Si no, renderiza un botón normal 
  return (
    <button
      className={`btn ${color} ${className}`}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}