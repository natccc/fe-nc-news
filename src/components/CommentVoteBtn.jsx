import React from 'react'
import { Button } from './Button'
const CommentVoteBtn = ({comment_count}) => {
  return (
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
  )
}

export default CommentVoteBtn
