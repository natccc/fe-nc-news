import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { postArticle } from "../lib/api";
import { getTopics } from "../lib/api";
import { UserContext } from "../contexts/User";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import { Button } from "../components/Button";
import data from "@emoji-mart/data";
import SuccessBox from "../components/SuccessBox";
import ErrorMsg from "../components/ErrorMsg";
import { useNavigate } from "react-router";
import { Checkbox } from "@material-tailwind/react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("coding");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const data = await getTopics();
      setTopics(data.map((ele) => ele.slug).sort());
    })();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const filteredTopics =
    query === ""
      ? topics
      : topics.filter((topic) => {
          return topic.toLowerCase().includes(query.toLowerCase());
        });

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
    postArticle({
      title: title,
      topic: selectedTopic,
      author: currentUser,
      body: input,
      article_img_url: url,
    })
      .then(() => {
        setStatus(null);
        setInput("");
        setShowModal(true);
        setTimeout(()=>{
          navigate(-1)
        },"2000")
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  };

  

  return (
    <div className="container flex flex-col gap-6 mx-auto max-w-[90vw] sm:max-w-[70vw] lg:max-w-[50vw]">
      <h1 className="mt-8 text-2xl font-bold">Create post</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-2 flex flex-col gap-2"
      >
        <div className="">
          <label
            htmlFor="title"
            className="block text-lg font-medium leading-6 text-gray-900"
          >
            Title
          </label>
          <div className="mt-2 ">
            <input
              type="text"
              name="title"
              id="title"
              required
              className=" block w-full rounded-md border-0 invalid:ring-red-600 py-1.5 text-gray-900 shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="Today is a beautiful day"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
         
        
            />
          </div>
          
        </div>

        <div className="">
          <Combobox as="div" value={selectedTopic} onChange={setSelectedTopic}>
            <Combobox.Label className="mt-2 block text-lg font-medium leading-6 text-gray-900 ">
              Topic
            </Combobox.Label>
            <div className="relative mt-2">
              <Combobox.Input
                className="w-full invalid:ring-red-600 rounded-md border-0 bg-white py-1.5 pl-3 pr-10 capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(topic) => topic}
                required
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

              {filteredTopics.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base capitalize shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredTopics.map((topic) => (
                    <Combobox.Option
                      key={topic}
                      value={topic}
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-gray-200" : "",
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              "block truncate",
                              selected && "font-semibold",
                            )}
                          >
                            {topic}
                          </span>

                          {selected && (
                            <span
                              className={classNames(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-indigo-600",
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>

        <div className="">
          <label
            htmlFor="url"
            className="block text-lg mt-2 font-medium leading-6 text-gray-900"
          >
            Image URL
          </label>
          <div className="mt-2 ">
            <input
              type="text"
              name="url"
              id="url"
              value={url}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="https://picsum.photos/600/400"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>

 
        
        <Checkbox label="No image? Generate a random one" 
        color="pink"
        className=""
        onChange={() => setUrl("https://picsum.photos/600/400")}></Checkbox>

  


        <div
          id="body"
          className="mt-4 rounded-xl border bg-white p-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-500 "
        >
          <textarea
            type="text"
            onFocus={() => setShowEmoji(false)}
            disabled={status === "posting" || currentUser === "guest"}
            required
            rows={3}
            className=" invalid:ring-red-600 mx-1 block w-full resize-none border-0 bg-transparent p-1 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Body"
            border="hidden"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>

          <div className="relative flex items-center justify-between">
            <span
              className="mx-1 inline-block cursor-pointer hover:text-gray-500"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <Smile></Smile>
            </span>
            {showEmoji && (
              <div
                className="absolute left-10 top-0 z-10 h-72 overflow-hidden shadow-lg"
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
            <SuccessBox
              message="Successfully posted"
              setShowModal={setShowModal}
            />
          )}
          {status === "error" && <ErrorMsg />}
          {currentUser === "guest" && (
            <p className="text-sm text-red-800">You need to login to post.</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
