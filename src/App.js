import React from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import CreateFlashCard from "./Pages/CreateFlashCard";
import MyFlashCard from "./Pages/MyFlashCard";
import FlashCardDetails from "./Pages/FlashCardDetails";
import Navbar from "./components/Navbar";
import Header from "./components/Header";


function App() {
  return (
    <HashRouter>
      <div className="w-full min-h-screen" id="bgBC">
        <Header />
        <div className="px-5 xl:px-32 container  mt-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<CreateFlashCard />} />{/*giving defult path to createflashcard  */}
            <Route path="/myflashcard" element={<MyFlashCard />} />
            <Route
              path="/flashcarddetails/:groupId"
              element={<FlashCardDetails />}
            />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
