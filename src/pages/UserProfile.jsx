import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../lib/api";
import Error from "./Error";
import ArticleCard from "../components/ArticleCard";
import { getArticlesByUser } from "../lib/api";

const UserProfile = () => {
  const { currentUser } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUser(currentUser);
        setUserInfo(data);
      } catch {
        setError(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getArticlesByUser(currentUser);
        setArticles(data);
      } catch {
        setError(true);
      }
    })()},[]);

  if (error) return <Error></Error>;

  return (
    <div className="container mx-auto p-4 mt-8 flex flex-col gap-2">
      <div className="flex gap-6 items-center mt-2">
        <img
          src={userInfo.avatar_url}
          alt="avatar"
          className="h-32 w-32 rounded-full border object-contain "
        ></img>
        <div>
          <h1 className="text-3xl font-bold">{userInfo.name}</h1>
          <h2 className="mt-1 text-gray-500 font-semibold"> u/{currentUser}</h2>
        </div>
      </div>

      <span className=" text-lg mt-5  mb-2  font-bold border w-max py-2 px-6 rounded-2xl bg-gray-200 ">Posts</span>
        <ul className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 ">
          {articles.map((article) => {
            return <li key={article.article_id}><ArticleCard article={article} /></li>;
          })}
        </ul>{" "}

    </div>
  );
};

export default UserProfile;
