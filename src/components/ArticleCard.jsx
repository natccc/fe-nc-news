import React from "react";
import { formatDateToNow } from "../lib/utils";
import { Link } from "react-router-dom";
import ArticleVoteBtn from "./ArticleVoteBtn";
import CommentVoteBtn from "./CommentVoteBtn";

const ArticleCard = (props) => {
  const { article, setArticle } = props;

  return (
    <Link to={`/articles/${article.article_id}`}>
      {" "}
      <article className="border-t-2  ">
        <div className="hover:bg-light_gray p-2 hover:rounded-xl ">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-gray-800">
              {article.topic}
            </p>
            <p className="text-sm text-gray-700">{article.author}</p>
            <span className="text-xs font-extralight text-gray-400">•</span>
            <p className="text-sm text-gray-400 ">
              {article.created_at ? formatDateToNow(article.created_at) : ""}
            </p>
          </div>

          {article.body ? (
            <h1 className="mt-1 text-2xl font-semibold text-gray-800">
              {article.title}
            </h1>
          ) : (
            <h1 className="mt-1 text-xl font-semibold text-gray-800">
              {article.title}
            </h1>
          )}

          {article.body ? (
            <p className="mb-3 mt-2  text-gray-600">{article.body}</p>
          ) : (
            ""
          )}

          <div className="mt-2">
            <img
              src={article.article_img_url}
              className="h-full w-full rounded-xl object-cover "
            />
          </div>

          <div className="mt-3 flex items-center gap-4">
            <ArticleVoteBtn article={article} />
            <CommentVoteBtn comment_count={article.comment_count} />
          </div>
        </div>
      </article>{" "}
    </Link>
  );
};

export default ArticleCard;
