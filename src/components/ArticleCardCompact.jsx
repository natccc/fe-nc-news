import {useContext, useState} from "react";
import { formatDateToNow } from "../lib/utils";
import ArticleVoteBtn from "./ArticleVoteBtn";
import CommentCount from "./CommentCount";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { UserContext } from "../contexts/User";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteArticle } from "../lib/api";
import DeleteModal from "./DeleteModal";

const ArticleCardCompact = (props) => {
  const { currentUser } = useContext(UserContext);
  const { article, setArticle } = props;
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const params = useParams();
  const [showModal, setShowModal] = useState(false)

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
    navigate(`/user/${article.author}`);
  };

  const handleVoteClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setShowModal(true)
  }

  const confirmDelete=()=>{
    setStatus("deleting");
    deleteArticle(article.article_id)
      .then(() => {
        setStatus("deleted");
        setTimeout(() => {
          navigate("/")
        }, "2000");
      
      })
      .catch(() => {
        setStatus("error");
      });
  }

  return (
    <article
      className="border-t-2 hover:cursor-pointer"
      onClick={(e) => handleArticleClick(e)}
    >
      <div className="hover:bg-light_gray p-2 hover:rounded-xl ">
        <div className="flex items-center gap-3">
         
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

        <div className="mt-2  object-contain overflow-hidden  ">
          <img
            src={article.article_img_url}
            className="rounded-lg  mx-auto "
          />
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div onClick={(e) => handleVoteClick(e)}>
            <ArticleVoteBtn article={article} />
          </div>
          <HashLink smooth to={`/articles/${article.article_id}/#comment` }>
            {" "}
            <CommentCount comment_count={article.comment_count} />
          </HashLink>



          {/* delete button */}
          {article.author === currentUser && params.article_id!==undefined && (
          <button
            onClick={e=>handleDelete(e)}
            className=" h-7 rounded-md border px-2 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          >
            {" "}
            <TrashIcon
              aria-label="delete article"
              className="w-4 text-gray-700 "
            ></TrashIcon>
            {showModal&& <DeleteModal content="article" onClick={confirmDelete}></DeleteModal>}
          </button>
        )}
        {status === "deleting" && <p className="">Deleting...</p>}
        {status === "deleted" && <p className="">Successfully deleted</p>}
        {status === "error" && (
          <p className="">Error. Please try again later.</p>
        )}

          
        </div>
      </div>
    </article>
  );
};

export default ArticleCardCompact;
