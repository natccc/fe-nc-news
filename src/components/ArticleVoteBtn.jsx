import { patchArticle } from "../lib/api";
import { useState } from "react";

const ArticleVoteBtn = (props) => {
  const { article, setArticle } = props;
  const [voteChange, setVoteChange] = useState(0);
  const [error, setError] = useState(false);
  const handleVote = (vote) => {
    setVoteChange((curr) => curr + vote);
    patchArticle(article.article_id, vote)
      .then(() => {
      })
      .catch((err) => {
        setError(true);
      });
  };
  let voteDisplay = article.votes + voteChange;
  if (error) {
    voteDisplay = article.votes;
  }
  return (
    <>
      <div className="flex h-10 items-center justify-between gap-1 rounded-md bg-[#EAEDEF]  px-1 ">
        <button
          onClick={() => voteChange===1? handleVote(-1) : handleVote(1)}
          className="inline-flex items-center justify-center rounded-full bg-zinc-100  text-zinc-900 transition-colors active:scale-95 "
        >
          <svg
            className={`w-8 rounded-full  bg-[#EAEDEF]  hover:bg-zinc-200 hover:stroke-red-700 ${voteChange===1? "stroke-red-700" : ""}`}
            viewBox="-6.24 -6.24 36.48 36.48"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#424242"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="m3 14 9-11 9 11h-5v8H8v-8H3z" />
          </svg>
        </button>

        <span className="text-sm font-semibold text-gray-800">
          {voteDisplay !== 0 ? voteDisplay : "Vote"}
        </span>
        <button
          onClick={() => voteChange===-1? handleVote(1) : handleVote(-1)}
          className="inline-flex items-center justify-center rounded-full bg-zinc-100  text-zinc-900 transition-colors hover:bg-zinc-200 active:scale-95"
        >
          <svg
            className={`w-8 rotate-180 rounded-full bg-[#EAEDEF] hover:bg-zinc-200 hover:stroke-purple-700 ${voteChange===-1? "stroke-purple-700" : ""}`}
            viewBox="-6.24 -4.24 36.48 36.48"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#424242"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="m3 14 9-11 9 11h-5v8H8v-8H3z" />
          </svg>
        </button>
      </div>
      {error && <p className="text-red-900">Error. Please try again later</p>}
    </>
  );
};

export default ArticleVoteBtn;
