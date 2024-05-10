import React, { useEffect, useContext, useState } from "react";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { getUsers } from "../lib/api";
import Error from "./Error";
import LoginModal from "../components/LoginModal";
import Loading from "../components/Loading"
const UsersList = () => {
  const { currentUser, setCurrentUser, avatarUrl, setAvatarUrl } =
    useContext(UserContext);
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal]= useState(false)

  useEffect(() => {
    
    (async () => {
      setIsLoading(true)
      try {
        const data = await getUsers();
        setUsersData(data);
      } catch (err) {
        setError(err);
      }
      finally{
        setIsLoading(false)
      }
    })();
  }, []);
  const handleClick = (e) => {
    setCurrentUser(e.currentTarget.getAttribute("value"));
    setAvatarUrl(
      usersData.filter(
        (ele) => ele.username === e.currentTarget.getAttribute("value"),
      )[0].avatar_url,
    );
    setShowModal(true)
  };

  const handleLogout = () => {
    setCurrentUser("guest");
    setAvatarUrl("");
  };

  if (error) return <Error></Error>;
  return isLoading? <Loading></Loading> : 
(
    <div>
      <p className="pt-10 text-center text-2xl font-bold text-gray-700 ">
        Select a profile
      </p>
      <ul className="grid-cols container mt-10 grid items-center gap-y-3 md:grid-cols-3   ">
        {usersData.map((user) => {
          return (
            
            <li
              key={user.username}
              className={`mx-auto rounded-xl text-center border-2 hover:shadow-md hover:bg-gray-100 ${user.username === currentUser ? "border-red-600" : "border-gray-200"}`}
              value={user.username}
              onClick={(e) => handleClick(e)}
            >
              <Link to={`/users`}>
                <div className=" p-4">
                  <img
                    src={user.avatar_url}
                    className="mx-auto h-48 w-48  rounded-full border-2 border-gray-200 object-contain md:h-28 md:w-28 bg-white"
                    alt="avatar"
                  />
                  <p className="mt-4 font-bold">{user.username}</p>
                  <p className="text-sm text-gray-600">{user.name}</p>
                </div>
              </Link>
              {currentUser===user.username & showModal===true ? <LoginModal currentUser={currentUser} avatarUrl={avatarUrl}></LoginModal>:null}

            </li>
          );
        })}
      </ul>

      <div className="mt-12 flex justify-center gap-3">
        <Link to="/">
          <Button>Go back home</Button>{" "}
        </Link>

        <Button
          className={
            currentUser === "guest" ? "hidden" : "bg-red-900 hover:bg-red-800"
          }
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      
    </div>
  );
};

export default UsersList;
