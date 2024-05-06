import { useState } from "react";
import Navbar from "./components/Navbar";
import PostFeed from "./components/PostFeed";
import { Route, Routes } from "react-router";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostFeed />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
