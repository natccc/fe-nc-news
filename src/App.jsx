import Article from "./pages/Article";
import Feed from "./pages/Feed";
import { Route, Routes } from "react-router";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import TopicsList from "./pages/TopicsList";
import Profile from "./pages/UserProfile";
Profile
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/home" element={<Feed />} />
        <Route path="/all" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:username" element={<Profile />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/t" element={<TopicsList />} />
        <Route path="/t/:topic" element={<Feed />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
