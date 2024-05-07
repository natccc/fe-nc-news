import React from "react";
import { Button } from "./Button";
import { formatDateToNow } from "../lib/utils";
import { Link } from "react-router-dom";
import ArticleVoteBtn from "./ArticleVoteBtn";
import CommentVoteBtn from "./CommentVoteBtn";

const ArticleCard = (props) => {
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
  } = props.articleData;
  return (
    <Link to={`/articles/${topic}/${article_id}`}>
      {" "}
      <article className="border-t-2  ">
        <div className="hover:bg-light_gray p-2 hover:rounded-xl ">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-gray-800">/{topic}</p>
            <p className="text-sm text-gray-700">{author}</p>
            <span className="text-xs font-extralight text-gray-400">•</span>
            <p className="text-xs text-gray-500 ">
              {created_at ? formatDateToNow(created_at) : ""}
            </p>
          </div>

          {body ? (
            <h1 className="mt-1 text-2xl font-semibold text-gray-800">
              {title}
            </h1>
          ) : (
            <h1 className="mt-1 text-xl font-semibold text-gray-800">
              {title}
            </h1>
          )}

          {body ? <p className="mb-3 mt-2  text-gray-600">{body}</p> : ""}

          <div className="mt-2">
            <img
              src={article_img_url}
              className="h-full w-full rounded-xl object-cover "
            />
          </div>

          <div className="mt-3 flex items-center gap-4">
            <ArticleVoteBtn votes={votes} />
            <CommentVoteBtn comment_count={comment_count} />
          </div>
        </div>
      </article>{" "}
    </Link>
  );
};

export default ArticleCard;
