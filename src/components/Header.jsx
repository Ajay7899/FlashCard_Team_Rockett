
import React from "react";
import logo from "../Images_icons/flashcards.png"

const Header = () => {
  return (
    <div className=" shadow-lg shadow-red-800 bg-transparent flex">
      <img className=" pt-3 pb-2 ml-5 sm:w-auto" src={logo} alt="logo" style={{height:"80px"}}/>
      <p className="font-bold text-cyan-50 p-3" style={{fontSize:"30px"}}>FlashCard</p>
    </div>
  );
};

export default Header;
