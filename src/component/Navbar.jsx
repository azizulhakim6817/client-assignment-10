import { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { MdAddCircle, MdManageHistory } from "react-icons/md";
import { FaRegWindowRestore } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logoutUser = () => {
    signOutUser();
    setIsOpen(false);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const links = (
    <>
      <li>
        <NavLink to="/" className="font-semibold">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/available-foods" className="font-semibold">
          Available Foods
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="px-4 md:px-14 navbar bg-base-100 shadow-sm">
      {/* Left side */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-1">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 0C27.4768 0 31.2154 -0.000204921 34 1.60742C35.8242 2.66064 37.3394 4.17577 38.3926 6C40.0002 8.7846 40 12.5232 40 20C40 27.4768 40.0002 31.2154 38.3926 34C37.3394 35.8242 35.8242 37.3394 34 38.3926C31.2154 40.0002 27.4768 40 20 40C12.5232 40 8.7846 40.0002 6 38.3926C4.17577 37.3394 2.66064 35.8242 1.60742 34C-0.000204921 31.2154 0 27.4768 0 20C0 12.5232 -0.000204921 8.7846 1.60742 6C2.66064 4.17577 4.17577 2.66064 6 1.60742C8.7846 -0.000204921 12.5232 0 20 0ZM22 4C13.1634 4 6 11.1634 6 20C6 28.8366 13.1634 36 22 36C30.8366 36 38 28.8366 38 20C38 11.1634 30.8366 4 22 4Z"
              fill="#FF4D00"
            ></path>
            <path
              d="M36 20C36 25.5228 31.5228 30 26 30C20.4772 30 16 25.5228 16 20C16 14.4772 20.4772 10 26 10C31.5228 10 36 14.4772 36 20Z"
              fill="#FF4D00"
            ></path>
          </svg>
          <h1 className="font-bold text-2xl hidden lg:block">Plate-Share</h1>
        </Link>

        {/* Dropdown for mobile */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right side */}
      <div className="navbar-end relative" ref={dropdownRef}>
        {!user ? (
          <Link
            to="/login"
            className="btn bg-yellow-400 hover:bg-orange-700 hover:text-white"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer rounded-full px-2 py-1 hover:bg-gray-100 transition-all duration-200"
            >
              <img
                src={user?.photoURL}
                alt={user?.displayName || "User"}
                className="relative w-12 h-12 rounded-full border border-gray-300 object-cover"
              />

              <IoIosArrowDown
                size={28}
                className={` absolute -right-1 text-gray-600 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <ul className=" space-y-2 absolute right-0 mt-3 bg-base-100 rounded-box w-52 p-2 shadow z-50">
                <li>
                  <NavLink
                    to="add-food"
                    className="font-semibold flex justify-start gap-2 items-center"
                  >
                    <MdAddCircle size={16} className="text-black" /> Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manage-my-foods"
                    className="font-semibold flex justify-start gap-2 items-center"
                  >
                    <MdManageHistory size={18} className="text-black" /> Manage
                    My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="my-food-rquests"
                    className="font-semibold flex justify-start gap-2 items-center"
                  >
                    <FaRegWindowRestore size={16} className="text-black" /> My
                    Food Requests
                  </NavLink>
                </li>
                {/* logout */}
                <li>
                  <button
                    onClick={logoutUser}
                    className="font-semibold w-full text-left flex items-center gap-2 text-rose-600"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
