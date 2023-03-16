//this file is used to present Flashcard interface after creating a FlashCard
import React from "react";
import DefaultImg from "../../Images_icons/Default.jpg"
import { useNavigate } from "react-router-dom";

//flashCard received as a prop
const MySingleFlashCard = ({ flashcard }) => {
  const navigate = useNavigate();

  return (
    <div
      key={flashcard.groupid} // accessing the group id
      className="p-4 m-6 mx-auto flex flex-col space-y-3 items-center justify-center bg-white rounded-md text-black w-[23rem] h-[13rem] relative border-2 border-slate-200"
    >
      <div className="absolute -top-9">
        {/*ternary operator is used for getting the default image, if the condition is false or if the condition is true the selected image is displayed*/}
        {flashcard.groupimg ? (
          <img
            className="rounded-full w-16 h-16 object-cover aspect-square"
            src={flashcard.groupimg} // accessing the group image
            alt={flashcard.groupname}
          />
        ) : (
          <img
            className="rounded-full w-16 h-16 object-cover aspect-square"
            src={DefaultImg}
            alt={flashcard.groupname} 
          />
        )}
      </div>
      <h2 className="font-bold text-lg">{flashcard.groupname}</h2>
      <p className="text-center font-medium text-sm text-slate-600 line-clamp-2">
        {flashcard.groupdescription}
      </p>
      <p className="font-medium text-sm text-slate-700">
        {/*checking whether the flashcard is present or not , according to that the number is displayed */}
        {flashcard.cards ? flashcard.cards.length : 0} Cards
      </p>
      <button
        onClick={() => navigate(`/flashcarddetails/${flashcard.groupid}`)}  
        className="py-1 px-16 text-red-600 font-bold rounded-sm border-red-600 ring-2 ring-red-600"
      >
        View Card
      </button>
    </div>
  );
};

export default MySingleFlashCard;
