import React from 'react'

const ArticleVoteBtn = ({votes}) => {
  return (
    <div className="flex h-10 items-center justify-between gap-1 rounded-md bg-[#EAEDEF]  px-1 ">
    <button className="inline-flex items-center justify-center rounded-full bg-zinc-100  text-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900">
      <svg
        className="w-8 rounded-full  bg-[#EAEDEF]  hover:bg-zinc-200 hover:stroke-red-700 "
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
  )
}

export default ArticleVoteBtn
