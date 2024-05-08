import React, { useEffect, useContext, useState } from "react";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { getUsers } from "../lib/api";
import Error from "./Error";
const Login = () => {
  const { username, setUsername, avatarUrl, setAvatarUrl } =
    useContext(UserContext);
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getUsers();
        setUsersData(data);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  const handleClick = (e) => {
    setUsername(e.currentTarget.getAttribute("value"));
    setAvatarUrl(
      usersData.filter(
        (ele) => ele.username === e.currentTarget.getAttribute("value"),
      )[0].avatar_url,
    );
  };

  if (error) return <Error></Error>;
  return (
    <div>
      <p className="pt-10 text-center text-2xl font-bold text-gray-700 ">
        Select a profile
      </p>
      <ul className="grid-cols container mt-10 grid items-center gap-y-2 md:grid-cols-3  ">
        {usersData.map((user) => {
          return (
            <li
              key={user.username}
              className="mx-auto rounded-xl border text-center hover:shadow-md"
              value={user.username}
              onClick={(e) => handleClick(e)}
            >
              <Link to={`/login`}>
                <div className=" p-4">
                  <img
                    src={user.avatar_url}
                    className="mx-auto w-[60vw] md:w-24"
                    alt="avatar"
                  />
                  <p className="mt-4 font-bold">{user.username}</p>
                  <p className="text-sm text-gray-600">{user.name}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-center text-lg font-bold">
        You're now logged in as <em>{username}</em>
      </p>

      <Link to="/">
        <div className="mt-12 flex justify-center">
          <Button>Go back home</Button>
        </div>
      </Link>
    </div>
  );
};

export default Login;
