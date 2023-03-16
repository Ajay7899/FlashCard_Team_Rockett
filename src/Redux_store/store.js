//store is created for global state management


import { configureStore } from "@reduxjs/toolkit";//The store variable is defined by calling configureStore()
import flashcardReducer from "./flashcardSlice";

const store = configureStore(
  {
    reducer: {
      //nameProvided in Slicer :function()
      flashcard: flashcardReducer,
    },
  });

// Redux store that contains a single slice named flashcard, and uses the flashcardReducer function to update its state.
export default store;
