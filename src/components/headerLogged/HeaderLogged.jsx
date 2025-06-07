import { useAuth } from "../../context/AuthContext";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderLogged() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

   const onClick=  () => {
    logout();
    navigate("/")
  };

  return (
    <div className="navbar bg-secondary shadow-sm flex-wrap">
      <div className="flex-1 md:order-first">
        <Link
          to="/HomePage"
          className="btn btn-ghost text-3xl text-white font-sans normal-case ml-4"
        >
          Travel4Real
        </Link>
      </div>

      <div className="flex-none flex items-center md:order-last [filter:sepia(40%)]">
        <div className="flex items-center mr-4">
          <div className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User Avatar" src="src/assets/avatar_placeholder.png" />
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow min-w-max"
          >
            <li>
             <Link to="/HomePage">Home</Link>
            </li>
            <li>
          <Link to="/AddExperience">Add Experience</Link>
            </li>
            <li>
             <button onClick={onClick}>Logout</button>
            </li>
           
          </ul>
        </div>
      </div>

      <div className="flex items-center mx-4 flex-grow w-full my-2 md:w-auto md:my-0 md:order-none [filter:sepia(40%)]">
        <label className="input input-bordered flex-grow border-r-0">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search experiences..."
            className="w-full"
          />
        </label>
       
      </div>
    </div>
  );
}
