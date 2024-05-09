import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser } from "../lib/api";
import Error from "./Error";

const Profile = () => {
  const { username } = useParams();
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await getUser(username);
        setAvatar(data.avatar_url);
      } catch {
        setError(true);
      }
    })();
  }, []);

  if (error) return <Error></Error>;

  return (
    <div className="container mt-8 flex flex-col gap-2">
      <img
        src={avatar}
        alt="avatar"
        className="w-32 h-32 rounded-full border object-contain "></img>
      <h1 className="text-xl font-bold"> {username}'s profile </h1>
      <h2 className="text-lg">Posts</h2>
    </div>
  );
};

export default Profile;
