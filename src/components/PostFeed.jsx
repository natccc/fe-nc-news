import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import Error from "../pages/Error";
import { Loader } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

const PostFeed = () => {
  const [page, setPage] = useState(2);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      const res = await axios.get(
        `https://be-news-api-h65m.onrender.com/api/articles?p=1`,
      );
      setItems(res.data.articles);
    };
    getArticles()
  }, []);

  const fetchArticles = async () => {
      const res = await axios.get(
        `https://be-news-api-h65m.onrender.com/api/articles?p=${page}`,
      );
      return res.data.articles;
    };
  

  const fetchData = async () => {
    const articlesFromServer = await fetchArticles();
    console.log(articlesFromServer)

    setItems([...items, ...articlesFromServer]);
    if (articlesFromServer.length === 0 || articlesFromServer.length < 10) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="m-0.5 flex w-full flex-1 flex-col space-y-3 rounded-lg p-2 md:m-3">
        <div className="mx-10 flex flex-col space-y-2 pt-4 md:mx-32 md:space-y-3 lg:mx-64 xl:mx-96">
          <ul className="flex flex-col space-y-2 md:space-y-3">
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
      </div>
    </InfiniteScroll>
  );
};

export default PostFeed;
