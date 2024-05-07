import React from "react";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = "jessjelly"
  return (
    <div>
      <p className="pt-20 text-center text-2xl font-bold text-gray-700 ">
        You're now logged in as <em>{user}</em>
      </p>

      <Link to="/">
        <div className="flex justify-center mt-12">
          <Button>Go back home</Button>
        </div>
      </Link>
    </div>
  );
};

export default Profile;
