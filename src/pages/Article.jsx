import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { formatDateToNow } from "../lib/utils";
import { Button } from "../components/Button";
import ArticleCard from "../components/ArticleCard";
import Error from "./Error";

const Article = () => {
  const params = useParams();
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(null);

  const {
    author,
    title,
    article_id,
    topic,
    created_at,
    votes,
    article_img_url,
    comment_count,
    body,
  } = article;

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axios.get(
          `https://be-news-api-h65m.onrender.com/api/articles/${params.article_id}`,
        );
        setArticle(res.data.article);
      } catch (error) {
        setError(error);
      }
    };
    getArticle();
  }, []);

  if (error) return <Error />;

  return (
    <>
      <Navbar></Navbar>
      <div className="mx-10 pt-4 md:mx-32 md:space-y-3 lg:mx-64 xl:mx-96">
       <ArticleCard articleData={article}/>
      </div>
    </>
  );
};

export default Article;
