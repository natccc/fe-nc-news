import React from "react";
import { Button } from "./Button";
import { formatDateToNow } from "../lib/utils";
import { Link } from "react-router-dom";

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
  } = props.articleData;

  return (
    <div className="border-t-2  ">
      <Link>
        <div className="hover:bg-light_gray p-2 hover:rounded-xl ">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-gray-700">/{topic}</p>

            <p className="text-sm text-gray-700">{author}</p>
            <span className="text-xs font-extralight text-gray-400">•</span>
            <p className="text-sm text-gray-400 ">
              {formatDateToNow(created_at)}
            </p>
          </div>

          <h2 className="mt-1 text-xl font-semibold text-gray-800">{title}</h2>

          <div className="mt-2">
            <img
              src={article_img_url}
              className="h-full w-full rounded-xl object-cover "
            />
          </div>

          <div className="mt-2 flex items-center gap-4">
            {/* vote button */}

            <div className="flex h-10 items-center justify-between gap-1 rounded-md bg-[#EAEDEF]  px-1 ">
              <button className="inline-flex items-center justify-center rounded-full bg-zinc-100  text-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
                <svg
                  className="w-8 rounded-full  bg-[#EAEDEF]  hover:stroke-red-700 hover:bg-zinc-200 "
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
                {votes > 0 ? { votes } : "Vote"}
              </span>
              <button className="inline-flex items-center justify-center rounded-full bg-zinc-100  text-zinc-900 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
                <svg
                  className="w-8 rotate-180 rounded-full bg-[#EAEDEF] hover:bg-zinc-200 hover:stroke-purple-800 "
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

            {/* Comment button */}
          
            <Button variant="subtle" className="bg-[#EAEDEF] p-1 ">
              {" "}
              <svg
                fill="#424242"
                className="w-8 rounded-full border "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-16.64 -16.64 97.28 97.28"
                xmlSpace="preserve"
                stroke="#424242"
                strokeWidth="2"
              >
                <path d="M51 17H13a1 1 0 1 0 0 2h38a1 1 0 1 0 0-2zM51 29H13a1 1 0 1 0 0 2h38a1 1 0 1 0 0-2z" />
                <path d="M57.335 1H6.665C2.99 1 0 4.025 0 7.743v31.763c0 3.718 2.99 6.742 6.665 6.742h9.156l-3.397 15.538a1 1 0 0 0 1.598.998l20.864-16.536h22.449c3.675 0 6.665-3.024 6.665-6.742V7.743C64 4.025 61.01 1 57.335 1zM62 39.506c0 2.615-2.093 4.742-4.665 4.742H34.537c-.225 0-.444.076-.621.216l-18.94 15.012 3.064-14.014a.998.998 0 0 0-.977-1.214H6.665C4.093 44.248 2 42.121 2 39.506V7.743C2 5.128 4.093 3 6.665 3h50.67C59.907 3 62 5.128 62 7.743v31.763z" />
              </svg>
              <span className="mx-2 text-sm font-medium text-gray-800">
                {comment_count}
              </span>
            </Button>
          </div>
        </div>
      </Link>{" "}
    </div>
  );
};

export default ArticleCard;
