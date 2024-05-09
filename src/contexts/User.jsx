import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const getInitialUsername = () => {
  const username = localStorage.getItem("username");
  return username ? JSON.parse(username) : "guest";
};

const getInitialAvatar = () => {
  const avatarUrl = localStorage.getItem("avatarUrl");
  return avatarUrl
    ? JSON.parse(avatarUrl)
    : "https://kawaii-avatar.now.sh/api/avatar";
};

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(getInitialUsername);
  const [avatarUrl, setAvatarUrl] = useState(getInitialAvatar);

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(username));
    localStorage.setItem("avatarUrl", JSON.stringify(avatarUrl));
  }, [username, avatarUrl]);

  return (
    <UserContext.Provider
      value={{ username, setUsername, avatarUrl, setAvatarUrl }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
