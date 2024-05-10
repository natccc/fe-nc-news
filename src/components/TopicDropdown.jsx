import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { getTopics } from "../lib/api";
import { Link } from "react-router-dom";
import { Button } from "./Button";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TopicDropdown() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getTopics();
      setTopics(data.map((ele) => ele.slug).sort());
    })();
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="h-10 py-2 px-4 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 outline outline-1 outline-zinc-300 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900">
          Topics
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          <Menu.Item >
                  {({ active }) => (
                    <Link
                      to="/"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm capitalize",
                      )}
                    >
                      All
                    </Link>
                  )}
                </Menu.Item>


            {topics.map((topic) => {
              return (
                <Menu.Item key={topic}>
                  {({ active }) => (
                    <Link
                      to={`/t/${topic}`}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm capitalize",
                      )}
                    >
                      {topic}
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
