import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("guest");
  const [avatarUrl, setAvatarUrl] = useState("https://kawaii-avatar.now.sh/api/avatar");
  return (
    <UserContext.Provider value={{ username, setUsername, avatarUrl, setAvatarUrl }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

