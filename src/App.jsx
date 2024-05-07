import { useState } from "react";
import Article from "./pages/Article";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/articles/:topic/:article_id" element={<Article />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
