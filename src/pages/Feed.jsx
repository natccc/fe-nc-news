import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Error from "./Error";
import InfiniteScroll from "react-infinite-scroll-component";
import { getArticles, fetchArticles } from "../lib/api";
import { useParams, useNavigate } from "react-router-dom";
import SortByDropdown from "../components/SortByDropdown";
import Loading from "../components/Loading";
import { Select, Option } from "@material-tailwind/react";
import { set } from "date-fns";

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
  }, [sortBy, orderBy, topic]);
  const fetchData = async () => {
    const articlesFromServer = await fetchArticles(
      page,
      topic,
      sortBy,
      orderBy,
    );

    setArticles([...articles, ...articlesFromServer]);
    if (articlesFromServer.length === 0 || articlesFromServer.length < 10) {
      setHasMore(false);
    }
    setPage(page + 1);
  };
  // const handleSort = (e) => {
  //   setSortBy(e.target.value);
  //   params.topic
  //     ? navigate(`/t/${topic}?sort=${e.target.value}`)
  //     : navigate(`?sort=${e.target.value}`);
  // };

  const handleOrder = (e) => {
    setOrderBy(e.target.value);
    params.topic
      ? navigate(`/t/${topic}?sort=${sortBy}&order_by=${e.target.value}`)
      : navigate(`?sort=${sortBy}&order=${e.target.value}`);
  };

  if (error) {
    return (
      <Error
        code={error.response.status}
        message={error.response.data.message}
      ></Error>
    );
  }

  return (
    <>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={articles.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading></Loading>}
        endMessage={
          <p className="my-8 text-center font-thin text-gray-600 ">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="p-6 ">
          <div className="flex gap-2 w-min m-2 ">
            <Select
            label="Sort By"
            value={sortBy}
              onChange={(val) => setSortBy(val)}
            >
              <Option value="created_at">Date</Option>
              <Option value="votes">Votes</Option>
              <Option value="comment_count">Comments</Option>
            </Select>
          

          <Select
          label="Order By"
            value={orderBy}
            onChange={(val) => setOrderBy(val)}
          >
            <Option value="desc">Descending</Option>
            <Option value="asc">Ascending</Option>
          </Select>
          </div>
          <h1 className="mx-2 my-4 text-3xl font-bold capitalize text-gray-900">
            {pageTitle}
          </h1>
          <ul className="grid-cols grid gap-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => {
              return <ArticleCard article={article} key={article.article_id} />;
            })}
          </ul>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Feed;
