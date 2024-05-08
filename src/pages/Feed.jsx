import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Error from "./Error";
import { Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getArticles, fetchArticles } from "../lib/api";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";

const Feed = () => {
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("desc");
  const [page, setPage] = useState(2);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const pageTitle = params.topic ? params.topic : "all";
  const topic = params.topic ? params.topic : "";
  useEffect(() => {
    getArticles(topic, sortBy, orderBy)
      .then((data) => setArticles(data))
      .catch((err) => setError(err));
  }, [sortBy, orderBy]);

  const fetchData = async () => {
    const articlesFromServer = await fetchArticles(
      page,
      topic,
      sortBy,
      orderBy,
    );

    setArticles([...articles, ...articlesFromServer]);
    if (articlesFromServer.length === 0 || articlesFromServer.length < 5) {
      setHasMore(false);
    }
    setPage(page + 1);
  };
  const handleSort = (e) => {
    setSortBy(e.target.value);
    params.topic
      ? navigate(`/t/${topic}?sort=${e.target.value}`)
      : navigate(`?sort=${e.target.value}`);
  };

  const handleOrder = (e) => {
    setOrderBy(e.target.value);
    params.topic
      ? navigate(`/t/${topic}?sort=${sortBy}&order_by=${e.target.value}`)
      : navigate(`?sort=${sortBy}&order=${e.target.value}`);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="articles-center flex justify-center">
            <Loader className="text-gray-700" />
          </div>
        }
        endMessage={
          <p className="text-center my-8 text-gray-600 font-thin ">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="mx-10 pt-4 md:mx-32 md:space-y-3 lg:mx-64 xl:mx-96">
          <select className="my-2 mx-1" name="sort_by" id="" onChange={(e) => handleSort(e)}>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>
          <select name="order_by" id="" onChange={(e) => handleOrder(e)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <h1 className="mx-2 my-4 text-3xl font-bold capitalize text-gray-900">
            {pageTitle}
          </h1>
          <ul className="md:space-y-3">
            {articles.map((article) => {
              return <ArticleCard article={article} key={article.article_id} />;
            })}
          </ul>{" "}
          {error && (
            <Error
              message={error.response.data.message}
              code={error.response.status}
            />
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Feed;
