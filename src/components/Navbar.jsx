//Navbar
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" pt-2">
      <h1 className="text-4xl text-white font-semibold mb-5 text-shadow: #FC0 1px 0 10px;">
        Create Flashcard
      </h1>
      <div className="flex items-center space-x-10 mb-3">
        <button className="text-lg font-semibold text-slate-50">
          <NavLink to={"/"} 
            /*active tab is represented by red underline */
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid red" : undefined,
              paddingBottom: "10px",
              borderRadius: "3px",
            })}>
            Create New
          </NavLink>
        </button>
        <button className="text-lg font-semibold text-slate-50">
          <NavLink
            to={"/myflashcard"}
            /*active tab is represented by red underline */
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid red" : undefined,
              paddingBottom: "10px",
              borderRadius: "3px",
            })}
          >
            My Flashcard
          </NavLink>
        </button>
      </div>
      <hr className="border bg-black-700 border-gray-300 mb-8" />
    </div>
  );
};

export default Navbar;
