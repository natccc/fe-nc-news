import { useEffect, useState } from "react";
import { getTopics } from "../lib/api";
import { Link } from "react-router-dom";
const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getTopics().then((res) => {
      setTopics(res);
    });
  }, []);
  return (
    <div className="text-center p-10  ">
      <h1 className="text-2xl">Topics List </h1>
      <div className="mt-10 bg-white h-full border rounded-lg mx-10 p-8 md:mx-32">
        <ul className="flex flex-col gap-5">
          {topics.map((topic) => {
            return (
              <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                <li className="text-blue-800 hover:text-blue-500">{topic.slug}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TopicsList;
