import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Error from "./Error";
import { Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getArticles, fetchArticles } from "../lib/api";
import { useParams, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading"

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
    (async () => {
      try {
        const data = await getArticles(topic, sortBy, orderBy);
        setArticles(data);
      } catch (err) {
        setError(err);
      }
    })();
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

 if(error){
  return <Error code={error.response.status} message= {error.response.data.message}></Error>
 } 


  return (
    <>
      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={articles.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="articles-center flex justify-center">
            <Loading></Loading>
          </div>
        }
        endMessage={
          <p className="my-8 text-center font-thin text-gray-600 ">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="mx-10 pt-4 md:mx-32 md:space-y-3 lg:mx-64 xl:mx-96">
          <select
            className="mx-1 my-2"
            name="sort"
            id="sort"
            onChange={(e) => handleSort(e)}
          >
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>
          <select name="order" id="order" onChange={(e) => handleOrder(e)}>
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
        
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Feed;
