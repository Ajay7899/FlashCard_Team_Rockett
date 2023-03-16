
 import { createSlice } from "@reduxjs/toolkit";

 /* here we are accessing the localstorage through initial state */
const initialState = {
  flashcards: localStorage.getItem("flashcards")
    ? JSON.parse(localStorage.getItem("flashcards"))
    : [],
};
/*createSlice() Action creators for each reducer function. */
export const flashcardSlice = createSlice({
  
  name: "flashcard", //just a name
  initialState,  //initial state for the reducer
  reducers: {
  
    //this is a function----> setFlashCard(param1 , parma2){}  
    setFlashCard(state, action) {
      // console.log(state)
      // console.log(action)

      //update the inititalState.flashcards.push({})
      state.flashcards.push({
        card: action.payload,
      });
   
      //if the localstorage is empty then set new Item from state.flashcards
      localStorage.setItem("flashcards", JSON.stringify(state.flashcards));
    },
  },
});

//actions and reducers are exported below. Redux tool kit made it simpler  

export const { setFlashCard } = flashcardSlice.actions; //actions



export default flashcardSlice.reducer;//reducer
