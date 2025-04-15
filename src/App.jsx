import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Search from "./search";
import Block from "./block";
import Upload from "./Upload"; // or your main upload page
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/search" element={<Search />} />
        <Route path="/block" element={<Block />} />
      </Routes>
    </>
  );
}

export default App;
