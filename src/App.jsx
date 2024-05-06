import { useState } from "react";
import Article from "./pages/Article";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import Error from "./pages/Error";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/articles/:topic/:article_id/comments" element={<Article />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
