import React, { useEffect, useState, useContext } from "react";
import { postComment } from "../lib/api";
import { Button } from "./Button";
import SuccessUpload from "./SuccessBox";
import ErrorMsg from "./ErrorMsg";
import { UserContext } from "../contexts/User";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Smile } from "lucide-react";
import { set } from "date-fns";

const NewCommentCard = (props) => {
  const { article_id, setComments } = props;
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { username } = useContext(UserContext);
  const [showEmoji, setShowEmoji] = useState(false);

  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setInput(input + emoji);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("posting");
    postComment(article_id, { username: username, body: input })
      .then((res) => {
        setStatus(null);
        setInput("");
        setShowModal(true);
        setComments((currComments) => {
          return [res, ...currComments];
        });
      })
      .catch(() => {
        setStatus("error");
      });
  };

  if (showModal === true) {
    setTimeout(() => {
      setShowModal(false);
    }, "3000");
  }

  return (
    <div
      id="comment"
      className="rounded-xl border bg-white p-3 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600 "
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          type="text"
          onFocus={() => setShowEmoji(false)}
          disabled={status === "posting" || username === "guest"}
          required
          rows={3}
          className=" mx-2 block w-full resize-none border-0 bg-transparent p-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Add your comment..."
          border="hidden"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <div className="flex items-center justify-between relative">
          <span
            className="mx-1 inline-block cursor-pointer hover:text-gray-500"
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <Smile></Smile>
          </span>
          {showEmoji && (
            <div
              className="absolute top-0 left-10 z-10 h-72 shadow-lg overflow-hidden"
              onBlur={() => setShowEmoji(false)}
            >
              <Picker
                data={data}
                emojiSize={20}
                emojiButtonSize={28}
                onEmojiSelect={addEmoji}
                maxFrequentRows={0}
                previewPosition="none"
                perLine="12"
                searchPosition="static"
              />
            </div>
          )}{" "}
          <div>
            <Button
              type="button"
              className="mr-3 "
              variant={"subtle"}
              disabled={status === "posting" || input === ""}
              onClick={(e) => {
                setInput("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-800 hover:bg-red-900 "
              type="submit"
              disabled={status === "posting" || input === ""}
            >
              Post
            </Button>
            {status === "posting" && (
              <p className="mt-2 text-right">Posting...</p>
            )}
          </div>
        </div>
        {showModal && (
          <SuccessUpload
            message="Successfully posted"
            setShowModal={setShowModal}
          />
        )}
        {status === "error" && <ErrorMsg />}
        {username === "guest" && (
          <p className="text-sm text-red-800">
            You need to login to post a comment
          </p>
        )}
      </form>
    </div>
  );
};

export default NewCommentCard;
