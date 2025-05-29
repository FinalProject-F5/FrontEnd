import Buttons from "../Buttons/Buttons";
import React from "react";

function Header() {
  return (
    <div className="navbar bg-secondary shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Travel4Real</a>
      </div>
      <div className="flex-none">
        {/* <ul className="menu menu-horizontal px-1">
          <li><a>Link</a></li>
          <li><a>Register</a></li>
        </ul> */}
        <Buttons
          className="border-none"
          style={{
            backgroundColor: "oklch(0.9632 0.0152 83.05 / 0.5)",
            color: "var(--color-base-content)",
          }}
        >
          {"Link"}
        </Buttons>
        <Buttons color="btn-primary">{"Register"}</Buttons>
        {/* Menú desplegable de categorías al final */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="buttons" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block h-5 w-5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Category 1</a>
            </li>
            <li>
              <a>Category 2</a>
            </li>
            <li>
              <a>Category 3</a>
            </li>
            <li>
              <a>Category 4</a>
            </li>
            <li>
              <a>Category 5</a>
            </li>
            <li>
              <a>Category 6</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
