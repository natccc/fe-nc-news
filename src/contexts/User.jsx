import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const getInitialUsername = () => {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : "guest";
};

const getInitialAvatar = () => {
  const avatarUrl = localStorage.getItem("avatarUrl");
  return avatarUrl
    ? JSON.parse(avatarUrl)
    : "";
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getInitialUsername);
  const [avatarUrl, setAvatarUrl] = useState(getInitialAvatar);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("avatarUrl", JSON.stringify(avatarUrl));
  }, [currentUser, avatarUrl]);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, avatarUrl, setAvatarUrl }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
