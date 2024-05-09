import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../lib/api";
import Error from "./Error";
import ArticleCard from "../components/ArticleCard";
import { getArticlesByUser } from "../lib/api";

const UserProfile = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  console.log(articles);
  console.log(username);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUser(username);
        setUserInfo(data);
      } catch {
        setError(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getArticlesByUser(username);
        setArticles(data);
      } catch {
        setError(true);
      }
    })(),
      [];
  });

  if (error) return <Error></Error>;

  return (
    <div className=" container mt-8 flex flex-col gap-2">
      <div className="flex gap-6 items-center mt-2">
        <img
          src={userInfo.avatar_url}
          alt="avatar"
          className="h-32 w-32 rounded-full border object-contain "
        ></img>
        <div>
          <h1 className="text-3xl font-bold">{userInfo.name}</h1>
          <h2 className="mt-1 text-gray-500 font-semibold"> {username}</h2>
        </div>
      </div>

      <span className=" text-lg mt-5 mb-2 mx-2 font-bold border w-max py-2 px-6 rounded-3xl bg-gray-200 ">Posts</span>
      <section className="">
        <ul className="md:space-y-3">
          {articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>{" "}
      </section>
    </div>
  );
};

export default UserProfile;
