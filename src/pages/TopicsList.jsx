import { useEffect, useState } from "react";
import { getTopics } from "../lib/api";
import { Link } from "react-router-dom";
import Error from "./Error";
const TopicsList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    (async () => {
        const data = await getTopics();
        setTopics(data.map((ele) => ele.slug));
    })();
  }, []);


  return (
    <div className="p-10 text-center  ">
      <h1 className="text-2xl">Topics List </h1>
      <div className="mx-10 mt-10 h-full rounded-lg border bg-white p-8 md:mx-32">
        <ul className="flex flex-col gap-5">
          {topics.map((topic) => {
            return (
              <Link to={`/t/${topic.slug}`} key={topic.slug}>
                <li className="capitalize text-blue-800 hover:text-blue-500">
                  {topic.slug}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TopicsList;
