import Article from "./pages/Article";
import Feed from "./pages/Feed";
import { Route, Routes } from "react-router";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Users from "./pages/UsersList";
import TopicsList from "./pages/TopicsList";
import Profile from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/home" element={<Feed />} />
        <Route path="/all" element={<Feed />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:currentUser" element={<Profile />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/t" element={<TopicsList />} />
        <Route path="/t/:topic" element={<Feed />} />
        <Route path="/submit" element={<CreatePost />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
