import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { formatDateToNow } from "../lib/utils";
import { Button } from "../components/Button";
import ArticleCard from "../components/ArticleCard";
import Error from "./Error";
import { Link } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import VoteBtn from "../components/VoteBtn";

const Article = () => {
  const params = useParams();
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  console.log(comments);
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

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          `https://be-news-api-h65m.onrender.com/api/articles/${params.article_id}/comments`,
        );
        setComments(res.data.comments);
      } catch (error) {
        setError(error);
      }
    };
    getComments();
  }, []);

  if (error) return <Error />;

  return (
    <>
      <Navbar></Navbar>
      <Link to={"/"}>
        <div className="absolute ml-12 mt-11">
          <CircleArrowLeft className="size-10 rounded-full stroke-gray-400 hover:bg-gray-100" />
        </div>
      </Link>
      <div className="mx-10 pt-4 md:mx-32 md:space-y-3 lg:mx-64 xl:mx-96">
        <ArticleCard articleData={article} />

        <div className="flex flex-col border rounded-lg p-4 ">
          {comments.map((comment) => {
            return (
              <div className="border-t-2  pt-1" key={comment.comment_id}>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {comment.author}
                  </p>
                  <span className="text-xs font-extralight text-gray-400">
                    •
                  </span>
                  <p className="text-sm text-gray-400 ">
                    {comment.created_at
                      ? formatDateToNow(comment.created_at)
                      : ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">{comment.body}</p>
                </div>

                {/* vote button */}
                <div className="flex h-10 w-20 items-center justify-between gap-1 rounded-md  px-1 ">
                  <button className="inline-flex items-center justify-center rounded-full  text-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
                    <svg
                      className="w-6 rounded-full   hover:bg-zinc-200 hover:stroke-red-700 "
                      viewBox="-6.24 -6.24 36.48 36.48"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="#424242"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="m3 14 9-11 9 11h-5v8H8v-8H3z" />
                    </svg>
                  </button>

                  <span className="text-xs font-semibold text-gray-800">
                    {comment.votes > 0 ? comment.votes : "Vote"}
                  </span>
                  <button className="inline-flex items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
                    <svg
                      className="w-6 rotate-180 rounded-full  hover:bg-zinc-200 hover:stroke-purple-800 "
                      viewBox="-6.24 -4.24 36.48 36.48"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="#424242"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="m3 14 9-11 9 11h-5v8H8v-8H3z" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Article;
