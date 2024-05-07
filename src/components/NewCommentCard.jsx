import React, { useEffect, useState } from "react";
import { postComment } from "../lib/api";
import { Button } from "./Button";
import SuccessUpload from "./SuccessUpload";
import ErrorMsg from "./ErrorMsg";

const NewCommentCard = (props) => {
  const { article_id, setComments } = props;
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const user= "jessjelly"

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("posting");
    postComment(article_id, { username: user, body: input })
      .then((res) => {
        setStatus("posted");
        setShowModal(true);
        setComments((currComments) => {
          return [res, ...currComments];
        });
      })
      .catch((err) => {
        setStatus("error");
      });
  };

  return (
    <div className="rounded-xl border bg-white p-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600">
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          type="text"
          disabled={status === "posting"}
          required
          rows={3}
          className=" mx-2 block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Add your comment..."
          border="hidden"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <div className="text-right">
          {" "}
          <Button
            type="button"
            className="mr-3"
            variant={"subtle"}
            onClick={(e) => {
              setInput("");
            }}
          >
            Cancel
          </Button>
          <Button className="bg-red-800 hover:bg-red-900 " type="submit">
            Post
          </Button>
        </div>
        {showModal && <SuccessUpload setShowModal={setShowModal} />}
        {status === "error" && <ErrorMsg />}
      </form>
    </div>
  );
};

export default NewCommentCard;
