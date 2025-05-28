import React from "react";

export default function Button({
  children,
  text,
  onClick,
  className = "",
  ...props
}) {
  return (
    <button className="btn">primary</button>
    // <button
    //   className={`btn-yellow ${className}`}
    //   onClick={onClick}
    //   {...props}
    // >
    //   {children || text}
    // </button>
  );
}
