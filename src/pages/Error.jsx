import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
const Error = ({message, code}) => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">{code}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {code===404 ? "Page not found" : "Error"}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
           
          >
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
