import { formatDateToNow } from "../lib/utils";
import { deleteComment } from "../lib/api";
import { Button } from "./Button";
import { useState, useContext } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router";
import { patchComment } from "../lib/api";

const CommentCard = (props) => {
  const { comment, setComments } = props;
  const { username } = useContext(UserContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [voteChange, setVoteChange] = useState(0);
  const handleVote = (vote) => {
    setVoteChange((curr) => curr + vote);
    (async () => {
      try {
        patchComment(comment.comment_id, vote);
      } catch {
        setVoteChange(0);
        setStatus("error");
      }
    })();
  };

  const handleDelete = () => {
    setStatus("deleting");
    deleteComment(comment.comment_id)
      .then(() => {
        setStatus("deleted");
        setTimeout(() => {
          setComments((currComments) => {
            return currComments.filter((currComment) => {
              return currComment.comment_id !== comment.comment_id;
            });
          });
        }, "2000");
      })
      .catch((err) => {
        setStatus("error");
      });
  };

  const handleAuthorClick = () => {
    navigate(`/user/${comment.author}`);
  };

  return (
    <div className="m-1 rounded-md border-2 p-2 pt-1 ">
      <div className="m-1 flex items-center gap-1">
        <p
          className="text-sm font-semibold text-gray-800 hover:cursor-pointer hover:text-blue-800"
          onClick={handleAuthorClick}
        >
          {comment.author}
        </p>
        <span className="text-xs font-extralight text-gray-400">•</span>
        <p className="text-xs text-gray-500 ">
          {comment.created_at ? formatDateToNow(comment.created_at) : ""}
        </p>
      </div>
      <div>
        <p className="m-1 text-sm text-gray-700">{comment.body}</p>
      </div>

      <div className="flex items-center gap-4 rounded-md">
        <div className="flex h-10 w-24 items-center justify-between gap-1   px-1 ">
          <button
            onClick={(e) => {
              voteChange === 1 ? handleVote(-1) : handleVote(1);
            }}
            className="inline-flex items-center justify-center rounded-full  text-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          >
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
            {comment.votes +voteChange !== 0 ? comment.votes +voteChange : "Vote"}
          </span>
          <button
            onClick={(e) => {
              voteChange === -1 ? handleVote(1) : handleVote(-1);
            }}
            className="inline-flex items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          >
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
          {status==="error" && <p className="text-red-900">Error. Please try again later</p>}
        </div>
        {comment.author === username && (
          <button
            onClick={handleDelete}
            className=" h-7 rounded-md border px-2 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
          >
            {" "}
            <TrashIcon
              aria-label="delete comment"
              className="w-4 text-gray-700 "
            ></TrashIcon>
          </button>
        )}
        {status === "deleting" && <p className="">Deleting...</p>}
        {status === "deleted" && <p className="">Successfully deleted</p>}
        {status === "error" && (
          <p className="">Error. Please try again later.</p>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
