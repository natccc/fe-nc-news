import React from "react";
import { formatDateToNow } from "../lib/utils";
import { Link } from "react-router-dom";
import ArticleVoteBtn from "./ArticleVoteBtn";
import CommentCount from "./CommentCount";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const ArticleCard = (props) => {
  const { article, setArticle } = props;
  const navigate = useNavigate();

  const handleArticleClick = (e) => {
    navigate(`/articles/${article.article_id}`);
  };

  const handleTopicClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    navigate(`/t/${article.topic}`);
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    navigate(`/profile/${article.author}`);
  };

  const handleVoteClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <article
      className="border-t-2 hover:cursor-pointer"
      onClick={(e) => handleArticleClick(e)}
    >
      <div className="hover:bg-light_gray p-2 hover:rounded-xl ">
        <div className="flex items-center gap-3">
          <p
            onClick={(e) => handleTopicClick(e)}
            className="text-sm font-semibold text-gray-800 hover:text-blue-700"
          >
            t/{article.topic}
          </p>

          <p
            onClick={(e) => handleUserClick(e)}
            className="text-sm text-gray-700 hover:text-blue-700"
          >
            {article.author}
          </p>

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
          <div onClick={(e) => handleVoteClick(e)}>
            <ArticleVoteBtn article={article} />
          </div>
          <HashLink smooth to={`/articles/${article.article_id}/#comment`}>
            {" "}
            <CommentCount comment_count={article.comment_count} />
          </HashLink>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
