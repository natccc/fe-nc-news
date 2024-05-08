import { useState } from "react";
import Article from "./pages/Article";
import Feed from "./pages/Feed";
import { Route, Routes } from "react-router";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import TopicsList from "./pages/TopicsList";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/all" element={<Feed />} />
        <Route path="/profile/jessjelly" element={<Profile />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/t" element={<TopicsList />} />
        <Route path="/t/:topic" element={<Feed />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
