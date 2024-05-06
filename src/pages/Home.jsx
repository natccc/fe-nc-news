import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import Error from "./Error";
import { Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState(2);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      const res = await axios.get(
        `https://be-news-api-h65m.onrender.com/api/articles?p=1&limit=5`,
      );
      setItems(res.data.articles);
    };
    getArticles();
  }, []);

  const fetchArticles = async () => {
    const res = await axios.get(
      `https://be-news-api-h65m.onrender.com/api/articles?p=${page}&limit=5`,
    );
    return res.data.articles;
  };

  const fetchData = async () => {
    const articlesFromServer = await fetchArticles();

    setItems([...items, ...articlesFromServer]);
    if (articlesFromServer.length === 0 || articlesFromServer.length < 5) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <>
      <Navbar></Navbar>
      
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
          <div className="mx-10 pt-4 md:mx-32 md:space-y-3 lg:mx-64 xl:mx-96">
            <ul className="md:space-y-3">
              {items.map((articleData) => {
                return (
                  <ArticleCard
                    articleData={articleData}
                    key={articleData.article_id}
                  />
                );
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

export default Home;
