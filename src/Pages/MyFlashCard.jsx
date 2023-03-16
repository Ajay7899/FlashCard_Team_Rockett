/*Displaying created flashCards  */
import React, { useState } from "react";
import FlashcardUI from "../components/Card_Interface/FlashcardUI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyFlashCard = () => {
  const navigate = useNavigate(); // to return the impretive method to change the location

  const flashcard = useSelector((state) => state.flashcard.flashcards); // accessing state from store

  const [showAll, setShowAll] = useState(false);

  const showLimit = !showAll ? 6 : flashcard.length; // cardlimit

  return (
    <section className="flex flex-col mt-16">
      {/*depending upon the length, flashcards will be displayed if length<=0 no flashCard present */}
      {flashcard.length > 0 ? (
        <div>
          <div className="flex flex-wrap">
            {flashcard.slice(0, showLimit).map(({ card }, i) => (
              <FlashcardUI key={i} flashcard={card} />
            ))}
          </div>
          <div className="flex justify-end mr-10">
            <button
              className="w-16 mt-1 font-semibold text-lg text-red-600 rounded bg-white outline-none border-none active:outline-none active:border-none"
              onClick={() => setShowAll(!showAll)}
            >
              See all
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-blue-900 shadow-lg p-20 rounded">
          <h1 className="font-semibold text-xl text-lime-600">
            Nothing to show here!!! kindly create a new FlashCard &ndash;&ndash;&gt;
 
            <span
              className="text-yellow-600 cursor-pointer bg-white rounded pl-4"
              onClick={() => navigate("/")}
            >
           &nbsp; CreateNew
            </span>
          </h1>
        </div>
      )}
    </section>
  );
};

export default MyFlashCard;
